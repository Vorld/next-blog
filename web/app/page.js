//Components

import Image from 'next/image'; // Keep Image if used
import Link from 'next/link';
import Typewriter from '../components/Typewriter'; 

import styles from '../styles/Home.module.css';

let msgs = ['HELLO.', 'THIS IS VENU.'];

// Define metadata for this page
export const metadata = {
  title: 'Home | Kulkarni Venugopal',
  description: "Kulkarni Venugopal's Personal Website",
};

const HomePage = () => {
    // TODO: Insert a profile photo.
    // TODO: Update description to reflect my current place and interests
    // TODO: Random dynamic elements like bits that fly off near the cursor.
    return (
        <div>
            <div className={styles.landing}>
                <Typewriter 
                    messages={msgs} 
                    fontSize="4.5rem"
                    fontWeight="lighter"
                    cursorColor="#e0e0e0"
                />
                <Typewriter 
                    messages={["Code Monkey.", "Laughs at his own jokes.", "Makes onions cry.", "Does not copy Minecraft.", "Judges book covers.", "Reinventor of the wheel.", "Avoids the plague.", "Lives for the plot.", "Do you like rhetorical questions?", "Goal Disoriented Person.", "Uses 'literally' figuratively.", "Has a favorite spoon.", "Yes, this is an infinite loop.", "Thinks coffee is soup."]} 
                    loop
                    startDelay={8000}
                    typeSpeed={150}
                    delayAfterType={3000}
                    delayAfterDelete={800}
                    fontSize="2rem"
                    textColor="#555"
                    tag="div"
                    random
                />
               
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
