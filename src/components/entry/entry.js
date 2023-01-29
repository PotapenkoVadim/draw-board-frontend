import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './entry.module.scss';

export default function Entry() {
  return (
    <div className={styles['entry']}>
      <div className={styles['entry__container']}>
        <h1 className={styles['entry__title']}>Welcome to DrawBoard</h1>

        <NavLink
          className={styles['entry__link']}
          to={`f${(+new Date()).toString(16)}`}
        >
          Entry to room
        </NavLink>
      </div>
    </div>
  );
}
