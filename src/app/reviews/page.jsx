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
        <main className={styles.main}>
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <i className="fa-brands fa-sistrix"></i>
                <input 
                  type="text" 
                  placeholder="Search companies..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className={styles.locationBox}>
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
          </div>

          <div className={styles.content}>
            <h1>Company Reviews</h1>
            <p>You haven't written any reviews yet.</p>
            <button className={styles.btn}>Write a Review</button>
          </div>
        </main>
      </div>
    </>
  );
}
