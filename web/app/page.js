//Components
// Removed Head import, use metadata in layout or page
import Image from 'next/image'; // Keep Image if used
import Link from 'next/link';
import Typewriter from '../components/Typewriter'; // Typewriter is now a Client Component

import styles from '../styles/Home.module.css';

let msgs = ['HELLO.', 'I AM VENU.'];

// Define metadata for this page
export const metadata = {
  title: 'Home | Kulkarni Venugopal',
  description: "Kulkarni Venugopal's Personal Website",
};

// This is now a Server Component by default
const HomePage = () => {
    // TODO: Update all dependencies
    // TODO: Insert a profile photo.
    // TODO: Update description to reflect my current place and interests
    // TODO: Random dynamic elements like bits that fly off near the cursor.
    return (
        <div>
            {/* Head component is removed */}
            <div className={styles.landing}>
                {/* Typewriter is a Client Component, works fine here */}
                <Typewriter messages={msgs} />
            </div>
            <div className={`${styles.para} ${styles.section1}`}>
                <h2 className={styles.header}>ME</h2>
                <p>
                    I am Kulkarni <b>Venu</b>gopal.
                </p>
                <p>
                    I like many things.
                    <br /> <br />
                    Astronomy, music, physics, programming, literature,
                    mathematics, video games, and more...
                    <br /> <br />I like to <b>learn</b>.
                </p>
            </div>
            <div className={`${styles.para} ${styles.section2}`}>
                <h2 className={styles.header}>ABOUT THIS WEBSITE</h2>
                <p>
                    I like minimalism. Less is more.
                    <br /> I believe in communicating{' '}
                    <span style={{ fontSize: 30 }}>big</span> ideas in simple
                    ways.
                </p>
                <p>
                    This website was built with{' '}
                    <a href='https://nextjs.org/'>Next.js</a> and the navigation
                    was inspired by the folks over at{' '}
                    <Link href='https://www.hugeinc.com/'>Huge</Link>.
                </p>
            </div>
            <div className={`${styles.para} ${styles.section3}`}>
                <h2 className={styles.header}>CONTACT ME</h2>
                <p>
                    If you need anything, I&apos;ll always be one{' '}
                    <Link href='mailto:KulkarniVenugopal@outlook.com' className={styles.emailLink}>
                        email
                    </Link>{' '}
                    away.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
