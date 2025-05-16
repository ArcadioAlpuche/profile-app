import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import OProfileModal from '../o-profile-modal/o-profile-modal';
import AButton from '../../atoms/a-button/a-button';
import ADropdownMenu from '../../atoms/a-dropdown-menu/a-dropown-menu';

const OProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  // const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [beltFilter, setBeltFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

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

  const handleOpenModal = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  // const sortedProfiles = [...profiles].sort((a, b) => {
  //   if (!sortConfig.key) return 0;

  //   const aVal = a[sortConfig.key]?.toLowerCase?.() ?? '';
  //   const bVal = b[sortConfig.key]?.toLowerCase?.() ?? '';

  //   if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
  //   if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
  //   return 0;
  // });

  // const handleSort = (key) => {
  //   setSortConfig((prev) => ({
  //     key,
  //     direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
  //   }));
  // };

  const handleClearFilters = () => {
    setBeltFilter(null);
    setRoleFilter(null);
  };
  return (
    <div style={{ height: '80vh', width: '100vh' }}>
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
      <ul>
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '8px 0px',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <span style={{ width: '20%', cursor: 'pointer' }}>
            Name
          </span>
          <span style={{ width: '20%', cursor: 'pointer' }}>
            Belt
          </span>
          <span style={{ width: '20%', cursor: 'pointer' }}>
            Location
          </span>
          <span style={{ width: '20%', cursor: 'pointer' }}>
            Role
          </span>
          <span style={{ width: '20%' }}>More Details</span>
        </li>
        {filteredProfiles.map((profile) => (
          <li
            key={profile.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              padding: '8px 0px',
            }}
          >
            <span style={{ width: '20%' }}>{profile.name}</span>
            <span style={{ width: '20%' }}>{profile.beltRank}</span>
            <span style={{ width: '20%' }}>{profile.location}</span>
            <span style={{ width: '20%' }}>{profile.role}</span>
            <AButton
              text="View Details"
              type="button"
              onClick={() => handleOpenModal(profile)}
            ></AButton>
          </li>
        ))}
      </ul>

      <OProfileModal profile={selectedProfile} onClose={handleCloseModal} />
    </div>
  );
};

export default OProfileList;
