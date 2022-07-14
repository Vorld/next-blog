import Link from 'next/link';
import groq from 'groq';
import client from '../../client';
import Header from '../../components/Header';

const Blog = ({ posts, open }) => {
    return (
        <div>
            <Header navOpen={open} heading={'BLOG'} />
            {posts.length > 0 &&
                posts.map(
                    ({ _id, title = '', slug = '', publishedAt = '' }) =>
                        slug && (
                            <li key={_id}>
                                <Link
                                    href='/blog/[slug]'
                                    as={`/blog/${slug.current}`}
                                >
                                    <a>{title}</a>
                                </Link>{' '}
                                ({new Date(publishedAt).toDateString()})
                            </li>
                        )
                )}
        </div>
    );
};

export async function getStaticProps() {
    const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `);

    console.log(posts);
    return {
        props: {
            posts,
        },
    };
}

export default Blog;
