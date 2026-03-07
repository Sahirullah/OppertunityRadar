'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './reviews.module.css';

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <i className="fa-brands fa-sistrix"></i>
              <input 
                type="text" 
                placeholder="Search company reviews..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.locationBox}>
              <i className="fa-solid fa-location-dot"></i>
              <select 
                className={styles.locationSelect}
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="pakistan">Pakistan</option>
                <option value="london">London, UK</option>
                <option value="new york">New York, USA</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <button className={styles.searchBtn}>Search</button>
          </div>

          <div className={styles.searchSuggestions}>
            <span className={styles.suggestionLabel}>Popular searches:</span>
            <div className={styles.suggestionTags}>
              <button className={styles.suggestionTag}>Google</button>
              <button className={styles.suggestionTag}>Microsoft</button>
              <button className={styles.suggestionTag}>Amazon</button>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <h1>My Reviews</h1>
          <p>You haven't written any reviews yet.</p>
          <button className={styles.btn}>Write a Review</button>
        </div>
      </div>
    </>
  );
}
