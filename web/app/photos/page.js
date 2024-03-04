import groq from 'groq';
import client from '../../client';

import imageUrlBuilder from '@sanity/image-url';

import Head from 'next/head';
import Image from 'next/image';

import Header from '../../components/Header';

import styles from '../../styles/Photos.module.css';

const builder = imageUrlBuilder(client);
function urlFor(source) {
    return builder.image(source);
}

const Photos = async ({ navOpen }) => {
    const images = await getGallery();

    return (
        <div>
            <Head>
                <title>Photos | Kulkarni Venugopal</title>
            </Head>
            <Header navOpen={navOpen} heading={'PHOTOS'} />
            <div className={styles.container}>
                {images.map((image) => {
                    return (
                        <img
                            className={styles.image}
                            src={urlFor(image).url()}
                            key={image._key}
                        />
                    );
                })}
            </div>
        </div>
    );
};

async function getGallery() {
    const gallery = await client.fetch(groq`*[_type == "gallery"][0]{images}`, {
        next: { revalidate: 60 },
    });

    return gallery.images;
}

export default Photos;
