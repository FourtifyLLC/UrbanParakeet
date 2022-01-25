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
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Automatic Parakeet</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <h1 className={styles.title}>Automatic Parakeet 🦜</h1>

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
    </div>
  );
}

export default Home;
