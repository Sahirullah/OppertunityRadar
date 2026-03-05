'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './profile.module.css';

export default function ProfilePage() {
  const [userType, setUserType] = useState('jobseeker');
  const [activeTab, setActiveTab] = useState('overview');

  // Job Seeker Data
  const jobSeekerProfile = {
    name: 'Sahir Ullah',
    title: 'Digital Marketing Manager',
    location: 'Peshawar, 25000, PK',
    email: 'sahirullah313@gmail.com',
    phone: '0319 1954292',
    avatar: 'SU',
    completionPercentage: 85,
    appliedJobs: [
      { id: 1, title: 'Office Assistant', company: 'JD', status: 'Applied', date: '2024-03-01' },
      { id: 2, title: 'Marketing Manager', company: 'Facebook', status: 'Shortlisted', date: '2024-02-28' },
      { id: 3, title: 'Social Media Manager', company: 'Unilever', status: 'Interview', date: '2024-02-25' },
    ],
    savedJobs: [
      { id: 1, title: 'Senior Developer', company: 'Google', location: 'Remote' },
      { id: 2, title: 'Product Manager', company: 'Microsoft', location: 'Seattle' },
    ],
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Social Media'],
    education: [
      { degree: 'Bachelor of Science', field: 'Computer Science', university: 'University of Peshawar', year: '2022' },
    ],
  };

  // Employer Data
  const employerProfile = {
    companyName: 'Tech Solutions Inc',
    industry: 'Technology',
    size: '50-200 employees',
    location: 'New York, USA',
    email: 'hr@techsolutions.com',
    phone: '+1 (555) 123-4567',
    logo: 'TS',
    activeJobs: 12,
    pendingApplications: 45,
    totalViews: 1250,
    applicationsReceived: 320,
  };

  const profile = userType === 'jobseeker' ? jobSeekerProfile : employerProfile;

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* User Type Selector */}
        <div className={styles.typeSelector}>
          <button
            className={`${styles.typeBtn} ${userType === 'jobseeker' ? styles.active : ''}`}
            onClick={() => setUserType('jobseeker')}
          >
            👤 Job Seeker
          </button>
          <button
            className={`${styles.typeBtn} ${userType === 'employer' ? styles.active : ''}`}
            onClick={() => setUserType('employer')}
          >
            🏢 Employer
          </button>
        </div>

        <div className={styles.profileWrapper}>
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>{profile.logo || profile.avatar}</div>
              <div className={styles.profileInfo}>
                <h1>{profile.companyName || profile.name}</h1>
                <p>{profile.industry || profile.title}</p>
                <p className={styles.location}>📍 {profile.location}</p>
                <div className={styles.contactInfo}>
                  <span>📧 {profile.email}</span>
                  <span>📱 {profile.phone}</span>
                </div>
              </div>
            </div>

            {userType === 'jobseeker' && (
              <div className={styles.completionBar}>
                <div className={styles.barLabel}>Profile Completion</div>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: `${profile.completionPercentage}%` }}></div>
                </div>
                <div className={styles.percentage}>{profile.completionPercentage}%</div>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className={styles.tabs}>
            {userType === 'jobseeker' ? (
              <>
                <button
                  className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'applied' ? styles.active : ''}`}
                  onClick={() => setActiveTab('applied')}
                >
                  Applied Jobs
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'saved' ? styles.active : ''}`}
                  onClick={() => setActiveTab('saved')}
                >
                  Saved Jobs
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'skills' ? styles.active : ''}`}
                  onClick={() => setActiveTab('skills')}
                >
                  Skills & Education
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'jobs' ? styles.active : ''}`}
                  onClick={() => setActiveTab('jobs')}
                >
                  Active Jobs
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'applications' ? styles.active : ''}`}
                  onClick={() => setActiveTab('applications')}
                >
                  Applications
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'analytics' ? styles.active : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
              </>
            )}
          </div>

          {/* Content Area */}
          <div className={styles.content}>
            {userType === 'jobseeker' ? (
              <>
                {activeTab === 'overview' && (
                  <div className={styles.section}>
                    <h2>Resume & CV</h2>
                    <div className={styles.resumeList}>
                      <div className={styles.resumeItem}>
                        <span>📄 Indeed Resume</span>
                        <button className={styles.actionBtn}>View</button>
                      </div>
                      <div className={styles.resumeItem}>
                        <span>📄 MyResume-MS.pdf</span>
                        <button className={styles.actionBtn}>Download</button>
                      </div>
                    </div>
                    <button className={styles.uploadBtn}>+ Upload New Resume</button>
                  </div>
                )}

                {activeTab === 'applied' && (
                  <div className={styles.section}>
                    <h2>Applied Jobs</h2>
                    <div className={styles.jobsList}>
                      {profile.appliedJobs.map((job) => (
                        <div key={job.id} className={styles.jobItem}>
                          <div className={styles.jobInfo}>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                          </div>
                          <div className={styles.jobMeta}>
                            <span className={`${styles.status} ${styles[job.status.toLowerCase()]}`}>
                              {job.status}
                            </span>
                            <span className={styles.date}>{job.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'saved' && (
                  <div className={styles.section}>
                    <h2>Saved Jobs</h2>
                    <div className={styles.jobsList}>
                      {profile.savedJobs.map((job) => (
                        <div key={job.id} className={styles.jobItem}>
                          <div className={styles.jobInfo}>
                            <h3>{job.title}</h3>
                            <p>{job.company} • {job.location}</p>
                          </div>
                          <button className={styles.actionBtn}>❤️</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className={styles.section}>
                    <h2>Skills</h2>
                    <div className={styles.skillsList}>
                      {profile.skills.map((skill, idx) => (
                        <span key={idx} className={styles.skillTag}>{skill}</span>
                      ))}
                    </div>

                    <h2 style={{ marginTop: '2rem' }}>Education</h2>
                    <div className={styles.educationList}>
                      {profile.education.map((edu, idx) => (
                        <div key={idx} className={styles.educationItem}>
                          <h3>{edu.degree}</h3>
                          <p>{edu.field}</p>
                          <p className={styles.meta}>{edu.university} • {edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className={styles.section}>
                    <h2>Account Settings</h2>
                    <div className={styles.settingItem}>
                      <label>Email</label>
                      <input type="email" defaultValue={profile.email} />
                    </div>
                    <div className={styles.settingItem}>
                      <label>Phone</label>
                      <input type="tel" defaultValue={profile.phone} />
                    </div>
                    <div className={styles.settingItem}>
                      <label>Privacy</label>
                      <select>
                        <option>Public</option>
                        <option>Private</option>
                      </select>
                    </div>
                    <button className={styles.saveBtn}>Save Changes</button>
                  </div>
                )}
              </>
            ) : (
              <>
                {activeTab === 'overview' && (
                  <div className={styles.section}>
                    <div className={styles.statsGrid}>
                      <div className={styles.statCard}>
                        <div className={styles.statValue}>{employerProfile.activeJobs}</div>
                        <div className={styles.statLabel}>Active Jobs</div>
                      </div>
                      <div className={styles.statCard}>
                        <div className={styles.statValue}>{employerProfile.pendingApplications}</div>
                        <div className={styles.statLabel}>Pending Applications</div>
                      </div>
                      <div className={styles.statCard}>
                        <div className={styles.statValue}>{employerProfile.totalViews}</div>
                        <div className={styles.statLabel}>Total Views</div>
                      </div>
                      <div className={styles.statCard}>
                        <div className={styles.statValue}>{employerProfile.applicationsReceived}</div>
                        <div className={styles.statLabel}>Applications Received</div>
                      </div>
                    </div>
                    <button className={styles.uploadBtn}>+ Post New Job</button>
                  </div>
                )}

                {activeTab === 'jobs' && (
                  <div className={styles.section}>
                    <h2>Active Job Posts</h2>
                    <p className={styles.placeholder}>You have {employerProfile.activeJobs} active job postings</p>
                  </div>
                )}

                {activeTab === 'applications' && (
                  <div className={styles.section}>
                    <h2>Applications Tracker</h2>
                    <p className={styles.placeholder}>You have {employerProfile.pendingApplications} pending applications</p>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className={styles.section}>
                    <h2>Analytics</h2>
                    <div className={styles.analyticsGrid}>
                      <div className={styles.analyticsCard}>
                        <h3>Job Views</h3>
                        <p className={styles.analyticsValue}>{employerProfile.totalViews}</p>
                      </div>
                      <div className={styles.analyticsCard}>
                        <h3>Applications</h3>
                        <p className={styles.analyticsValue}>{employerProfile.applicationsReceived}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className={styles.section}>
                    <h2>Company Settings</h2>
                    <div className={styles.settingItem}>
                      <label>Company Email</label>
                      <input type="email" defaultValue={employerProfile.email} />
                    </div>
                    <div className={styles.settingItem}>
                      <label>Subscription Plan</label>
                      <select>
                        <option>Basic</option>
                        <option>Premium</option>
                        <option>Enterprise</option>
                      </select>
                    </div>
                    <button className={styles.saveBtn}>Save Changes</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
