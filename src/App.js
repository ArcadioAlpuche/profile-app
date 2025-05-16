import React, { useState } from 'react';
import OAddProfileForm from './organisms/o-add-profile-form/o-add-profile-form';
import AButton from './atoms/a-button/a-button';
import styles from './app.module.css';
import OProfileListCard from './organisms/o-profile-list-card/o-profile-list-card';

function App() {
  const [activeComponent, setActiveComponent] = useState('list');

  const toggleComponent = () => {
    setActiveComponent((prev) => (prev === 'list' ? 'form' : 'list'));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <AButton
          onClick={toggleComponent}
          text={activeComponent === 'list' ? 'Add New Profile' : 'View Profile List'}
        />
      </div>
      <div
        className={styles.mainContainer}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          marginTop: '20px',
        }}
      >
        {/* <h1>Gracie Fighter Profiles</h1> */}
        {activeComponent === 'list' ? <OProfileListCard /> : <OAddProfileForm />}
      </div>
    </div>
  );
}

export default App;
