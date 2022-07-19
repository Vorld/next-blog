// React component to dynamically load blog posts for a given category
import groq from 'groq';
import client from '../../../client';

import Link from 'next/link';
import Moment from 'react-moment';
import Header from '../../../components/Header';

import styles from '../../../styles/Category.module.css';

const BlogCategory = ({ open, posts }) => {
    return (
        <div>
            <Header navOpen={open} heading={'BLOG'} />
            {posts.map((post) => (
                // <Link key={post.title} href={`/blog/${post.slug.current}`}>
                //     {post.title}
                // </Link>
                <Link key={post.title} href={`/blog/${post.slug.current}`}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>{post.title}</h1>

                        <div className={styles.subtitle}>{post.subtitle}</div>
                        <div className={styles.info}>
                            <h5 className={styles.name}>{post.author}</h5>
                            <span className={styles.date}>
                                <Moment format='Do MMMM YYYY, ha'>
                                    {post.publishedAt}
                                </Moment>
                            </span>

                            <span className={styles.categories}>
                                {post.categories.map((category) => (
                                    <Link
                                        href={`/blog/category/${category.slug.current}`}
                                    >
                                        {category.title}
                                    </Link>
                                ))}
                            </span>
                        </div>
                    </div>
                </Link>
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
            subtitle,
            "author": author->name,
            publishedAt,
            slug,
            "categories": categories[] -> {title, slug},
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
