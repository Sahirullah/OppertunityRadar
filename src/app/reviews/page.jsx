'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './reviews.module.css';
import { useJobs } from '../../context/JobsContext';

export default function ReviewsPage() {
  const { jobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter companies based on search
  let filteredCompanies = companies;

  if (searchQuery.trim()) {
    filteredCompanies = filteredCompanies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Find great places to work</h1>
            <p className={styles.heroSubtitle}>Get access to millions of company reviews</p>

            <div className={styles.searchSection}>
              <div className={styles.searchBox}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input 
                  type="text" 
                  placeholder="Company name or job title" 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className={styles.findBtn}>Find Companies</button>
            </div>

            <p className={styles.searchHint}>
              <a href="#salaries">Do you want to search for salaries?</a>
            </p>
          </div>
        </section>

        {/* Popular Companies Section */}
        <section className={styles.companiesSection}>
          <h2 className={styles.sectionTitle}>Popular companies</h2>

          {filteredCompanies.length > 0 ? (
            <div className={styles.companiesGrid}>
              {filteredCompanies.map((company, index) => (
                <div key={index} className={styles.companyCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.companyLogo}>
                      {company.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.companyBasicInfo}>
                      <h3 className={styles.companyName}>{company.name}</h3>
                      <div className={styles.ratingSection}>
                        <span className={styles.stars}>★★★★☆</span>
                        <span className={styles.ratingCount}>{company.reviews} reviews</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardLinks}>
                    <a href="#salaries" className={styles.cardLink}>Salaries</a>
                    <a href="#qa" className={styles.cardLink}>Q&A</a>
                    <a href="#jobs" className={styles.cardLink}>Open jobs</a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No companies found matching your search.</p>
            </div>
          )}
        </section>

        {/* Rate Employer Section */}
        <section className={styles.rateSection}>
          <div className={styles.rateContent}>
            <div className={styles.rateIcon}>💬</div>
            <div className={styles.rateText}>
              <h3>Rate your recent employer:</h3>
              <div className={styles.rateStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={styles.rateStar}>★</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
