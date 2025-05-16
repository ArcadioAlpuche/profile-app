import React, { useState } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, Timestamp, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { beltColors, roles } from '../../services/profile-options';
import MTextInput from '../../molecule/m-text-input/m-text-input';
import MDropdownInput from '../../molecule/m-dropdown-input/m-dropdown-input';
import AButton from '../../atoms/a-button/a-button';

import styles from './o-add-profile-form.module.css';

const OAddProfileForm = () => {
  const [name, setName] = useState('');
  const [beltRank, setBeltRank] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      let imageUrl = '';
  
      // Upload image to Firebase Storage
      if (image) {
        const imageRef = ref(storage, `profile-images/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }
  
      // Calculate TTL deleteAt timestamp (1 week from now)
      const oneWeekFromNow = Timestamp.fromDate(
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      );
  
      // Add document to Firestore
      await addDoc(collection(db, 'profiles'), {
        name,
        beltRank,
        imageUrl,
        location,
        role,
        createdAt: Timestamp.now(),
        deleteAt: oneWeekFromNow,        // For TTL auto-delete
        lastUpdated: Timestamp.now(),    // For rate limiting
      });
  
      // Reset form
      setName('');
      setBeltRank('');
      setRole('Student');
      setLocation('');
      setImage(null);
      alert('Profile added successfully!');
    } catch (error) {
      console.error('Error adding profile:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <h2>Add New Profile</h2>
        <MTextInput
          label="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name"
        />
        <MTextInput
          label="School Location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location Details"
        />
        <MDropdownInput
          label="Belt Rank"
          id="beltRank"
          value={beltColors.find((option) => option.value === beltRank) || null}
          options={beltColors}
          onChange={(selectedOption) => setBeltRank(selectedOption?.value)}
        />
        <MDropdownInput
          label="Role"
          id="role"
          value={roles.find((option) => option.value === roles)}
          options={roles}
          onChange={(selectedOption) => setRole(selectedOption?.value)}
        />
        {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: '1rem' }}
        /> */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'end' }}>
          <AButton type="submit" disabled={loading} text={loading ? 'Adding...' : 'Add Profile'} />
        </div>
      </form>
    </div>
  );
};

export default OAddProfileForm;
