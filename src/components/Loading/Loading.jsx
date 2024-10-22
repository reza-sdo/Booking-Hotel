import React from 'react';
import styles from './style.module.css';

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.content}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
}

export default Loading;
