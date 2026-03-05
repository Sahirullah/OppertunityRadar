'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './settings.module.css';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || 'sahirullah313@gmail.com',
    phone: '0319 1954292',
    location: 'Peshawar, 25000, PK',
    privacy: 'public',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateProfile({
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      privacy: formData.privacy,
    });
    alert('Settings saved successfully!');
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Account Settings</h1>
          
          <div className={styles.section}>
            <h2>Personal Information</h2>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Privacy Settings</h2>
            <div className={styles.formGroup}>
              <label>Profile Visibility</label>
              <select name="privacy" value={formData.privacy} onChange={handleChange}>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
