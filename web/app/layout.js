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
  title: 'Kulkarni Venugopal', // Default title
  description: "Kulkarni Venugopal's Personal Website",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable} ${roboto.variable}`}>
      <head> 
        <link
          href='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css'
          rel='stylesheet'
          precedence="default"
        />
      </head>
      <body>
        <Navbar>
          {children}
        </Navbar>
      </body>
    </html>
  );
}
