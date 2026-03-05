'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './applications.module.css';
import { useApplications } from '../../context/ApplicationsContext';

export default function Applications() {
  const { applications } = useApplications();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredApplications = filterStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ff9800';
      case 'accepted': return '#4caf50';
      case 'rejected': return '#f44336';
      default: return '#999';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.header}>
            <h1>My Applications</h1>
            <p>Track all your job applications in one place</p>
          </div>

          <div className={styles.filterSection}>
            <button 
              className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({applications.length})
            </button>
            <button 
              className={`${styles.filterBtn} ${filterStatus === 'pending' ? styles.active : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              Pending ({applications.filter(a => a.status === 'pending').length})
            </button>
            <button 
              className={`${styles.filterBtn} ${filterStatus === 'accepted' ? styles.active : ''}`}
              onClick={() => setFilterStatus('accepted')}
            >
              Accepted ({applications.filter(a => a.status === 'accepted').length})
            </button>
            <button 
              className={`${styles.filterBtn} ${filterStatus === 'rejected' ? styles.active : ''}`}
              onClick={() => setFilterStatus('rejected')}
            >
              Rejected ({applications.filter(a => a.status === 'rejected').length})
            </button>
          </div>

          <div className={styles.applicationsList}>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <div key={app.id} className={styles.applicationCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.jobInfo}>
                      <h3>{app.jobTitle}</h3>
                      <p className={styles.company}>{app.company}</p>
                    </div>
                    <div 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(app.status) }}
                    >
                      {getStatusLabel(app.status)}
                    </div>
                  </div>

                  <div className={styles.cardDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Applied:</span>
                      <span className={styles.value}>
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Name:</span>
                      <span className={styles.value}>{app.fullName}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Email:</span>
                      <span className={styles.value}>{app.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Phone:</span>
                      <span className={styles.value}>{app.phone}</span>
                    </div>
                    {app.currentPosition && (
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Position:</span>
                        <span className={styles.value}>{app.currentPosition}</span>
                      </div>
                    )}
                    {app.yearsExperience && (
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Experience:</span>
                        <span className={styles.value}>{app.yearsExperience}</span>
                      </div>
                    )}
                    {app.coverLetter && (
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Cover Letter:</span>
                        <p className={styles.coverLetter}>{app.coverLetter}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noApplications}>
                <p>No applications yet. Start applying to jobs!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
