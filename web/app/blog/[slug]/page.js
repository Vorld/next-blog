import styles from '../../../styles/Post.module.css';

import groq from 'groq';
import client from '../../../client';

// Next import
import Link from 'next/link';
// import Head from 'next/head';

// Components
import Header from '../../../components/Header';
// import Moment from 'react-moment';
import HydratedPost from './postHydrate';

//icons
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Post = async ({ navOpen, params }) => {
    const post = await getPost(params);

    if (!post) {
        return null;
    }

    const {
        title = 'Missing title',
        author = 'Missing author name',
        categories,
        date,
        body = [],
        previousPost,
        nextPost,
    } = post;

    return (
        <div>
            {/* TODO: FIX Metadata HEADER 
            
            <Head>
                <title>Blog | Kulkarni Venugopal</title>
            </Head> */}
            <Header navOpen={navOpen} heading={'BLOG'} />

            <article className={styles.container}>
                <Link href='/blog' className={styles.return}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    {' Back to all'}
                </Link>
                <h1 className={styles.title}>{title}</h1>
                <h5 className={styles.name}>By {author}</h5>
                <span className={styles.date}>
                    {/* <Moment format='Do MMMM YYYY, ha'>{date}</Moment> */}
                </span>

                <div className={styles.body}>
                    {/* <PortableText value={body} components={ptComponents} /> */}
                    <HydratedPost body={body} />
                </div>

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
            </article>

            <div className={styles['nav-buttons']}>
                {previousPost ? (
                    <Link
                        href={`/blog/${previousPost}`}
                        className={styles['nav-button']}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                ) : (
                    <div></div>
                )}
                {nextPost ? (
                    <Link
                        href={`/blog/${nextPost}`}
                        className={styles['nav-button']}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                ) : null}
            </div>
        </div>
    );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "author": author->name,
    "categories": categories[]->{title, slug},
    "date": publishedAt,
    body,
    'previousPost': *[_type == 'post' && publishedAt < ^.publishedAt] | order(publishedAt desc)[0].slug.current,
    'nextPost': *[_type == 'post' && publishedAt > ^.publishedAt] | order(publishedAt asc)[0].slug.current
  }`;

export async function generateStaticParams() {
    const slugs = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    );

    return slugs.map((slug) => ({
        slug,
    }));
}

const getPost = async (params) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const slug = params.slug;

    const post = await client.fetch(query, { slug, next: { revalidate: 60 } });

    return post;
};

export default Post;
