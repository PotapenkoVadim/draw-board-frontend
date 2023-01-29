import React from 'react';
import styles from './button.module.scss';

export default function Button({ variant }) {
  return (
    <button className={`${styles['button']} ${styles[`button__${variant}`]}`} />
  );
}