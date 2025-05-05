import '../styles/globals.css';
import Navbar from '../components/Navbar';
import '@fortawesome/fontawesome-svg-core/styles.css'

export const metadata = {
  title: 'Kulkarni Venugopal', // Default title
  description: "Kulkarni Venugopal's Personal Website",
  // Add other metadata like icons here if preferred over direct link tags
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head> 
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true' // Use string "true" for crossOrigin
        />
        <link
            href='https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
            rel='stylesheet'
        />
        <link
            href='//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css'
            rel='stylesheet'
        />
        {/* Favicon link can be placed here or managed via metadata files */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Navbar needs to be a Client Component because it uses useState/useEffect */}
        <Navbar>
          {children}
        </Navbar>
      </body>
    </html>
  );
}
