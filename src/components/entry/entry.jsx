import React from 'react';
import ButtonField from '@/components/ui-kit/button-field/button-filed';
import styles from './entry.module.scss';

export default function Entry() {
  return (
    <div className={styles['entry']}>
      <div className={styles['entry__container']}>
        <h1 className={styles['entry__title']}>Welcome to DrawBoard</h1>

        <ButtonField />
      </div>
    </div>
  );
}
