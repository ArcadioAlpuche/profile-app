import React from 'react';
import styles from './a-button.module.css';

const AButton = ({ disabled, type, text, onClick, textButton }) => {
  return (
    <button className={textButton ? styles.textButton : styles.GFButton} type={type} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default AButton;
