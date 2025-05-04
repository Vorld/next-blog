import groq from 'groq';
import client from '../../client';

import Link from 'next/link';
import Head from 'next/head';

import Header from '../../components/Header';
import Moment from 'react-moment';

import styles from '../../styles/Blog.module.css';

const Blog = ({ posts, navOpen }) => {
    return (
        <div>
            <Head>
                <title>Blog | Kulkarni Venugopal</title>
            </Head>
            <Header navOpen={navOpen} heading={'BLOG'} />
            {posts.length > 0 &&
                posts.map(
                    ({
                        _id,
                        title,
                        subtitle,
                        slug,
                        author,
                        categories,
                        publishedAt,
                    }) => (
                        <div key={_id}>
                            {/* Updated Link: Removed passHref as the child is a div, not an anchor or custom component needing href */}
                            <Link href={`/blog/${slug.current}`}>
                                <div className={styles.container}>
                                    <h1 className={styles.title}>{title}</h1>

                                    <div className={styles.subtitle}>
                                        {subtitle}
                                    </div>
                                    <div className={styles.info}>
                                        <h5 className={styles.name}>
                                            {author}
                                        </h5>
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
                                                    // NOTE: Nested links are generally problematic.
                                                    // This inner Link was not modified as it didn't contain a nested <a> tag.
                                                    // Consider refactoring this part if it causes issues.
                                                >
                                                    {category.title}
                                                </Link>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                )}
        </div>
    );
};

export async function getStaticProps() {
    const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()]{
        _id,
        title,
        subtitle,
        "author": author->name,
        slug,
        publishedAt,
        "categories": categories[]->{title, slug},
    } | order(publishedAt desc)
    `);

    return {
        props: {
            posts,
        },
        revalidate: 10,
    };
}

export default Blog;
