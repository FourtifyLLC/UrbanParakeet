/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function Home() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState('');
  const [category, setCategory] = useState('');

  const [progress, setProgress] = useState(10);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
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
        <h1 className={styles.subtitle}>🦜</h1>
      </header>
      <main className={styles.main}>
        <Card sx={{ display: 'flex', minWidth: '300px' }}>
          <Box>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component='div' variant='body1'>
                Character Card
              </Typography>
              <LinearProgressWithLabel
                value={progress}
                color='inherit'
                sx={{ display: 'flex', width: 300 }}
              />
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Example text
              </Typography>
            </CardContent>
          </Box>
        </Card>
        <div className={styles.grid}>
          <form className={styles.cardForm} onSubmit={addTodo}>
            <input
              className={styles.cardInput}
              type='text'
              name='todo'
              onChange={handleSetTodo}
              placeholder='Add a new task...'
            />
          </form>
          <div className={styles.grid}>
            {data.map((item) => (
              <LightTooltip title='+5 EXP' placement='top'>
                <a
                  href='#'
                  onClick={() => removeTodo(item)}
                  className={styles.card}
                >
                  <p>{item}</p>
                </a>
              </LightTooltip>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
