'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './reviews.module.css';
import { useJobs } from '../../context/JobsContext';

export default function ReviewsPage() {
  const { jobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Get unique companies from jobs
  const companies = Array.from(
    new Map(
      jobs.map(job => [job.company, {
        name: job.company,
        location: job.location,
        jobsCount: jobs.filter(j => j.company === job.company).length,
        rating: 4.5,
        reviews: Math.floor(Math.random() * 500) + 50,
      }])
    ).values()
  );

  // Filter companies based on search and location
  let filteredCompanies = companies;

  if (searchQuery.trim()) {
    filteredCompanies = filteredCompanies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (locationFilter && locationFilter !== '') {
    filteredCompanies = filteredCompanies.filter(company =>
      company.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <i className="fa-solid fa-magnifying-glass"></i>
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

          <div className={styles.companiesSection}>
            <div className={styles.companiesHeader}>
              <h2>Registered Companies</h2>
              <p className={styles.companiesCount}>Showing {filteredCompanies.length} companies</p>
            </div>

            {filteredCompanies.length > 0 ? (
              <div className={styles.companiesList}>
                {filteredCompanies.map((company, index) => (
                  <div key={index} className={styles.companyCard}>
                    <div className={styles.companyHeader}>
                      <div className={styles.companyLogo}>
                        {company.name.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.companyInfo}>
                        <h3 className={styles.companyName}>{company.name}</h3>
                        <p className={styles.companyLocation}>
                          <i className="fa-solid fa-location-dot"></i> {company.location}
                        </p>
                      </div>
                      <div className={styles.companyStats}>
                        <div className={styles.rating}>
                          <span className={styles.stars}>★★★★☆</span>
                          <span className={styles.ratingValue}>{company.rating}</span>
                        </div>
                        <p className={styles.reviewCount}>{company.reviews} reviews</p>
                      </div>
                    </div>
                    <div className={styles.companyFooter}>
                      <span className={styles.jobsCount}>{company.jobsCount} active jobs</span>
                      <button className={styles.reviewBtn}>View Reviews</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noCompanies}>
                <p>No companies found matching your search.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
