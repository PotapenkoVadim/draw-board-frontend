import React from 'react';
import Button from '@/components/ui-kit/button/button';
import Palette from '@/components/ui-kit/palette/palette';
import styles from './toolbar.module.scss';

export default function Toolbar() {
  return (
    <div className={styles['toolbar']}>
      <Button variant='brush' />
      <Button variant='square' />
      <Button variant='circle' />
      <Palette />
      
      <Button variant='line' />
      <Button variant='undo' />
      <Button variant='redo' />
      <Button variant='save' />
    </div>
  );
}