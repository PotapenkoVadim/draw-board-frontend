import React from 'react';
import styles from './palette.module.scss';

export default function Palette() {
  return <input className={styles['palette']} type="color" />;
}
