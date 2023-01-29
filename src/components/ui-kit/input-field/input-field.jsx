import React from 'react';
import styles from './input-field.module.scss';

export default function InputField({ id, label, ...props }) {
  return (
    <div className={styles['field']}>
      {label && (
        <label className={styles['field__label']} htmlFor={id}>
          {label}
        </label>
      )}

      <input id={id} className={styles['field__input']} {...props} />
    </div>
  );
}
