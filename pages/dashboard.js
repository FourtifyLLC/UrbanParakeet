/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState('');
  const [category, setCategory] = useState('');

  const handleSetTodo = (event) => {
    setTodo(event.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();
    fetch('/api/add?todo=' + todo)
      .then((res) => res.json())
      .then((data) => {
        loadTodos();
      });
    event.target.reset();
  };

  const removeTodo = (rtodo) => {
    fetch('/api/remove?todo=' + rtodo)
      .then((res) => res.json())
      .then((data) => {
        loadTodos();
      });
  };

  const loadTodos = () => {
    fetch('/api/list')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!data)
    return (
      <div className={styles.container}>
        <h1 className={styles.description}>Loading...</h1>
      </div>
    );
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.subtitle}>Automatic Parakeet 🦜</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.grid}>
          <form className={styles.cardForm} onSubmit={addTodo}>
            <input
              className={styles.cardInput}
              type='text'
              name='todo'
              onChange={handleSetTodo}
              placeholder='Add a new task'
            />
          </form>
          <div className={styles.grid}>
            <h3 className={styles.description}>
              Your tasks <br />
              <br />
            </h3>
            {data.map((item) => (
              <a
                href='#'
                onClick={() => removeTodo(item)}
                className={styles.card}
              >
                <p>{item}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
