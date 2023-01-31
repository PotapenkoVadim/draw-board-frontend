import React from 'react';
import styles from './button.module.scss';

export default function Button({ variant, onClick, className, title }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`${styles['button']} ${styles[`button__${variant}`]} ${
        className ?? ''
      }`}
    />
  );
}
