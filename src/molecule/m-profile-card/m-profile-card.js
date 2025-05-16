import React from 'react';
import styles from './m-profile-card.module.css';
import AButton from '../../atoms/a-button/a-button';

const MProfileCard = ({ name, beltRank, location, role, imageUrl, handleOpenModal, profile }) => {
  // When ready, add an argument to pass the bioText to the function
  const truncateBioText = () => {
    const testBio =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et vulputate est, vel tincidunt lectus. Phasellus in leo nec neque sodales mollis in vulputate arcu. Praesent rutrum orci velit, ut gravida nunc ornare varius. Cras eget risus nibh. Pellentesque ultricies vitae dolor facilisis sagittis. Cras sit amet cursus lacus. Sed maximus vel nunc ut ornare. Nam elit nibh, bibendum ut ullamcorper ac, suscipit quis arcu. Praesent et dui sem. Nulla tristique sodales massa, et molestie purus facilisis eu. Sed cursus tristique lacinia.';

    const textLimit = 150;
    const shouldTruncate = testBio.length > textLimit;
    const readMore = (
      <AButton text="Read More" type="button" textButton={true} onClick={() => handleOpenModal(profile)} />
    );
    const displayedText = shouldTruncate ? (
      <>
        {testBio.slice(0, textLimit)}... {readMore}
      </>
    ) : (
      testBio
    );

    return displayedText;
  };

  return (
    <div className={styles.profileCard}>
      {/* <img src={imageUrl} alt={`${name}'s avatar`} className={styles.profileAvatar} /> */}
      <img
        src="https://www.dropbox.com/scl/fi/d8tb898xddg9w1487d5ta/150px.jpg?rlkey=fxv4db3c6unw1m4kexpihfaeq&st=qu3t6ec1&raw=1"
        alt={`${name}'s avatar`}
        className={styles.profileAvatar}
      />
      <div className={styles.profileDetails}>
        <h3 className={styles.profileName}>{name}</h3>
        <p className={styles.profileInfo}>
          <strong>Belt:</strong> {beltRank}
        </p>
        <p className={styles.profileInfo}>
          <strong>Location:</strong> {location}
        </p>
        <p className={styles.profileInfo}>
          <strong>Role:</strong> {role}
        </p>
      </div>
      <div className={styles.profileBio}>{truncateBioText()}</div>
    </div>
  );
};

export default MProfileCard;
