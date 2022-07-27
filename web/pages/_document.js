import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href='https://fonts.googleapis.com/css2?family=Lobster&display=swap'
                    rel='stylesheet'
                />
                <link
                    href='//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css'
                    rel='stylesheet'
                />
            </Head>
            <body>
                <script
                    type='text/javascript'
                    src='https://documentcloud.adobe.com/view-sdk/main.js'
                ></script>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
