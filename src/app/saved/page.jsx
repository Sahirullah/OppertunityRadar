'use client';

import Header from '../../components/Header';
import styles from './saved.module.css';

export default function SavedPage() {
  const savedJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'Peshawar, PK',
      salary: 'PKR 150,000 - 200,000',
      savedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions',
      location: 'Islamabad, PK',
      salary: 'PKR 120,000 - 180,000',
      savedDate: '1 week ago'
    },
    {
      id: 3,
      title: 'Frontend Engineer',
      company: 'Web Innovations',
      location: 'Karachi, PK',
      salary: 'PKR 100,000 - 150,000',
      savedDate: '2 weeks ago'
    }
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Saved Jobs</h1>
          <p className={styles.subtitle}>You have {savedJobs.length} saved jobs</p>

          <div className={styles.jobsList}>
            {savedJobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  <div>
                    <h3>{job.title}</h3>
                    <p className={styles.company}>{job.company}</p>
                  </div>
                  <button className={styles.removeBtn}>
                    <i className="fa-solid fa-bookmark"></i>
                  </button>
                </div>
                <div className={styles.jobDetails}>
                  <span><i className="fa-solid fa-location-dot"></i> {job.location}</span>
                  <span><i className="fa-solid fa-money-bill"></i> {job.salary}</span>
                  <span className={styles.savedDate}>Saved {job.savedDate}</span>
                </div>
                <button className={styles.applyBtn}>View Job</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
