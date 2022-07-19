import groq from 'groq';
import client from '../../client';

import Link from 'next/link';
import Header from '../../components/Header';
import Moment from 'react-moment';

import styles from '../../styles/Blog.module.css';

const Blog = ({ posts, navOpen }) => {
    return (
        <div>
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
                            <Link href={`/blog/${slug.current}`} passHref>
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
