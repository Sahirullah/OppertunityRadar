'use client';

import { useState } from 'react';
import Header from '../components/Header';
import styles from './job-finder/job-finder.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('my-jobs');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Office Assistant / Social Media Assistant',
      company: 'JD',
      location: 'London, UK',
      postedTime: '3 days ago',
      match: 92,
      description: 'As the Digital Marketing Manager, E-Commerce, you will be collaborating with E-Commerce department and Communication department...',
      recommended: true,
      applied: false,
      saved: false,
    },
    {
      id: 2,
      title: 'Office Assistant / Social Media Assistant',
      company: 'Facebook',
      location: 'London, UK',
      postedTime: '2 days ago',
      match: 80,
      description: 'As the Digital Marketing Manager, E-Commerce, you will be collaborating with E-Commerce department and Communication department...',
      recommended: false,
      applied: true,
      saved: true,
    },
    {
      id: 3,
      title: 'Marketing & Communications Manager',
      company: 'Unilever',
      location: 'London, UK',
      postedTime: '1 day ago',
      match: 78,
      description: 'Looking for a fun and rewarding career cheering people on as they gain their health and life back...',
      recommended: false,
      applied: false,
      saved: false,
    },
  ]);

  const handleApply = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, applied: true } : job
    ));
  };

  const handleSave = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
  };

  const selectedJobData = selectedJob || jobs[0];

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
                  placeholder="Job title, keywords, or company" 
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.locationBox}>
                <select className={styles.locationSelect}>
                  <option>pakistan</option>
                  <option>London, UK</option>
                  <option>New York, USA</option>
                  <option>Remote</option>
                </select>
              </div>
              <button className={styles.searchBtn}>Find jobs</button>
            </div>
          </div>

          <div className={styles.filterTags}>
            <button className={styles.filterTag}>Job Types ▼</button>
            <button className={styles.filterTag}>Salaries ▼</button>
            <button className={styles.filterTag}>Posted Time ▼</button>
            <div className={styles.spacer}></div>
            <span className={styles.matchLabel}>Your matching CV:</span>
            <button className={styles.cvSelect}>Matthew's CV ▼</button>
          </div>

          <div className={styles.sortAndCount}>
            <button className={styles.sortBtn}>⬇ Most Recent</button>
            <span className={styles.count}>Showing {jobs.length} jobs</span>
          </div>

          <div className={styles.content}>
            <div className={styles.jobsList}>
              {jobs.map((job) => (
                <div 
                  key={job.id}
                  className={`${styles.jobCard} ${selectedJob?.id === job.id ? styles.selected : ''}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className={styles.jobCardHeader}>
                    <h3>{job.title}</h3>
                    <span className={styles.matchBadge}>{job.match}</span>
                  </div>
                  <div className={styles.jobCardMeta}>
                    <span className={styles.company}>{job.company}</span>
                    <span className={styles.location}>{job.location}</span>
                  </div>
                  <p className={styles.jobCardDesc}>{job.description}</p>
                  <div className={styles.jobCardFooter}>
                    {job.recommended && <span className={styles.recommended}>⭐ Recommended - 2 days ago</span>}
                    {job.applied && <span className={styles.applied}>✓ You applied - 2 days ago</span>}
                    <button 
                      className={styles.saveBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave(job.id);
                      }}
                    >
                      {job.saved ? '❤' : '🤍'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.jobDetail}>
              <h1>{selectedJobData.title}</h1>
              <div className={styles.jobDetailMeta}>
                <span className={styles.company}>{selectedJobData.company}</span>
                <span className={styles.location}>{selectedJobData.location}</span>
                <span className={styles.time}>{selectedJobData.postedTime}</span>
                <span className={styles.star}>⭐</span>
              </div>

              <div className={styles.actionButtons}>
                <button 
                  className={styles.applyBtn}
                  onClick={() => handleApply(selectedJobData.id)}
                >
                  {selectedJobData.applied ? '✓ Applied' : 'Apply'}
                </button>
                <button className={styles.customizeBtn}>Customize CV & Apply</button>
                <span className={styles.matchScore}>{selectedJobData.match} great match</span>
                <button className={styles.saveIconBtn}>🤍</button>
              </div>

              <div className={styles.matchingSection}>
                <h3>How well is your CV matching?</h3>
                <div className={styles.matchChart}>
                  <div className={styles.matchItem}>
                    <span className={styles.matchNumber}>92</span>
                    <span className={styles.matchLabel}>Great match</span>
                  </div>
                  <div className={styles.chartVisual}>
                    <div className={styles.circle}>
                      <span>92</span>
                    </div>
                  </div>
                </div>
                <div className={styles.matchDetails}>
                  <div className={styles.matchDetail}>
                    <span className={styles.icon}>⚠</span>
                    <span>6/10 skills matching</span>
                  </div>
                  <div className={styles.matchDetail}>
                    <span className={styles.icon}>✓</span>
                    <span>6/10 keywords matching</span>
                  </div>
                  <div className={styles.matchDetail}>
                    <span className={styles.icon}>✓</span>
                    <span>2/2 certificates matching</span>
                  </div>
                </div>
                <button className={styles.improveBtn}>Improve CV</button>
              </div>

              <p className={styles.jobDescription}>
                Looking for a fun and rewarding career cheering people on as they gain their health and life back? Tie Terveyteen Acupuncture Clinic is a rewarding and positive place to work.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
