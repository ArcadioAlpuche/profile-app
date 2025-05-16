import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import OProfileModal from '../o-profile-modal/o-profile-modal';
import AButton from '../../atoms/a-button/a-button';
import ADropdownMenu from '../../atoms/a-dropdown-menu/a-dropown-menu';
import MProfileCard from '../../molecule/m-profile-card/m-profile-card';
import styles from './o-profile-list-card.module.css';

const OProfileListCard = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [beltFilter, setBeltFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let result = profiles;

    if (beltFilter) {
      result = result.filter((p) => p.beltRank === beltFilter);
    }

    if (roleFilter) {
      result = result.filter((p) => p.role === roleFilter);
    }

    setFilteredProfiles(result);
  }, [beltFilter, roleFilter, profiles]);

  const beltOptions = [...new Set(profiles.map((p) => p.beltRank))].map((belt) => ({
    value: belt,
    label: belt,
  }));

  const roleOptions = [...new Set(profiles.map((p) => p.role))].map((role) => ({
    value: role,
    label: role,
  }));

  useEffect(() => {
    const fetchProfiles = async () => {
      const querySnapshot = await getDocs(collection(db, 'profiles'));
      const profilesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfiles(profilesData);
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleOpenModal = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true)
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
    setIsModalOpen(false)
  };

  const handleClearFilters = () => {
    setBeltFilter(null);
    setRoleFilter(null);
  };

  return (
    <div className={styles.profileListContainer}>
      <h2>Profile List</h2>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '1rem' }}>
        <ADropdownMenu
          label="Belt Rank"
          id="beltRank"
          value={beltOptions.find((option) => option.value === beltFilter) || null}
          onChange={(selectedOption) => setBeltFilter(selectedOption?.value)}
          options={beltOptions}
          placeholder="Filter By Belt"
        />

        <ADropdownMenu
          label="Role Filter"
          id="roleFilter"
          value={roleOptions.find((option) => option.value === roleFilter) || null}
          onChange={(selectedOption) => setRoleFilter(selectedOption?.value)}
          options={roleOptions}
          placeholder="Filter By Role"
        />
        <AButton text="Clear Filters" onClick={handleClearFilters} />
      </div>
      {filteredProfiles.map((profile) => (
        <MProfileCard
          key={profile.id}
          name={profile.name}
          beltRank={profile.beltRank}
          location={profile.location}
          role={profile.role}
          handleOpenModal={handleOpenModal}
          profile={profile}
        />
      ))}

      <OProfileModal profile={selectedProfile} onClose={handleCloseModal} />
    </div>
  );
};

export default OProfileListCard;
