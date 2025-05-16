import React from 'react';
import styles from './m-text-input.module.css';
import ALabel from '../../atoms/a-label/a-label';

const MTextInput = ({ label, id, value, onChange, type = 'text', placeholder }) => {
  return (
    <div className={styles.textInputRow}>
      <ALabel label={label} id={id} />
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.textInputBox}
      />
    </div>
  );
};

export default MTextInput;
