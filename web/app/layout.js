// Metadata
import { Metadata } from 'next';

// Components
import Navbar from '../components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Styling
import '../styles/globals.css';

export const metadata = {
    title: 'Venugopal Kulkarni',
    description: "Welcome to Venugopal Kulkarni's Blog",
};

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Navbar>{children}</Navbar>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
};

export default RootLayout;
