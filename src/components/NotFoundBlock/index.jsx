import React from 'react';
import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <span className={styles.title}>К сожалению ничего не найдено 😕 </span>
      <br />
      <span>Данная страница отсутствует в нашем интернет-магазине</span>
    </div>
  );
}

export default NotFoundBlock;
