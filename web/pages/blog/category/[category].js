// React component to dynamically load blog posts for a given category
import groq from 'groq';
import client from '../../../client';

import Link from 'next/link';

const BlogCategory = ({ posts }) => {
    return (
        <div>
            {posts.map((post) => (
                <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
            ))}
        </div>
    );
};

export async function getStaticPaths() {
    // Fetch the slugs of all the categories
    const paths = await client.fetch(
        groq`*[_type == "category"][].slug.current`
    );

    // convert the category slugs to the paths
    return {
        paths: paths.map((category) => ({ params: { category } })),
        fallback: false,
    };
}

export async function getStaticProps(context) {
    // Fetch the blog posts of a given category
    const { category = '' } = context.params;
    const posts = await client.fetch(
        `*[_type == "post" && $category in categories[]->slug.current][]{
            title, 
            slug,
            body,
        }`,
        {
            category,
        }
    );

    return {
        props: {
            posts,
        },
    };
}

export default BlogCategory;
