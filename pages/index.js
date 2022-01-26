/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';

import styles from '../styles/Home.module.css';

function Home() {
  const { data, error, mutate } = useSWR('/api/me', async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  let loggedIn = false;

  if (!data)
    return (
      <div className={styles.container}>
        <h1 className={styles.description}>Loading...</h1>
      </div>
    );

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
        Complete tasks ✅ to level up 🔺 your pet!
      </h3>
      {loggedIn && (
        <>
          <div className={styles.grid}>
            <p>Welcome {data.email}!</p>
          </div>
          <nav className={styles.grid}>
            <a href='/dashboard' className={styles.submitButton}>
              Continue to dashboard 👉
            </a>
          </nav>
          <button
            onClick={() => {
              cookie.remove('token');
              mutate();
            }}
            className={styles.smallButton}
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
      <div className={styles.footer}>
        Made with{' '}
        <span className='emoji hearts' role='img' aria-label='hearts'></span> in
        California
      </div>
      <ul className={styles.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default Home;
