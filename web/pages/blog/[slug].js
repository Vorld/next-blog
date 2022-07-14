import styles from '../../styles/Post.module.css';

import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';

//MDX Support
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

//importable components for MDX
import Typewriter from '../../components/Typewriter';
import Moment from 'react-moment';
const components = { Typewriter, Moment };

import Image from 'next/image';
import Link from 'next/link';

//icons
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function urlFor(source) {
    return imageUrlBuilder(client).image(source);
}

const ptComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <Image
                    alt={value.alt || ' '}
                    loading='lazy'
                    src={urlFor(value).fit('max').auto('format')}
                />
            );
        },
    },
};

const Post = ({ post }) => {
    if (!post) {
        return null;
    }

    const {
        title = 'Missing title',
        name = 'Missing name',
        categories,
        date,
        authorImage,
        body = [],
        previousPost,
        nextPost,
    } = post;

    return (
        <div>
            <div
                className={`${styles['blog-header']} ${styles['blog-sticky']}`}
            >
                <h1 className={styles['blog-title']}>BLOG</h1>
            </div>

            <div className={styles['blog-header']}></div>

            <Link href='/blog'>
                <a className={styles.return}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    {' Back to all'}
                </a>
            </Link>

            <article className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <h5 className={styles.name}>By {name}</h5>
                <span className={styles.date}>
                    <Moment format='Do MMMM YYYY, ha'>{date}</Moment>
                </span>
                {categories && (
                    <ul>
                        Posted in
                        {categories.map((category) => (
                            <li key={category}>{category}</li>
                        ))}
                    </ul>
                )}
                {/* {authorImage && (
                <div>
                    <img
                        src={urlFor(authorImage).url()}
                        alt={`${name}'s picture`}
                    />
                </div>
            )} */}
                <div className={styles.body}>
                    <MDXRemote {...body} components={components} />
                </div>
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

const currentQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "date": publishedAt,
  "authorImage": author->image,
  body,
  'previousPost': *[_type == 'post' && publishedAt < ^.publishedAt] | order(publishedAt desc)[0].slug.current,
  'nextPost': *[_type == 'post' && publishedAt > ^.publishedAt] | order(publishedAt asc)[0].slug.current
}`;

// const PreviousQuery = groq``

export async function getStaticPaths() {
    const paths = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    };
}

export async function getStaticProps(context) {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = '' } = context.params;
    let post = await client.fetch(currentQuery, { slug });

    const body = await serialize(post.body);

    post = {
        ...post,
        body: body,
    };

    console.log(post);

    return {
        props: {
            post,
        },
    };
}
export default Post;

//TODO: LaTeX Support
//TODO: Navigation between slugs
//TODO: Tagging/Categorization system
//TODO: All article display on Blog Index
