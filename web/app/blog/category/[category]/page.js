import groq from 'groq';
import client from '../../../../client';
import Link from 'next/link';
import Header from '../../../../components/Header';
import PostPreviewList from '../../../../components/PostPreviewList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../../styles/Category.module.css';
import { notFound } from 'next/navigation';
import Script from 'next/script'; // For JSON-LD

const SITE_URL = 'https://www.venugopal.net';

// Revalidate data every 10 seconds
export const revalidate = 10;

// Fetch category details
async function getCategoryDetails(categorySlug) {
  const query = groq`*[_type == "category" && slug.current == $categorySlug][0]{
    title,
    description
  }`;
  return client.fetch(query, { categorySlug });
}

// Fetch data function
async function getCategoryPosts(categorySlug) {
    const posts = await client.fetch(
        groq`*[_type == "post" && $category in categories[]->slug.current][]{
            _id,
            title,
            subtitle,
            "author": author->name,
            publishedAt,
            slug,
            "categories": categories[] -> {title, slug},
            body,
        } | order(publishedAt desc)`,
        {
            category: categorySlug,
        }
    );
    return posts;
}

// Generate static paths
export async function generateStaticParams() {
    const categorySlugs = await client.fetch(
        groq`*[_type == "category" && defined(slug.current)][].slug.current`
    );
    return categorySlugs.map((slug) => ({ category: slug }));
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
    const { category: categorySlug } = await params;
    const categoryDetails = await getCategoryDetails(categorySlug);

    if (!categoryDetails) {
        return {
            title: 'Category Not Found',
            description: 'The blog category you are looking for could not be found.',
        };
    }

    const pageTitle = categoryDetails.title || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    const pageDescription = categoryDetails.description || `Read blog posts in the ${pageTitle} category.`;

    return {
        title: pageTitle,
        description: pageDescription,
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: `${SITE_URL}/blog/category/${categorySlug}`,
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title: pageTitle,
            description: pageDescription,
        },
    };
}

// Page component (Server Component)
const BlogCategoryPage = async ({ params }) => {
    const { category: categorySlug } = await params;

    const categoryDetails = await getCategoryDetails(categorySlug);

    if (!categoryDetails) {
        notFound();
    }

    const posts = await getCategoryPosts(categorySlug);
    const pageTitle = categoryDetails.title || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

    const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageTitle,
        description: categoryDetails.description || `Articles in the category: ${pageTitle}`,
        url: `${SITE_URL}/blog/category/${categorySlug}`,
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${SITE_URL}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: pageTitle,
            },
        ],
    };

    return (
        <>
            <Script
                id="collection-page-schema-category"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
            />
            <Script
                id="breadcrumb-schema-category"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div>
                <Header heading={'BLOG'} />

                <div className={styles.top}>
                    <h3 className={styles.filter}>
                        Filtering for &quot;{pageTitle}&quot;
                    </h3>
                    <Link href='/blog' className={styles.return}>
                        <FontAwesomeIcon icon={faAngleLeft} size="s"/>
                        {' Back to all'}
                    </Link>
                </div>

                <PostPreviewList posts={posts} />
            </div>
        </>
    );
};

export default BlogCategoryPage;
