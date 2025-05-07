//Components

import Image from 'next/image'; // Keep Image if used
import Link from 'next/link';
import Typewriter from '../components/Typewriter'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
                    typeSpeed={200}
                />
                <Typewriter 
                    messages={["Code Monkey.", "Laughs at his own jokes.", "Makes onions cry.", "Does not copy Minecraft.", "Judges book covers.", "Reinventor of the wheel.", "Avoids the plague.", "Lives for the plot.", "Do you like rhetorical questions?", "Goal Disoriented Person.", "Uses 'literally' figuratively.", "Has a favorite spoon.", "Yes, this is an infinite loop.", "Thinks coffee is soup.", "Serial Monotasker.","I can't go on. I'll go on."]} 
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
                    Hey! I&apos;m Kulkarni <b>Venu</b>gopal.

                    I do things mostly for no good reason at all but the joy of doing it.
                </p>
                <p>

                </p>
            </div>
            <div className={`${styles.para} ${styles.section2}`}>
                <h2 className={styles.header}>ABOUT THIS WEBSITE</h2>
                <p>
                    This website was built with <Link href='https://nextjs.org/' className={styles.emailLink}>Next.js</Link>, integrated with the <Link className={styles.emailLink} href="https://www.sanity.io/">Sanity</Link> headless content management system. 
                </p>
                <p>The navigation
                    was inspired by the folks over at <Link href='https://www.hugeinc.com/' className={styles.emailLink}>Huge inc</Link>.</p>
            </div>
            <div className={`${styles.para} ${styles.section3}`}>
                <h2 className={styles.header}>CONTACT ME</h2>
                <p>
                    I love a good story—so feel free to reach out and tell me yours (or ask a question, share a thought, or just say hi).
                </p>
                <div className={styles.socialIcons}>
                    <Link href="https://github.com/vorld" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                    </Link>
                    <Link href="https://linkedin.com/in/KulkarniVenugopal" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </Link>
                    <Link href="mailto:KulkarniVenugopal@outlook.com" className={styles.socialIcon}>
                        <FontAwesomeIcon icon={faEnvelope} size="2x" />
                    </Link>
                    <Link href="https://t.me/VenusWithoutTheS" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                        <FontAwesomeIcon icon={faTelegram} size="2x" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
