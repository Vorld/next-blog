//Components
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Typewriter from '../components/Typewriter'

import styles from '../styles/Home.module.css'

let msgs = ['HELLO.', 'I AM VENU.'];

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home | Kulkarni Venugopal</title>
        <meta name="description" content="Kulkarni Venugopal's Personal Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.landing}>
        <Typewriter messages={msgs} />
      </div>
      <div className={styles.para} style={{ background: '#DEE2E6' }}>
        <h2 className={styles.header}>ME</h2>
        <p>
          I am Kulkarni <b>Venu</b>gopal.
        </p>
        <p>
          I like many things.
          <br /> <br />
          Astronomy, music, physics, programming, literature, mathematics,
          video games, and more...
          <br /> <br />I like to <b>learn</b>.
        </p>
      </div>
      <div className={styles.para} style={{ background: '#CED4DA' }}>
        <h2 className={styles.header}>ABOUT THIS WEBSITE</h2>
        <p>
          I like minimalism. Less is more.
          <br /> I believe in communicating <span style={{ fontSize: 30 }}>big</span> ideas in simple ways.
        </p>
        <p>
          This website was built with <a href='https://nextjs.org/'>Next.js</a> and
          the navigation was inspired by the folks over at{" "}
          <Link href='https://www.hugeinc.com/'>Huge</Link>.
        </p>
      </div>
      <div className={styles.para} style={{ background: '#343A40', color: '#F8F9FA' }}>
        <h2 className={styles.header}>CONTACT ME</h2>
        <p>
          If you need anything, I&apos;ll always be one{" "}
          <Link href='mailto:KulkarniVenugopal@outlook.com'>email</Link> away.
        </p>
      </div>
    </div >
  )
}

export default Home