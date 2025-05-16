import React from 'react';
import styles from './m-dropdown-input.module.css';
import ALabel from '../../atoms/a-label/a-label';
import ADropdownMenu from '../../atoms/a-dropdown-menu/a-dropown-menu';

const MDropdownInput = ({ label, id, value, onChange, options }) => {
  return (
    <div className={styles.textInputRow}>
      <ALabel label={label} id={id} />
      <ADropdownMenu value={value} onChange={onChange} options={options} />
    </div>
  );
};

export default MDropdownInput;
