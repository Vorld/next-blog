import styles from '../../styles/Post.module.css';

import groq from 'groq';
import client from '../../client';

//Portable Text
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

// Next import
import Link from 'next/link';

// Components
import Header from '../../components/Header';
import Moment from 'react-moment';

//icons
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Image build for portable text
function urlFor(source) {
    return imageUrlBuilder(client).image(source);
}

// All custom ptComponents
const ptComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <img
                    alt={value.alt || ' '}
                    loading='lazy'
                    src={urlFor(value)
                        .width(320)
                        .height(240)
                        .fit('max')
                        .auto('format')}
                />
            );
        },
        latex: ({ value, isInline }) => {
            return isInline ? (
                <Latex>{`$ ${value.body} $`}</Latex>
            ) : (
                <Latex>{`$$ ${value.body} $$`}</Latex>
            );
        },
        poetry: ({ value }) => {
            return <div className={styles.poem}>{value.poem}</div>;
        },
        file: ({ value }) => {
            const { _ref } = value.asset;
            const [_file, id, extension] = _ref.split('-');
            const url =
                'https://cdn.sanity.io/files/qjy3hvt5/production/' +
                id +
                '.' +
                extension;
            return (
                <iframe
                    src={`https://docs.google.com/gview?url=${url}&embedded=true`}
                    width='100%'
                    height='500px'
                    frameborder='0'
                ></iframe>
            );
        },
    },
};

const Post = ({ post, navOpen }) => {
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
            <Header navOpen={navOpen} heading={'BLOG'} />

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
                    <PortableText value={body} components={ptComponents} />
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
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = '' } = context.params;
    const post = await client.fetch(query, { slug });

    return {
        props: {
            post,
        },
        revalidate: 10,
    };
}

export default Post;

// TODO: fix awkward spacing on linebreak
