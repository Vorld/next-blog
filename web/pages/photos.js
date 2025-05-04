import groq from 'groq';
import client from '../client';

import imageUrlBuilder from '@sanity/image-url';

import Head from 'next/head';
import Image from 'next/image';

import Header from '../components/Header';

import styles from '../styles/Photos.module.css';

// TODO: Create thumbnails for better performance
// TODO: Add a modal to view full images in fullscreen

function urlFor(source) {
    return imageUrlBuilder(client).image(source);
}

const Photos = ({ navOpen, images }) => {
    return (
        <div>
            <Head>
                <title>Photos | Kulkarni Venugopal</title>
            </Head>
            <Header navOpen={navOpen} heading={'PHOTOS'} />
            <div className={styles.container}>
                {images.map(
                    (image) =>
                        urlFor(image) && (
                            <img className={styles.image} src={urlFor(image)} />
                        )
                )}
            </div>
        </div>
    );
};

// export async function getStaticPaths() {
//     const paths = await client.fetch(
//         groq`*[_type == "galleryImage" && defined(slug.current)][].slug.current`
//     );

//     return {
//         paths: paths.map((slug) => ({ params: { slug } })),
//         fallback: 'blocking',
//     };
// }

export async function getStaticProps() {
    const gallery = await client.fetch(groq`*[_type == "gallery"][0]{images}`);

    return {
        props: {
            images: gallery.images,
        },
        revalidate: 10,
    };
}

export default Photos;
