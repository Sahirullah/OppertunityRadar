'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import FilterDropdown from '../../components/FilterDropdown';
import styles from './job-finder.module.css';

export default function JobFinder() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [selectedPostedTime, setSelectedPostedTime] = useState(null);

  const jobTypes = [
    { label: 'Full-time', link: '/job-finder?type=full-time' },
    { label: 'Part-time', link: '/job-finder?type=part-time' },
    { label: 'Internship', link: '/job-finder?type=internship' }
  ];
  const salaryRanges = ['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+'];
  const postedTimes = ['24h', '1 week', '3 weeks', '1 month'];

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
      jobType: 'Full-time',
      responseRate: '75% or more applications in the past 30 days, typically within 1 day.',
      fullDescription: 'Who we are:\nFound in 1995 in Germany we are AI-driven company with a team 150+ professionals. We specialize in digital transformation and innovative solutions for enterprises worldwide.\n\nWhat we do:\nWe help companies leverage AI and machine learning to optimize their operations and improve customer experiences.\n\nThe role:\nAs an Office Assistant / Social Media Assistant, you will support our marketing team in managing social media channels, coordinating office operations, and assisting with various administrative tasks.',
      requirements: ['Strong communication skills', 'Social media experience', 'Organizational skills', 'Attention to detail'],
      benefits: ['Competitive salary', 'Health insurance', 'Remote work options', 'Professional development'],
    },
    {
      id: 2,
      title: 'Full-Stack Engineer (Frontend-Leaning)',
      company: 'AC Group',
      location: 'Pakistan',
      postedTime: '2 days ago',
      match: 80,
      description: 'Join our engineering team to build scalable web applications with modern technologies...',
      recommended: false,
      applied: true,
      saved: true,
      jobType: 'Full-time',
      responseRate: '75% or more applications in the past 30 days, typically within 1 day.',
      fullDescription: 'Who we are:\nAC Group is a leading technology company focused on building innovative solutions for businesses globally.\n\nWhat we do:\nWe develop cutting-edge web and mobile applications using the latest technologies and best practices.\n\nThe role:\nAs a Full-Stack Engineer with frontend focus, you will design and develop responsive web applications, collaborate with product teams, and contribute to our technical architecture.',
      requirements: ['React/Next.js experience', 'Node.js knowledge', 'Database design', 'Git proficiency', 'Problem-solving skills'],
      benefits: ['Competitive salary', 'Stock options', 'Remote work', 'Learning budget', 'Health benefits'],
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
      jobType: 'Full-time',
      responseRate: '80% or more applications in the past 30 days, typically within 2 days.',
      fullDescription: 'Who we are:\nUnilever is a global leader in consumer goods with a commitment to sustainability and social responsibility.\n\nWhat we do:\nWe create products that make people\'s lives better while maintaining our commitment to environmental and social impact.\n\nThe role:\nAs Marketing & Communications Manager, you will lead marketing campaigns, manage brand communications, and drive customer engagement strategies.',
      requirements: ['Marketing strategy experience', 'Campaign management', 'Communication skills', 'Analytics knowledge', 'Team leadership'],
      benefits: ['Excellent salary', 'Pension scheme', 'Flexible working', 'Career development', 'Wellness programs'],
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
              <div className={styles.searchInputGroup}>
                <div className={styles.searchBox}>
                  <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <input type="text" placeholder="Search by job title" className={styles.searchInput} />
                </div>
              </div>

              <div className={styles.locationInputGroup}>
                <div className={styles.locationBox}>
                  <svg className={styles.locationIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
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

              <p className={styles.responseInfo}>⚡ {selectedJobData.responseRate}</p>

              <div className={styles.actionButtons}>
                <button 
                  className={styles.applyBtn}
                  onClick={() => handleApply(selectedJobData.id)}
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
          </div>
        </main>
      </div>
    </>
  );
}
