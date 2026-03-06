'use client';

import { useState } from 'react';
import Header from '../components/Header';
import ApplyFormModal from '../components/ApplyFormModal';
import styles from './job-finder/job-finder.module.css';
import { useJobs } from '../context/JobsContext';
import { useSavedJobs } from '../context/SavedJobsContext';
import { useApplications } from '../context/ApplicationsContext';

export default function Home() {
  const { jobs: contextJobs } = useJobs();
  const { saveJob, unsaveJob, isJobSaved } = useSavedJobs();
  const { submitApplication } = useApplications();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyingJob, setApplyingJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  console.log('Home page - contextJobs:', contextJobs);

  const hasApplied = (jobId) => {
    return appliedJobs[jobId] || false;
  };

  // Show only admin-posted jobs
  let allJobs = contextJobs
    .filter(job => job.status === 'active')
    .map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      postedTime: job.postedTime,
      match: job.match,
      description: job.description,
      recommended: job.recommended || false,
      applied: hasApplied(job.id),
      saved: isJobSaved(job.id),
    }));

  // Filter jobs based on search query and location
  if (searchQuery.trim()) {
    allJobs = allJobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (locationFilter && locationFilter !== 'all') {
    allJobs = allJobs.filter(job =>
      job.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }

  const handleApply = (job) => {
    setApplyingJob(job);
    setShowApplyModal(true);
  };

  const handleApplySubmit = (applicationData) => {
    submitApplication(applicationData);
    setAppliedJobs(prev => ({
      ...prev,
      [applicationData.jobId]: true
    }));
  };

  const handleSave = (job) => {
    if (isJobSaved(job.id)) {
      unsaveJob(job.id);
    } else {
      saveJob(job);
    }
  };

  const selectedJobData = selectedJob || allJobs[0];

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
              <button className={styles.searchBtn}>Find jobs</button>
            </div>
          </div>

          <div className={styles.filterTags}>
            <button className={styles.filterTag}>Job Types ▼</button>
            <button className={styles.filterTag}>Salaries ▼</button>
            <button className={styles.filterTag}>Posted Time ▼</button>
            <div className={styles.spacer}></div>
          </div>

          <div className={styles.sortAndCount}>
            <button className={styles.sortBtn}>⬇ Most Recent</button>
            <span className={styles.count}>Showing {allJobs.length} jobs</span>
          </div>

          <div className={styles.content}>
            <div className={styles.jobsList}>
              {allJobs.length > 0 ? (
                allJobs.map((job) => (
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
                          handleSave(job);
                        }}
                      >
                        {job.saved ? '❤' : '🤍'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noJobs}>
                  <p>No jobs available yet. Check back soon!</p>
                </div>
              )}
            </div>

            {allJobs.length > 0 && selectedJobData && (
              <div className={styles.jobDetail}>
                <div className={styles.jobDetailHeader}>
                  <h1>{selectedJobData.title}</h1>
                  <div className={styles.jobDetailMeta}>
                    <span className={styles.company}>
                      <i className="fa-solid fa-briefcase"></i> {selectedJobData.company}
                    </span>
                    <span className={styles.location}>{selectedJobData.location}</span>
                    <span className={styles.time}>{selectedJobData.postedTime}</span>
                    <span className={styles.star}>⭐</span>
                  </div>
                  {selectedJobData.responseRate && (
                    <p className={styles.responseRate}>{selectedJobData.responseRate}</p>
                  )}
                </div>

                <div className={styles.actionButtons}>
                  <button 
                    className={styles.applyBtn}
                    onClick={() => handleApply(selectedJobData)}
                  >
                    {selectedJobData.applied ? '✓ Applied' : 'Apply'}
                  </button>
                  <button className={styles.customizeBtn}>Customize CV & Apply</button>
                  <span className={styles.matchScore}>{selectedJobData.match} great match</span>
                  <button className={styles.saveIconBtn}>
                    {isJobSaved(selectedJobData.id) ? '❤' : '🤍'}
                  </button>
                </div>

                <div className={styles.matchingSection}>
                  <h3>How well is your CV matching?</h3>
                  <div className={styles.matchChart}>
                    <div className={styles.matchItem}>
                      <span className={styles.matchNumber}>{selectedJobData.match}</span>
                      <span className={styles.matchLabel}>Great match</span>
                    </div>
                    <div className={styles.chartVisual}>
                      <div className={styles.circle}>
                        <span>{selectedJobData.match}</span>
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

                <div className={styles.jobDetailsSection}>
                  <h3>Job details</h3>
                  <p className={styles.sectionSubtitle}>Here's how the job details align with your profile.</p>
                  
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Job type</span>
                      <span className={styles.detailValue}>{selectedJobData.jobType || 'Full-time'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Location</span>
                      <span className={styles.detailValue}>{selectedJobData.location}</span>
                    </div>
                    {selectedJobData.salary && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Salary</span>
                        <span className={styles.detailValue}>{selectedJobData.salary}</span>
                      </div>
                    )}
                  </div>
                </div>

                {(selectedJobData.fullDescription || selectedJobData.description) && (
                  <div className={styles.fullJobDescription}>
                    <h3>Full job description</h3>
                    <div className={styles.jobDescription}>
                      {(selectedJobData.fullDescription || selectedJobData.description).split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {showApplyModal && applyingJob && (
        <ApplyFormModal
          job={applyingJob}
          onClose={() => {
            setShowApplyModal(false);
            setApplyingJob(null);
          }}
          onSubmit={handleApplySubmit}
        />
      )}
    </>
  );
}
