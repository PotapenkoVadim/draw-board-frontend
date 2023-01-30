import React from 'react';
import styles from './button.module.scss';

export default function Button({ variant, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`${styles['button']} ${styles[`button__${variant}`]} ${
        className ?? ''
      }`}
    />
  );
}
