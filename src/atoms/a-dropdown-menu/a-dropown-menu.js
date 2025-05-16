import React from 'react';
import styles from './a-dropdown-menu.module.css';
import Select from 'react-select';

const ADropdownMenu = ({ value, onChange, options, placeholder }) => {
  return (
    <Select className={styles.dropDownMenu} value={value} onChange={onChange} options={options} placeholder={placeholder ? placeholder : ''} />
  );
};

export default ADropdownMenu;
