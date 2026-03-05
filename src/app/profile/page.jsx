'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './profile.module.css';

export default function ProfilePage() {
  const [userType, setUserType] = useState('jobseeker');
  const [activeTab, setActiveTab] = useState('overview');
  const [showCVModal, setShowCVModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [cvs, setCVs] = useState([
    { id: 1, name: 'Indeed Resume', type: 'view' },
    { id: 2, name: 'MyResume-MS.pdf', type: 'download' }
  ]);
  const [newCVName, setNewCVName] = useState('');
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    workType: 'onsite',
    requirements: {
      cv: false,
      education: false,
      experience: false,
      interview: false,
    }
  });
  const [activeJobs, setActiveJobs] = useState([
    { id: 1, title: 'Senior Developer', status: 'active', posted: '2024-03-01', r: true, experience: true, interview: true } },
    { id: 2, title: 'Marketing Manager', status: 'active', posted: '2024-02-28', requirements: { cv: true, education: false, experience: true, interview: false } },
  ]);

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
    activeJobs: acngth,
    pendingApplications: 45,
    totalViews: 1250,
    applicationsReceived: 320,
  };

  const profile = userType === 'jobseeker' ? jobSeekerProfile : employerProfile;

  const handleUploadCV = () => {
    if (newCVName.trim()) {
      setCVs([...cvs, { id: cvs.length + 1, name: newCVName, type: 'download' }]);
      setNewCVName('');
      setShowCVModal(false);
    }
  };

  const handleDeleteCV = (id) => {
    setCVs(cvs.filter(cv => cv.id !== id));
  };

  const handleJobFormChange = (e) => {
    const { name, value } = e.target;
    setJobForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementChange = (requirement) => {
    setJobForm(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [requirement]: !prev.requirements[requirement]
      }
    }));
  };

  const handlePostJob = () => {
    if (jobForm.title && jobForm.description && jobForm.location) {
      const newJob = {
        id: activeJobs.length + 1,
        title: jobForm.title,
     status: 'active',
        posted: new Date().toISOString().split('T')[0],
        requirements: jobForm.requirements
      };
      setActiveJobs([...activeJobs, newJob]);
      setJobForm({
        title: '',
        description: '',
        salary: '',
        location: '',
        workType: 'onsite',
        requirements: {
          cv: false,
          education: false,
          experience: false,
          interview: false,
        }
      });
      setShowJobModal(false);
    }
  };

  const toggleJobStatus = (id) => {
    setActiveJobs(activeJobs.map(job =>
      job.id === id ? { ...job, status: job.status === 'active' ? 'inactive' : 'active' } : job
    ));
  };

  const deleteJob = (id) => {
    setActiveJobs(activeJobs.filter(job => job.id !== id));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* User Type Selector */}
        <div className={styles.typeSelector}>
          <button
         styles.active : ''}`}
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
                  c=== 'applied' ? styles.active : ''}`}
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
                  className={`${styles.tab} ${actiles.active : ''}`}
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
                 === 'applications' ? styles.active : ''}`}
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
                  classNa= 'settings' ? styles.active : ''}`}
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
                 iv className={styles.resumeList}>
                      {cvs.map((cv) => (
                        <div key={cv.id} className={styles.resumeItem}>
                          <span>📄 {cv.name}</span>
                          <div className={styles.resumeActions}>
                            <button className={styles.actionBtn}>{cv.type === 'view' ? 'View' : 'Download'}</button>
                            <button 
                              className={styles.deleteBtn}
                              onClick={() => handleDeleteCV(cv.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      className={styles.uploadBtn}
                      onClick={() => setShowCVModal(true)}
                    >
                      + Upload New Resume
                    </button>
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
                        <span key={idx} className={stan>
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
                    <button 
                      className={styles.uploadBtn}
                      onClick={() => setShowJobModal(true)}
                    >
                      + Post New Job
                    </button>
                  </div>
                )}

                {activeTab === 'jobs' && (
                  <div className={styles.section}>
                    <h2>Active Job Posts</h2>
                    <div className={styles.jobsList}>
                      {activeJobs.map((job) => (
                        <div key={job.id} className={styles.jobItem}>
                          <div className={styles.jobInfo}>
                            <h3>{job.title}</h3>
                  b.posted}</p>
                            <div className={styles.requirementsTags}>
                              {job.requirements.cv && <span className={styles.reqTag}>CV Required</span>}
                              {job.requirements.education && <span className={styles.reqTag}>Education</span>}
                              {job.requirements.experience && <span className={styles.reqTag}>Experience</span>}
                              {job.requirements.inw</span>}
                            </div>
                          </div>
                          <div className={styles.jobActions}>
                            <button 
                              className={`${styles.statusBtn} ${job.status === 'active' ? styles.active : ''}`}
                              onClick={() => toggleJobStatus(job.id)}
                            >
                              {job.status === 'active' ? '✓ Active' : '✕ Inactive'}
                            </button>
                            <button 
                              className={styles.deleteBtn}
                              onClick={() => deleteJob(job.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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

      {/* CV Upload Modal */}
      {showCVModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCVModal(false)}>
          <div ce) => e.stopPropagation()}>
        </div>
      </div>

      {/* CV Modal */}
      {showCVModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCVModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{cvAction === 'create' ? 'Create New CV' : 'Upload CV'}</h2>
              <button className={styles.closeBtn} onClick={() => setShowCVModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              {cvAction === 'create' ? (
                <>
                  <div className={styles.formGroup}>
                    <label>CV Name</label>
                    <input
                      type="text"
                      placeholder="e.g., My Resume 2024"
                      value={newCVName}
                      onChange={(e) => setNewCVName(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Professional Summary</label>
                    <textarea placeholder="Write a brief summary about yourself..." rows="4"></textarea>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Skills</label>
                    <input type="text" placeholder="e.g., React, Node.js, Python" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Experience</label>
                    <textarea placeholder="Describe your work experience..." rows="4"></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <label>Upload CV File</label>
                    <div className={styles.fileUpload}>
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <p>Drag and drop your CV here or click to browse</p>
                      <input type="file" accept=".pdf,.doc,.docx" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>CV Name</label>
                    <input
                      type="text"
                      placeholder="e.g., My Resume 2024"
                      value={newCVName}
                      onChange={(e) => setNewCVName(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowCVModal(false)}>Cancel</button>
              <button className={styles.submitBtn} onClick={handleCreateCV}>
                {cvAction === 'create' ? 'Create CV' : 'Upload CV'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Posting Modal */}
      {showJobModal && (
        <div className={styles.modalOverlay} onClick={() => setShowJobModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Post New Job</h2>
              <button className={styles.closeBtn} onClick={() => setShowJobModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Job Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Senior React Developer"
                  value={jobData.title}
                  onChange={(e) => setJobData({...jobData, title: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Job Description *</label>
                <textarea
                  placeholder="Describe the job responsibilities and requirements..."
                  rows="4"
                  value={jobData.description}
                  onChange={(e) => setJobData({...jobData, description: e.target.value})}
                ></textarea>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Salary *</label>
                  <input
                    type="text"
                    placeholder="e.g., PKR 100,000 - 150,000"
                    value={jobData.salary}
                    onChange={(e) => setJobData({...jobData, salary: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Location *</label>
                  <input
                    type="text"
                    placeholder="e.g., Peshawar, PK"
                    value={jobData.location}
                    onChange={(e) => setJobData({...jobData, location: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.requirementsSection}>
                <h3>Job Requirements</h3>
                <div className={styles.requirementsList}>
                  <label className={styles.requirementItem}>
                    <input
                      type="checkbox"
                      checked={jobRequirements.uploadCV}
                      onChange={() => toggleRequirement('uploadCV')}
                    />
                    <span>Upload CV Required</span>
                  </label>
                  <label className={styles.requirementItem}>
                    <input
                      type="checkbox"
                      checked={jobRequirements.education}
                      onChange={() => toggleRequirement('education')}
                    />
                    <span>Education Required</span>
                  </label>
                  <label className={styles.requirementItem}>
                    <input
                      type="checkbox"
                      checked={jobRequirements.experience}
                      onChange={() => toggleRequirement('experience')}
                    />
                    <span>Experience Required</span>
                  </label>
                  <label className={styles.requirementItem}>
                    <input
                      type="checkbox"
                      checked={jobRequirements.interviewAvailability}
                      onChange={() => toggleRequirement('interviewAvailability')}
                    />
                    <span>Interview Availability Required</span>
                  </label>
                  <label className={styles.requirementItem}>
                    <input
                      type="checkbox"
                      checked={jobRequirements.location}
                      onChange={() => toggleRequirement('location')}
                    />
                    <span>Location Required</span>
                  </label>
                </div>

                <h3 style={{marginTop: '1.5rem'}}>Work Type</h3>
                <div className={styles.workTypeList}>
                  <label className={styles.requirementItem}>
                    <input
                      type="checkbox"
                      checked={jobRequirements.remote}
                      onChange={() => toggleRequirement('remote')}
                    />
                    <span>Remote</span>
                  </label>
                  <label className={styles.requirementItem}>
                    <input
                      type="checkbox"
                      checked={jobRequirements.onsite}
                      onChange={() => toggleRequirement('onsite')}
                    />
                    <span>On-site</span>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowJobModal(false)}>Cancel</button>
              <button className={styles.submitBtn} onClick={handlePostJob}>Post Job</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}           <div className={styles.modalBody}>
.submitBtn} onClick={handlePostJob}>Post Job</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
   type="checkbox"
                      checked={jobForm.requirements.interview}
                      onChange={() => handleRequirementChange('interview')}
                    />
                    <span>Interview Required</span>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowJobModal(false)}>Cancel</button>
              <button className={stylesquired</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={jobForm.requirements.experience}
                      onChange={() => handleRequirementChange('experience')}
                    />
                    <span>Experience Required</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                   obForm.requirements.cv}
                      onChange={() => handleRequirementChange('cv')}
                    />
                    <span>CV/Resume Required</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={jobForm.requirements.education}
                      onChange={() => handleRequirementChange('education')}
                    />
                    <span>Education Re   <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Job Requirements</label>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={j</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., Peshawar, PK"
                    value={jobForm.location}
                    onChange={handleJobFormChange}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Work Type</label>
                <select name="workType" value={jobForm.workType} onChange={handleJobFormChange}>
                          <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Salary Range</label>
                  <input
                    type="text"
                    name="salary"
                    placeholder="e.g., PKR 100,000 - 150,000"
                    value={jobForm.salary}
                    onChange={handleJobFormChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Locationvalue={jobForm.title}
                  onChange={handleJobFormChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Job Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the job responsibilities and requirements"
                  value={jobForm.description}
                  onChange={handleJobFormChange}
                  rows="4"
                />
              </div>
   stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Post New Job</h2>
              <button className={styles.closeBtn} onClick={() => setShowJobModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Job Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Senior Developer"
                  >
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowCVModal(false)}>Cancel</button>
              <button className={styles.submitBtn} onClick={handleUploadCV}>Upload Resume</button>
            </div>
          </div>
        </div>
      )}

      {/* Job Posting Modal */}
      {showJobModal && (
        <div className={styles.modalOverlay} onClick={() => setShowJobModal(false)}>
          <div className={styles.modal} onClick={(e) => e.                 onChange={(e) => setNewCVName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Upload File</label>
                <div className={styles.fileUpload}>
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <p>Drag and drop your file here or click to browse</p>
                  <input type="file" accept=".pdf,.doc,.docx" />
                </div>
              </div>
            </div              <div className={styles.formGroup}>
                <label>Resume Name</label>
                <input
                  type="text"
                  placeholder="e.g., My Resume 2024"
                  value={newCVName}
 