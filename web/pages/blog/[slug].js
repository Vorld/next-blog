import styles from '../../styles/Post.module.css';

import groq from 'groq';
import client from '../../client';

//MDX Support
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

//importable components for MDX
import Typewriter from '../../components/Typewriter';
import Moment from 'react-moment';
import Latex from 'react-latex';
const components = { Typewriter, Moment, Latex };

// next import
import Link from 'next/link';

import Header from '../../components/Header';

//icons
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Post = ({ post, open }) => {
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
            <Header navOpen={open} heading={'BLOG'} />

            <article className={styles.container}>
                <Link href='/blog'>
                    <a className={styles.return}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                        {' Back to all'}
                    </a>
                </Link>
                <h1 className={styles.title}>{title}</h1>
                <h5 className={styles.name}>By {author}</h5>
                <span className={styles.date}>
                    <Moment format='Do MMMM YYYY, ha'>{date}</Moment>
                </span>

                <div className={styles.body}>
                    <MDXRemote {...body} components={components} />
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
                        <a className={styles['nav-button']}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </a>
                    </Link>
                ) : (
                    <div></div>
                )}
                {nextPost ? (
                    <Link href={`/blog/${nextPost}`}>
                        <a className={styles['nav-button']}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </a>
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

export async function getStaticPaths() {
    const paths = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: false,
    };
}

export async function getStaticProps(context) {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = '' } = context.params;
    let post = await client.fetch(query, { slug });

    const body = await serialize(post.body);

    post = {
        ...post,
        body: body,
    };

    return {
        props: {
            post,
        },
    };
}

export default Post;

//TODO: All article display on Blog Index
// Refactor all haeder variable names
