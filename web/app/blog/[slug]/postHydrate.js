'use client';

import styles from '../../../styles/Post.module.css';

//Portable Text
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

import Image from 'next/image';

import PDFViewer from '../../../components/PDFViewer/PDFViewer';

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
                <Image
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
            return <PDFViewer url={url} id={id} />;
        },
    },
};

export default function HydratedPost({ body }) {
    return <PortableText value={body} components={ptComponents} />;
}
