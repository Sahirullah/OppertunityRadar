'use client';

import Header from '../../components/Header';
import styles from './saved.module.css';
import { useSavedJobs } from '../../context/SavedJobsContext';

export default function SavedPage() {
  const { savedJobs, unsaveJob } = useSavedJobs();

  const handleRemove = (jobId) => {
    unsaveJob(jobId);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Saved Jobs</h1>
          <p className={styles.subtitle}>You have {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}</p>

          {savedJobs.length > 0 ? (
            <div className={styles.jobsList}>
              {savedJobs.map((job) => (
                <div key={job.id} className={styles.jobCard}>
                  <div className={styles.jobHeader}>
                    <div>
                      <h3>{job.title}</h3>
                      <p className={styles.company}>{job.company}</p>
                    </div>
                    <button 
                      className={styles.removeBtn}
                      onClick={() => handleRemove(job.id)}
                      title="Remove from saved"
                    >
                      <i className="fa-solid fa-bookmark"></i>
                    </button>
                  </div>
                  <div className={styles.jobDetails}>
                    <span><i className="fa-solid fa-location-dot"></i> {job.location}</span>
                    {job.salary && <span><i className="fa-solid fa-money-bill"></i> {job.salary}</span>}
                    {job.savedAt && (
                      <span className={styles.savedDate}>
                        Saved {new Date(job.savedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <button className={styles.applyBtn}>View Job</button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <i className="fa-regular fa-bookmark" style={{ fontSize: '3rem', color: '#ccc', marginBottom: '1rem' }}></i>
              <p>No saved jobs yet</p>
              <p className={styles.emptySubtext}>Save jobs to view them here later</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
