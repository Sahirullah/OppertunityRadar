'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './reviews.module.css';
import { useCompanies } from '../../context/CompaniesContext';

export default function ReviewsPage() {
  const { companies } = useCompanies();
  const [searchQuery, setSearchQuery] = useState('');

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
          <h2 className={styles.sectionTitle}>Registered companies</h2>

          {filteredCompanies.length > 0 ? (
            <div className={styles.companiesGrid}>
              {filteredCompanies.map((company) => (
                <div key={company.id} className={styles.companyCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.companyLogo}>
                      {company.logo || company.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.companyBasicInfo}>
                      <h3 className={styles.companyName}>{company.name}</h3>
                      <div className={styles.ratingSection}>
                        <span className={styles.stars}>
                          {company.rating ? '★'.repeat(Math.round(company.rating)) + '☆'.repeat(5 - Math.round(company.rating)) : '★★★★☆'}
                        </span>
                        <span className={styles.ratingCount}>{company.reviewCount || 0} reviews</span>
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
              <p>No registered companies found. Check back soon!</p>
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
