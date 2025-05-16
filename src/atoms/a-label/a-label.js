import React from 'react';
import styles from './a-label.module.css';

const ALabel = ({ label, id }) => {
  return (
      <label htmlFor={id} className={styles.textInputLabel}>
        {label}
      </label>
  );
};

export default ALabel;
