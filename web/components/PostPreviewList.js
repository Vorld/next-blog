"use client"; // This component uses hooks and event handlers

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormattedDate from './FormattedDate'; // Assuming this is in the same components directory
import styles from '../styles/components/PostPreviewList.module.css'; // Adjust path as needed

const PostPreviewList = ({ posts }) => {
    const router = useRouter();

    const handleNavigate = (slug, event) => {
        // Prevent navigation if the click target is already a link (like category links)
        if (event.target.tagName === 'A') {
            return;
        }
        router.push(`/blog/${slug}`);
    };

    if (!posts || posts.length === 0) {
        return <p>No posts found.</p>; // Or some other placeholder
    }

    return (
        <div>
            {posts.map(
                ({
                    _id,
                    title,
                    subtitle,
                    slug,
                    author,
                    categories,
                    publishedAt,
                }) => (
                    <div
                        key={_id}
                        className={styles.container} // Use the existing container style for hover effects etc.
                        onClick={(e) => handleNavigate(slug.current, e)}
                        style={{ cursor: 'pointer' }} 
                    >
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.subtitle}>{subtitle}</div>
                        <div className={styles.info}>
                            <span className={styles.date}>
                                <FormattedDate date={publishedAt} />
                            </span>
                            <span className={styles.categories}>
                                {categories?.map((category) => (
                                    <Link
                                        key={category.title}
                                        href={`/blog/category/${category.slug.current}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {category.title}
                                    </Link>
                                ))}
                            </span>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default PostPreviewList;
