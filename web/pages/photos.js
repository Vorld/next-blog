import groq from 'groq';
import client from '../client';

import Head from 'next/head';
import Image from 'next/image';

import Header from '../components/Header';

import styles from '../styles/Photos.module.css';

// TODO: Create thumbnails for better performance
// TODO: Add a modal to view full images in fullscreen

const Photos = ({ navOpen, images }) => {
    return (
        <div>
            <Head>
                <title>Photos | Kulkarni Venugopal</title>
            </Head>
            <Header navOpen={navOpen} heading={'PHOTOS'} />
            <div className={styles.container}>
                {images.map((image) => {
                    if (!image?.url || !image?.dimensions) return null;
                    return (
                        <div 
                            key={image.id} 
                            className={styles.imageWrapper}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt || "Gallery image"}
                                className={styles.image}
                                width={image.dimensions.width}
                                height={image.dimensions.height}
                                sizes="90vw, 45vh"
                                quality={50}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export async function getStaticProps() {
    // Enhanced query to fetch necessary image metadata
    const gallery = await client.fetch(groq`*[_type == "gallery"][0]{
        "images": images[]{
            "id": _key,
            "alt": asset->alt,
            "url": asset->url,
            "dimensions": asset->metadata.dimensions
        }
    }`);

    return {
        props: {
            images: gallery?.images?.filter(Boolean) || [],
        },
        revalidate: 10,
    };
}

export default Photos;
