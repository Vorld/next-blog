import '../styles/globals.css';

//Components
import Navbar from '../components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const MyApp = ({ Component, pageProps }) => {
    return (
        <div>
            <Navbar>
                <Component {...pageProps} />
            </Navbar>
            <Analytics />
            <SpeedInsights />
        </div>
    );
};

export default MyApp;
