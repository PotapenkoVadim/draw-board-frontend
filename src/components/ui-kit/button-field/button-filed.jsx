import React from 'react';
import InputField from '@/components/ui-kit/input-field/input-field';
import styles from './button-field.module.scss';

export default function ButtonField({ label, handleChange, handleClick }) {
  return (
    <div className={styles['button-field']}>
      <InputField
        onChange={handleChange}
        className={styles['button-field__input']}
      />

      <span onClick={handleClick} className={styles['button-field__button']}>
        Entry to room
      </span>

      <span className={styles['button-field__label']}>{label}</span>
    </div>
  );
}
