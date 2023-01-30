import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ButtonField from '@/components/ui-kit/button-field/button-filed';
import InputField from '@/components/ui-kit/input-field/input-field';
import canvasState from '@/store/canvas';
import { configuration } from '@/configuration';
import styles from './entry.module.scss';

export default function Entry() {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState(null);

  const setUsername = (event) => {
    canvasState.setUsername(event.target.value);
  };

  const handleChangeRoomID = (event) => {
    setRoomID(event.target.value);
  };

  const goToRoom = () => {
    if (canvasState.username) {
      navigate(roomID ? `/${roomID}` : `/f${(+new Date()).toString(16)}`);
    } else {
      toast.error('Username is required!', configuration.toast);
    }
  };

  return (
    <div className={styles['entry']}>
      <div className={styles['entry__container']}>
        <h1 className={styles['entry__title']}>Welcome to DrawBoard</h1>

        <div className={styles['entry__username']}>
          <InputField
            className={styles['entry__username-field']}
            onChange={setUsername}
          />

          <span className={styles['entry__username-label']}>Username:</span>
        </div>

        <span className={styles['entry__description']}>
          Enter the room ID or leave it blank if you want to create a new room
        </span>

        <ButtonField
          label="Room ID:"
          handleClick={goToRoom}
          handleChange={handleChangeRoomID}
        />
      </div>

      <Toaster />
    </div>
  );
}
