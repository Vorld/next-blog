import styles from '../../styles/Post.module.css';

import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';

//MDX Support
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

//importable components for MDX
import Typewriter from '../../components/Typewriter';
const components = { Typewriter };

import Image from 'next/image';
import Link from 'next/link';

//icons
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
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
                <span className={styles.return}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    {' Back to all'}
                </span>
            </Link>

            <article className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <span>By {name}</span>
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
        </div>
    );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "date": publishedAt,
  "authorImage": author->image,
  body
}`;
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
