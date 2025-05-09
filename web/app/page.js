//Components

import Image from 'next/image'; // Keep Image if used
import Link from 'next/link';
import Typewriter from '../components/Typewriter'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import groq from 'groq';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';

import styles from '../styles/Home.module.css';

let msgs = ['HELLO.', 'THIS IS VENU.'];

// Define metadata for this page
export const metadata = {
  title: 'Home | Kulkarni Venugopal',
  description: "Kulkarni Venugopal's Personal Website",
};

function urlFor(source) {
    return imageUrlBuilder(client).image(source);
}

// TODO: Random dynamic elements like bits that fly off near the cursor.
// TODO: SEO
// TODO: Search Feature for blog posts

const HomePage = async () => {
    // Fetch author with image from Sanity
    const author = await client.fetch(groq`*[_type == "author"][0]{
        name,
        image
    }`);
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
                <div className={styles.authorProfile}>
                    {author?.image && (
                        <div className={styles.authorImageWrapper}>
                            <Image
                                src={urlFor(author.image).fit('crop').url()}
                                alt={author.name || 'Author profile photo'}
                                width={400}
                                height={500}
                                className={styles.authorImage}
                                priority
                            />
                        </div>
                    )}
                    <div className={styles.authorText}>
                        <h2 className={styles.header}>ME</h2>
                        <p>
                            Hey! I&apos;m Kulkarni <b>Venu</b>gopal.
                        </p>
                        <p>
                            Born during the Venus transit of 2004, I&apos;ve been orbiting between the technical and creative ever since. 
                        </p>
                        <p>
                        After emerging in a little town called Kalaburagi (literal translation: Land of Rocks and Thorns) in Karnataka, India, I was promptly whisked to Singapore, where I spent the first fifteen years of my life. In 2019, I moved to Chennai, where I graduated high school before returning to Singapore for National Service.
                        </p>
                        <p>
                        Currently, I&apos;m pursuing Computer Science and liberal arts(ish) at the National University of Singapore while part of the NUS College programme (Class of &apos;28).
                        </p>
                    </div>
                </div>
            </div>
            <div className={`${styles.para} ${styles.section2}`}>
                <h2 className={styles.header}>ABOUT THIS WEBSITE</h2>
                <p>
                    This website was built with <Link href='https://nextjs.org/' className={styles.emailLink}>Next.js</Link>, integrated with the <Link className={styles.emailLink} href="https://www.sanity.io/">Sanity</Link> headless content management system and hosted on <Link className={styles.emailLink} href="https://www.vercel.com/">Vercel</Link>. 
                </p>
                <p>The navigation was inspired by the folks over at <Link href='https://www.hugeinc.com/' className={styles.emailLink}>Huge inc</Link>.</p>
                <p>
                    Checkout the <Link href='https://www.github.com/vorld/next-blog' className={styles.emailLink}>Github repository</Link>. 
                </p>
            </div>
            <div className={`${styles.para} ${styles.section3}`}>
                <h2 className={styles.header}>CONTACT ME</h2>
                <p>
                    I love a good story—so feel free to reach out and tell me yours (or ask a question, share a musing, or just say hi).
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
