/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';

import styles from '../styles/Home.module.css';

function Home() {
  const { data, revalidate } = useSWR('/api/me', async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data)
    return (
      <div className={styles.container}>
        <h1 className={styles.description}>Loading...</h1>
      </div>
    );
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Urban Parakeet</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className={styles.grid}>
        <h1 className={styles.title}>Urban Parakeet</h1>
        <span className={styles.parakeet}>🦜</span>
      </div>
      <h3 className={styles.description}>
        Complete tasks ✅ to level up 🔺 your character!
      </h3>
      {loggedIn && (
        <>
          <p>Welcome {data.email}!</p>
          <button
            onClick={() => {
              cookie.remove('token');
              revalidate();
            }}
          >
            Logout
          </button>
        </>
      )}
      <div className={styles.grid}>
        {!loggedIn && (
          <>
            <span>
              <Link href='/login'>Login</Link>
              {' or '}
              <Link href='/signup'>Sign Up</Link>
              {' to Get Started'}
            </span>
          </>
        )}
      </div>
      <nav className={styles.grid}>
        <a href='/dashboard' className={styles.submitButton}>
          Continue straight to dashboard 🚧
        </a>
      </nav>
    </div>
  );
}

export default Home;
