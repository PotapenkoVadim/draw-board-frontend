import React from 'react';
import { NavLink } from 'react-router-dom';
import canvasState from '@/store/canvas';
import InputField from '@/components/ui-kit/input-field/input-field';
import styles from './button-field.module.scss';

export default function ButtonField() {
  const handleChange = (event) => {
    canvasState.setUsername(event.target.value);
  };

  return (
    <div className={styles['button-field']}>
      <InputField
        onChange={handleChange}
        className={styles['button-field__input']}
      />

      <NavLink
        className={styles['button-field__button']}
        to={`f${(+new Date()).toString(16)}`}
      >
        Entry to room
      </NavLink>

      <span className={styles['button-field__label']}>Username:</span>
    </div>
  );
}
