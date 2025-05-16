import React from 'react';
import AButton from '../../atoms/a-button/a-button';
import styles from './o-profile-modal.module.css';

const OProfileModal = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalBody}>
          <img
            className={styles.modalImage}
            src="https://www.dropbox.com/scl/fi/k2gkte4bqj3dndcermzcg/348s.jpg?rlkey=fnw24yd1hxwkvojps9o91mjmx&st=r4v22668&raw=1"
            alt="Profile"
          />

          <h2>{profile.name}</h2>
          <p>
            <strong>Belt Rank:</strong> {profile.beltRank}
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <p>
            <strong>Role:</strong> {profile.role}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus sed ligula
            vitae sodales. Etiam sed ipsum lacinia, tincidunt nisi a, interdum eros. Morbi ultrices
            turpis non nulla placerat, at mattis lectus bibendum. Suspendisse posuere tortor ut
            dignissim scelerisque. Donec cursus vitae enim id ullamcorper. Nunc ac metus a leo
            tristique suscipit. Cras mattis scelerisque condimentum.
          </p>
          <AButton onClick={onClose} text="Close" />
        </div>
      </div>
    </div>
  );
};

export default OProfileModal;
