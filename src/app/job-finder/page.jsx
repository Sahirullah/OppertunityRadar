'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import FilterDropdown from '../../components/FilterDropdown';
import ApplyFormModal from '../../components/ApplyFormModal';
import styles from './job-finder.module.css';
import { useJobs } from '../../context/JobsContext';
import { useSavedJobs } from '../../context/SavedJobsContext';
import { useApplications } from '../../context/ApplicationsContext';

export default function JobFinder() {
  const { jobs: contextJobs } = useJobs();
  const { saveJob, unsaveJob, isJobSaved } = useSavedJobs();
  const { submitApplication } = useApplications();
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [selectedPostedTime, setSelectedPostedTime] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyingJob, setApplyingJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({});

  console.log('JobFinder page - contextJobs:', contextJobs);

  const jobTypes = [
    { label: 'Full-time', link: '/job-finder?type=full-time' },
    { label: 'Part-time', link: '/job-finder?type=part-time' },
    { label: 'Internship', link: '/job-finder?type=internship' }
  ];
  const salaryRanges = ['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+'];
  const postedTimes = ['24h', '1 week', '3 weeks', '1 month'];

  const hasApplied = (jobId) => {
    return appliedJobs[jobId] || false;
  };

  // Show only admin-posted jobs
  const allJobs = contextJobs
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
      jobType: 'Full-time',
      responseRate: 'New posting',
      fullDescription: `Position: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}`,
      requirements: [],
      benefits: [],
    }));

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
              <div className={styles.searchInputGroup}>
                <div className={styles.searchBox}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder="Search by job title" className={styles.searchInput} />
                </div>
              </div>

              <div className={styles.locationInputGroup}>
                <div className={styles.locationBox}>
                  <i className="fa-solid fa-location-dot"></i>
                  <select className={styles.locationSelect}>
                    <option value="">Choose Location</option>
                    <option value="london">London, UK</option>
                    <option value="pakistan">Pakistan</option>
                    <option value="usa">USA</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>

              <button className={styles.searchBtn}>
                <span>Search</span>
              </button>
            </div>

            <div className={styles.searchSuggestions}>
              <span className={styles.suggestionLabel}>Popular searches:</span>
              <div className={styles.suggestionTags}>
                <button className={styles.suggestionTag}>React Developer</button>
                <button className={styles.suggestionTag}>Full Stack</button>
                <button className={styles.suggestionTag}>UI/UX Designer</button>
              </div>
            </div>
          </div>

          <div className={styles.filterTags}>
            <FilterDropdown
              label="Job Types"
              options={jobTypes}
              selected={selectedJobType}
              onSelect={setSelectedJobType}
            />

            <FilterDropdown
              label="Salaries"
              options={salaryRanges}
              selected={selectedSalary}
              onSelect={setSelectedSalary}
            />

            <FilterDropdown
              label="Posted Time"
              options={postedTimes}
              selected={selectedPostedTime}
              onSelect={setSelectedPostedTime}
            />

            <div className={styles.spacer}></div>
            <span className={styles.matchLabel}>Your matching CV:</span>
            <button className={styles.cvSelect}>Matthew's CV ▼</button>
          </div>

          <div className={styles.sortAndCount}>
            <button className={styles.sortBtn}>⬇ Most Recent</button>
            <span className={styles.count}>Showing {allJobs.length} jobs</span>
          </div>

          <div className={styles.content}>
            <div className={styles.jobsList}>
              {allJobs.map((job) => (
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
              ))}
            </div>

            {allJobs.length > 0 && (
              <div className={styles.jobDetail}>
                <h1>{selectedJobData.title}</h1>
                <div className={styles.jobDetailMeta}>
                  <span className={styles.company}>{selectedJobData.company}</span>
                  <span className={styles.location}>{selectedJobData.location}</span>
                  <span className={styles.time}>{selectedJobData.postedTime}</span>
                  <span className={styles.star}>⭐</span>
                </div>

                <p className={styles.responseInfo}>⚡ {selectedJobData.responseRate}</p>

                <div className={styles.actionButtons}>
                  <button 
                    className={styles.applyBtn}
                    onClick={() => handleApply(selectedJobData)}
                  >
                    {selectedJobData.applied ? '✓ Applied' : 'Apply'}
                  </button>
                  <button className={styles.saveBtn2}>🔖</button>
                  <button className={styles.dislikeBtn}>👎</button>
                  <button className={styles.shareBtn}>↗</button>
                </div>

                <div className={styles.jobDetailsSection}>
                  <h3>Job details</h3>
                  <p className={styles.jobDetailsIntro}>Here's how the job details align with your profile.</p>
                  
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>💼</span>
                    <div>
                      <h4>Job type</h4>
                      <p>{selectedJobData.jobType}</p>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📍</span>
                    <div>
                      <h4>Location</h4>
                      <p>{selectedJobData.location}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.jobDescriptionSection}>
                  <h3>Full job description</h3>
                  <div className={styles.descriptionContent}>
                    {selectedJobData.fullDescription.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className={styles.matchingSection}>
                  <h3>How well is your CV matching?</h3>
                  <div className={styles.matchChart}>
                    <div className={styles.matchItem}>
                      <span className={styles.matchNumber}>{selectedJobData.match}</span>
                      <span className={styles.matchLabel}>Great match</span>
                    </div>
                    <div className={styles.chartVisual}>
                      <div className={styles.circle} style={{background: `conic-gradient(#2e7d32 0deg ${selectedJobData.match * 3.6}deg, #e8e8e8 ${selectedJobData.match * 3.6}deg 360deg)`}}>
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
