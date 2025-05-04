// React component to dynamically load blog posts for a given category
import groq from 'groq';
import client from '../../../client';

import Link from 'next/link';
import Head from 'next/head';

import Moment from 'react-moment';
import Header from '../../../components/Header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import styles from '../../../styles/Category.module.css';

const BlogCategory = ({ navOpen, posts, filterCategory }) => {
    return (
        <div>
            <Head>
                <title>Blog | Kulkarni Venugopal</title>
            </Head>
            <Header navOpen={navOpen} heading={'BLOG'} />

            <div className={styles.top}>
                <h3 className={styles.filter}>
                    Filtering for &quot;{filterCategory}&quot;
                </h3>
                <Link href='/blog' className={styles.return}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    {' Back to all'}
                </Link>
            </div>

            {posts.map(
                ({
                    _id,
                    title,
                    subtitle,
                    author,
                    slug,
                    publishedAt,
                    categories,
                }) => (
                    <Link key={_id} href={`/blog/${slug.current}`}>
                        <div className={styles.container}>
                            <h1 className={styles.title}>{title}</h1>

                            <div className={styles.subtitle}>{subtitle}</div>
                            <div className={styles.info}>
                                <h5 className={styles.name}>{author}</h5>
                                <span className={styles.date}>
                                    <Moment format='Do MMMM YYYY, ha'>
                                        {publishedAt}
                                    </Moment>
                                </span>

                                <span className={styles.categories}>
                                    {categories.map((category) => (
                                        <Link
                                            key={category.title}
                                            href={`/blog/category/${category.slug.current}`}
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </Link>
                )
            )}
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
        fallback: 'blocking',
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
            filterCategory: category,
        },
        revalidate: 10,
    };
}

export default BlogCategory;
