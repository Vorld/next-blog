//Sanity imports
import client from '../../client';
import groq from 'groq';
import { PortableText } from '@portabletext/react';

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
    },
};

const Post = ({ post }) => {
    const {
        title = 'Missing Title',
        name = 'Missing Name',
        categories,
        body = [],
    } = post;
    return (
        <article>
            <h1>{title}</h1>
            <span>By {name}</span>
            {categories && (
                <ul>
                    Posted in
                    {categories.map((category) => (
                        <li key={category}>{category}</li>
                    ))}
                </ul>
            )}
            <PortableText value={body} components={ptComponents} />
        </article>
    );
};

// groq query to get the post by slug and then get its details
const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "name": author->name,
    "categories": categories[]->title,
    body
  }`;

export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type == 'post' && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
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
    };
}

export default Post;
