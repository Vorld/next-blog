import groq from 'groq';
import client from '../../../client';
import PostContent from '../../../components/PostContent'; // Import the new client component
import { notFound } from 'next/navigation';

// Revalidate data every 10 seconds
export const revalidate = 10;

// Fetch data function
async function getPost(slug) {
    const query = groq`*[_type == "post" && slug.current == $slug][0]{
      title,
      "author": author->name,
      "categories": categories[]->{title, slug},
      "date": publishedAt,
      body,
      'previousPost': *[_type == 'post' && publishedAt < ^.publishedAt] | order(publishedAt desc)[0].slug.current,
      'nextPost': *[_type == 'post' && publishedAt > ^.publishedAt] | order(publishedAt asc)[0].slug.current
    }`;
    const post = await client.fetch(query, { slug });
    return post;
}

// Generate static paths
export async function generateStaticParams() {
    const slugs = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    );
    return slugs.map((slug) => ({ slug }));
}

// Generate metadata for the page
// Standard access: { params }
export async function generateMetadata({ params }) {
    const post = await getPost(params.slug); // Direct access
    if (!post) {
        return { title: 'Not Found' };
    }
    return {
        title: `${post.title || 'Blog Post'} | Kulkarni Venugopal`,
    };
}

// Page component (Server Component)
// Standard access: { params }
const PostPage = async ({ params }) => {
    const post = await getPost(params.slug); // Direct access

    if (!post) {
        notFound();
    }

    return <PostContent post={post} />;
};

export default PostPage;
