/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import styles from '../styles/Home.module.css';

const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, { expires: 2 });
          Router.push('/login');
        }
      });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <p className={styles.description}>Nice to meet you 👋</p>
        <label htmlFor='email'>
          <input
            name='email'
            type='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className={styles.loginInput}
          />
        </label>

        <label htmlFor='password'>
          <input
            name='password'
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            className={styles.loginInput}
          />
        </label>
        <br />
        <input
          type='submit'
          value='Create account'
          className={styles.submitButton}
        />
        {signupError && (
          <p style={{ textAlign: 'center', color: 'red' }}>{signupError}</p>
        )}
      </form>
      <nav className={styles.grid}>
        <a href='/'>👈 Go back</a>
      </nav>
    </div>
  );
};

export default Signup;
