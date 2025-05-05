import groq from 'groq';
import client from '../../../../client';
import Link from 'next/link';
import Header from '../../../../components/Header';
import PostPreviewList from '../../../../components/PostPreviewList'; // Import the new client component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../../styles/Category.module.css';
import { notFound } from 'next/navigation';

// Revalidate data every 10 seconds
export const revalidate = 10;

// Fetch data function
async function getCategoryPosts(category) {
    const posts = await client.fetch(
        groq`*[_type == "post" && $category in categories[]->slug.current][]{
            _id,
            title, 
            subtitle,
            "author": author->name,
            publishedAt,
            slug,
            "categories": categories[] -> {title, slug},
            body, // Keep body if needed, otherwise remove
        } | order(publishedAt desc)`,
        {
            category,
        }
    );
    return posts;
}

// Generate static paths
export async function generateStaticParams() {
    const categories = await client.fetch(
        groq`*[_type == "category" && defined(slug.current)][].slug.current`
    );
    return categories.map((category) => ({ category }));
}

// Generate metadata for the page
// Destructure category directly from params
export async function generateMetadata({ params: { category } }) {
    // Optionally fetch category details if needed for metadata
    return {
        title: `Blog - ${category} | Kulkarni Venugopal`, // Use destructured category
    };
}

// Page component (Server Component)
const BlogCategoryPage = async ({ params }) => {
    const { category } = params; // Destructuring here is fine
    const posts = await getCategoryPosts(category);

    // Optional: Check if category exists or if posts array is empty and show notFound
    // const categoryExists = await client.fetch(groq`count(*[_type == "category" && slug.current == $category]) > 0`, { category });
    // if (!categoryExists || posts.length === 0) {
    //     notFound();
    // }

    return (
        <div>
            <Header heading={'BLOG'} />

            <div className={styles.top}>
                <h3 className={styles.filter}>
                    Filtering for &quot;{category}&quot;
                </h3>
                <Link href='/blog' className={styles.return}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    {' Back to all'}
                </Link>
            </div>

            {/* Render the client component to display the list */}
            <PostPreviewList posts={posts} />
        </div>
    );
};

export default BlogCategoryPage;
