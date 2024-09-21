import React from 'react';
import styles from './style.module.css';

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div class={styles.content}>
        <div class={styles.circle}></div>
        <div class={styles.circle}></div>
        <div class={styles.circle}></div>
        <div class={styles.circle}></div>
      </div>
    </div>
  );
}

export default Loading;
