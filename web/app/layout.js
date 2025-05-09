import '../styles/globals.css';
import Navbar from '../components/Navbar';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Raleway, Roboto } from 'next/font/google';

// Configure the fonts
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-raleway',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.venugopal.net'),
  title: {
    default: 'Kulkarni Venugopal', // Default title
    template: '%s | Kulkarni Venugopal', // Template for page-specific titles
  },
  description: "Kulkarni Venugopal's Personal Website and Blog", // Slightly more descriptive
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Kulkarni Venugopal',
    description: "Kulkarni Venugopal's Personal Website and Blog",
    url: 'https://www.venugopal.net',
    siteName: 'Kulkarni Venugopal',
    images: [
      {
        url: '/myPhoto.jpg', // Replace with your actual default OG image path
        width: 530,
        height: 530,
        alt: 'Kulkarni Venugopal Personal Website',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kulkarni Venugopal',
    description: "Kulkarni Venugopal's Personal Website and Blog",
    creator: '@_Vorld', // Optional: Add your Twitter handle
    images: ['/myPhoto.jpg'], // Replace with your actual default Twitter image path
  },
  // robots: { // Optional: Define default robots behavior if needed
  //   index: true,
  //   follow: true,
  // },
};

export const viewport = {
  interactiveWidget: "resizes-content"
}

export default function RootLayout({ children }) {
  const siteUrl = 'https://www.venugopal.net'; // Define for use in JSON-LD

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kulkarni Venugopal',
    url: siteUrl,
    logo: `${siteUrl}/myPhoto.jpg`,
    sameAs: [
      'https://twitter.com/_Vorld',
      'https://www.linkedin.com/in/KulkarniVenugopal/',
      'https://www.instagram.com/vorld_/',
      'https://www.telegram.me/VenusWithoutTheS/'
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kulkarni Venugopal',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`, // Optional: if you have site search
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className={`${raleway.variable} ${roboto.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link
          href='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css'
          rel='stylesheet'
          precedence="default"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"></meta>
      </head>
      <body>
        <Navbar>
          {children}
        </Navbar>
      </body>
    </html>
  );
}
