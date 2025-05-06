import groq from 'groq';
import client from '../../client';
import Image from 'next/image';
import Header from '../../components/Header';
import styles from '../../styles/Photos.module.css';

// Fetch data at the server level
async function getImages() {
    const gallery = await client.fetch(groq`*[_type == "gallery"][0]{
        "images": images[]{
            "id": _key,
            "alt": asset->alt,
            "url": asset->url,
            "dimensions": asset->metadata.dimensions
        }
    }`);
    return gallery?.images?.filter(Boolean) || [];
}

// Define metadata for this page
export const metadata = {
  title: 'Photos | Kulkarni Venugopal',
};

// Revalidate data every 10 seconds
export const revalidate = 10;

// Photos Page Component (Server Component)
const PhotosPage = async () => {
    const images = await getImages();

    return (
        <div>
            <Header heading={'PHOTOS'} />
            <div className={styles.container}>
                {images.map((image) => {
                    // Basic check for essential data
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
                                // Consider adjusting sizes based on your layout
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                quality={75} // Default is 75, adjust as needed
                                priority={false} // Set to true for above-the-fold images if needed
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PhotosPage;
