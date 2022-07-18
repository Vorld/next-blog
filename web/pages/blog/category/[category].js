// React component to dynamically load blog posts for a given category
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import groq from 'groq';
import client from '../../../client';

const BlogCategory = ({ categoryInfo }) => {
    // return <div>{categoryInfo.title}</div>;
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
    const categoryInfo = await client.fetch(
        `*[_type == "post" && $category in categories[]->slug.current][]{title, description}`,
        {
            category,
        }
    );

    return {
        props: {
            categoryInfo,
        },
    };
}

export default BlogCategory;
