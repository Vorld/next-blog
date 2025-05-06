"use client"; // PortableText needs to be a client component if using custom client components like Latex or PDFViewer

import styles from '../styles/Post.module.css'; // Corrected path
import groq from 'groq';
import client from '../client'; // Corrected path
import imageUrlBuilder from '@sanity/image-url';
import { PortableText as ReactPortableText } from '@portabletext/react'; // Rename to avoid conflict
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next'; // Needs to be client-side
import Link from 'next/link';
import Image from 'next/image';
import Header from './Header'; // Corrected path
import FormattedDate from './FormattedDate'; // Corrected path
import PDFViewer from './PDFViewer/PDFViewer'; // Corrected path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

// Image build for portable text
function urlFor(source) {
    return imageUrlBuilder(client).image(source);
}

// All custom ptComponents
const ptComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            // Use Next.js Image component for optimization
            return (
                <Image
                    alt={value.alt || ' '}
                    loading='lazy'
                    src={urlFor(value).url()} // Get the full URL
                    width={320} // Provide appropriate default or fetched dimensions
                    height={240}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ maxWidth: '100%', height: 'auto' }} // Basic responsive styling
                />
            );
        },
        // Latex component needs to run client-side
        latex: ({ value, isInline }) => {
            return isInline ? (
                <Latex>{`$ ${value.body} $`}</Latex>
            ) : (
                <Latex>{`$$ ${value.body} $$`}</Latex>
            );
        },
        poetry: ({ value }) => {
            // Simple div, can remain server-side if PortableText is structured carefully
            // But since Latex/PDFViewer force client-side, this is fine here.
            return <div className={styles.poem}>{value.poem}</div>;
        },
        // PDFViewer is a client component
        file: ({ value }) => {
            if (!value?.asset?._ref) return null;
            const { _ref } = value.asset;
            const [_file, id, extension] = _ref.split('-');
            const url =
                'https://cdn.sanity.io/files/qjy3hvt5/production/' +
                id +
                '.' +
                extension;
            return <PDFViewer url={url} id={id} />;
        },
    },
};

// This component renders the main content and needs to be a Client Component
// because PortableText uses client components (Latex, PDFViewer).
const PostContent = ({ post }) => {
    if (!post) {
        return null;
    }

    const {
        title = 'Missing title',
        author = 'Missing author name',
        categories,
        date,
        body = [],
        previousPost,
        nextPost,
    } = post;

    return (
        <div>
            {/* Header can be used directly */}
            <Header heading={'BLOG'} />

            <article className={styles.container}>
                <Link href='/blog' className={styles.return}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    {' Back to all'}
                </Link>
                <h1 className={styles.title}>{title}</h1>
                <h5 className={styles.name}>By {author}</h5>
                <span className={styles.date}>
                    <FormattedDate date={date} />
                </span>

                <div className={styles.body}>
                    {/* Use the renamed PortableText component */}
                    <ReactPortableText value={body} components={ptComponents} />
                </div>

                <span className={styles.categories}>
                    {categories?.map((category) => (
                        <Link
                            key={category.title}
                            href={`/blog/category/${category.slug.current}`}
                        >
                            {category.title}
                        </Link>
                    ))}
                </span>
            </article>

            <div className={styles['nav-buttons']}>
                {previousPost ? (
                    <Link
                        href={`/blog/${previousPost}`}
                        className={styles['nav-button']}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                ) : (
                    <div></div> // Keep div for layout consistency
                )}
                {nextPost ? (
                    <Link href={`/blog/${nextPost}`} className={styles['nav-button']}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                ) : null}
            </div>
        </div>
    );
};

export default PostContent;
