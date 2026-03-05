'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './profile.module.css';
import jsPDF from 'jspdf';
import { useJobs } from '../../context/JobsContext';

export default function ProfilePage() {
  const { addJob } = useJobs();
  const [userType, setUserType] = useState('jobseeker');
  const [activeTab, setActiveTab] = useState('overview');
  const [showCVModal, setShowCVModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [cvs, setCVs] = useState([
    { id: 1, name: 'Indeed Resume', type: 'view' },
    { id: 2, name: 'MyResume-MS.pdf', type: 'download' }
  ]);
  const [newCVName, setNewCVName] = useState('');
  const [cvFile, setCVFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [activeJobs, setActiveJobs] = useState([
    { id: 1, title: 'Senior Developer', status: 'active', posted: '2024-03-01', requirements: { cv: true, education: true, experience: true, interview: true } },
    { id: 2, title: 'Marketing Manager', status: 'active', posted: '2024-02-28', requirements: { cv: true, education: false, experience: true, interview: false } },
  ]);
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    description: '',
    salary: '',
    country: '',
    city: '',
    position: 'onsite',
    type: 'full-time',
    requirements: '',
    benefits: '',
  });
  const [jobRequirements, setJobRequirements] = useState({
    uploadCV: true,
    education: true,
    experience: true,
    interviewAvailability: true,
  });
  const [dragActive, setDragActive] = useState(false);
  const [editingCVId, setEditingCVId] = useState(null);
  const [editingCVName, setEditingCVName] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCVId, setUpdateCVId] = useState(null);
  const [updateCVName, setUpdateCVName] = useState('');
  const [updateCVFile, setUpdateCVFile] = useState(null);
  const [showCVMaker, setShowCVMaker] = useState(false);
  const [cvMakerData, setCVMakerData] = useState({
    fullName: 'Sahir Ullah',
    position: 'Digital Marketing Manager',
    email: 'sahirullah313@gmail.com',
    phone: '0319 1954292',
    address: 'Peshawar, 25000, PK',
    country: 'Pakistan',
    summary: '',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Social Media'],
    languages: ['English', 'Urdu'],
    education: [
      { degree: 'Bachelor of Science', field: 'Computer Science', university: 'University of Peshawar', year: '2022' }
    ],
    certifications: [],
    experience: [],
    projects: [],
    portfolio: []
  });
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newCertificationInstitute, setNewCertificationInstitute] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newPortfolio, setNewPortfolio] = useState('');

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

  const employerProfile = {
    companyName: 'Tech Solutions Inc',
    industry: 'Technology',
    size: '50-200 employees',
    location: 'New York, USA',
    email: 'hr@techsolutions.com',
    phone: '+1 (555) 123-4567',
    logo: 'TS',
    activeJobs: activeJobs.length,
    pendingApplications: 45,
    totalViews: 1250,
    applicationsReceived: 320,
  };

  const profile = userType === 'jobseeker' ? jobSeekerProfile : employerProfile;

  const handleUploadCV = () => {
    setUploadError('');
    
    if (!newCVName.trim()) {
      setUploadError('Please enter a resume name');
      return;
    }
    
    if (!cvFile) {
      setUploadError('Please select a file to upload');
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(cvFile.type)) {
      setUploadError('Only PDF and Word documents are allowed');
      return;
    }

    // Validate file size (max 5MB)
    if (cvFile.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Add CV to list
    setCVs([...cvs, { id: cvs.length + 1, name: newCVName, type: 'download', file: cvFile }]);
    setNewCVName('');
    setCVFile(null);
    setShowCVModal(false);
    alert('Resume uploaded successfully!');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCVFile(file);
      setUploadError('');
      // Auto-populate resume name from filename if not already set
      if (!newCVName.trim()) {
        setNewCVName(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setCVFile(file);
      setUploadError('');
      // Auto-populate resume name from filename if not already set
      if (!newCVName.trim()) {
        setNewCVName(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleDeleteCV = (id) => {
    setCVs(cvs.filter(cv => cv.id !== id));
  };

  const handleDownloadCV = (cv) => {
    try {
      if (cv.data) {
        const doc = new jsPDF();
        let yPosition = 15;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 12;
        const maxWidth = pageWidth - 2 * margin;

        // Helper function to add section header with line
        const addSectionHeader = (title) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 15;
          }
          doc.setFontSize(11);
          doc.setFont(undefined, 'bold');
          doc.text(title, margin, yPosition);
          doc.setDrawColor(0);
          doc.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
          yPosition += 7;
        };

        // Helper function to add text with wrapping
        const addText = (text, fontSize, isBold = false) => {
          if (yPosition > pageHeight - 15) {
            doc.addPage();
            yPosition = 15;
          }
          doc.setFontSize(fontSize);
          doc.setFont(undefined, isBold ? 'bold' : 'normal');
          const lines = doc.splitTextToSize(text, maxWidth);
          doc.text(lines, margin, yPosition);
          yPosition += lines.length * (fontSize / 2.8) + 1;
        };

        // Header - Name
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text(cv.data.fullName.toUpperCase(), pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 7;

        // Contact Info - Professional format
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        const contactLine = `${cv.data.position} | ${cv.data.email} | ${cv.data.phone}`;
        doc.text(contactLine, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 4;

        const locationLine = `${cv.data.address} | ${cv.data.country}`;
        doc.text(locationLine, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 6;

        // Professional Summary
        if (cv.data.summary && cv.data.summary.trim()) {
          addSectionHeader('PROFESSIONAL SUMMARY');
          addText(cv.data.summary, 9);
          yPosition += 2;
        }

        // Skills
        if (cv.data.skills && cv.data.skills.length > 0) {
          addSectionHeader('SKILLS');
          const skillsText = cv.data.skills.join(' • ');
          addText(skillsText, 9);
          yPosition += 2;
        }

        // Languages
        if (cv.data.languages && cv.data.languages.length > 0) {
          addSectionHeader('LANGUAGES');
          const languagesText = cv.data.languages.join(' • ');
          addText(languagesText, 9);
          yPosition += 2;
        }

        // Education
        if (cv.data.education && cv.data.education.length > 0) {
          addSectionHeader('EDUCATION');
          cv.data.education.forEach((edu) => {
            addText(`${edu.degree} in ${edu.field}`, 9, true);
            addText(`${edu.university} • ${edu.year}`, 9);
            yPosition += 1;
          });
          yPosition += 1;
        }

        // Certifications
        if (cv.data.certifications && cv.data.certifications.length > 0) {
          addSectionHeader('CERTIFICATIONS');
          cv.data.certifications.forEach((cert) => {
            addText(`${cert.name} - ${cert.institute}`, 9);
          });
          yPosition += 2;
        }

        // Projects
        if (cv.data.projects && cv.data.projects.length > 0) {
          addSectionHeader('PROJECTS');
          cv.data.projects.forEach((project) => {
            addText(`• ${project}`, 9);
          });
          yPosition += 2;
        }

        // Portfolio
        if (cv.data.portfolio && cv.data.portfolio.length > 0) {
          addSectionHeader('PORTFOLIO');
          cv.data.portfolio.forEach((link) => {
            addText(`• ${link}`, 9);
          });
        }

        // Download the PDF
        doc.save(`${cv.name}.pdf`);
      } else if (cv.file) {
        const url = URL.createObjectURL(cv.file);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${cv.name}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        alert('File not available for download');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleUpdateCV = (cv) => {
    setUpdateCVId(cv.id);
    setUpdateCVName(cv.name);
    setUpdateCVFile(null);
    setShowUpdateModal(true);
  };

  const handleSaveUpdateCV = () => {
    if (!updateCVName.trim()) {
      alert('Please enter a resume name');
      return;
    }

    setCVs(cvs.map(cv => 
      cv.id === updateCVId 
        ? { ...cv, name: updateCVName, file: updateCVFile || cv.file }
        : cv
    ));
    setShowUpdateModal(false);
    setUpdateCVId(null);
    setUpdateCVName('');
    setUpdateCVFile(null);
    alert('Resume updated successfully!');
  };

  const handleUpdateFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUpdateCVFile(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setCVMakerData({
        ...cvMakerData,
        skills: [...cvMakerData.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setCVMakerData({
      ...cvMakerData,
      skills: cvMakerData.skills.filter((_, i) => i !== index)
    });
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setCVMakerData({
        ...cvMakerData,
        languages: [...cvMakerData.languages, newLanguage]
      });
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (index) => {
    setCVMakerData({
      ...cvMakerData,
      languages: cvMakerData.languages.filter((_, i) => i !== index)
    });
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && newCertificationInstitute.trim()) {
      setCVMakerData({
        ...cvMakerData,
        certifications: [...cvMakerData.certifications, { name: newCertification, institute: newCertificationInstitute }]
      });
      setNewCertification('');
      setNewCertificationInstitute('');
    } else {
      alert('Please enter both certification name and institute');
    }
  };

  const handleRemoveCertification = (index) => {
    setCVMakerData({
      ...cvMakerData,
      certifications: cvMakerData.certifications.filter((_, i) => i !== index)
    });
  };

  const handleAddProject = () => {
    if (newProject.trim()) {
      setCVMakerData({
        ...cvMakerData,
        projects: [...cvMakerData.projects, newProject]
      });
      setNewProject('');
    }
  };

  const handleRemoveProject = (index) => {
    setCVMakerData({
      ...cvMakerData,
      projects: cvMakerData.projects.filter((_, i) => i !== index)
    });
  };

  const handleAddPortfolio = () => {
    if (newPortfolio.trim()) {
      setCVMakerData({
        ...cvMakerData,
        portfolio: [...cvMakerData.portfolio, newPortfolio]
      });
      setNewPortfolio('');
    }
  };

  const handleRemovePortfolio = (index) => {
    setCVMakerData({
      ...cvMakerData,
      portfolio: cvMakerData.portfolio.filter((_, i) => i !== index)
    });
  };

  const handleGenerateCV = () => {
    if (!cvMakerData.fullName.trim()) {
      alert('Please enter your full name');
      return;
    }

    // Create a new CV from the maker data
    const newCV = {
      id: cvs.length + 1,
      name: `${cvMakerData.fullName} - ${cvMakerData.position}`,
      type: 'download',
      data: cvMakerData,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Add to CV list
    setCVs([...cvs, newCV]);
    
    // Reset form and close modal
    setShowCVMaker(false);
    alert('CV generated successfully! Your CV has been added to your CV list.');
  };

  const handlePostJob = () => {
    if (!jobData.title || !jobData.company || !jobData.country || !jobData.city || !jobData.description || !jobData.salary) {
      alert('Please fill in all required fields');
      return;
    }

    const newJob = {
      id: activeJobs.length + 1,
      title: jobData.title,
      company: jobData.company,
      location: `${jobData.city}, ${jobData.country}`,
      description: jobData.description,
      salary: jobData.salary,
      position: jobData.position,
      type: jobData.type,
      status: 'active',
      posted: new Date().toISOString().split('T')[0],
      requirements: jobRequirements,
      benefits: jobData.benefits,
      postedTime: 'Just now',
      match: 75,
      recommended: false,
      applied: false,
      saved: false,
      applications: 0,
    };
    
    // Add to local state
    setActiveJobs([...activeJobs, newJob]);
    
    // Also add to global context so it appears on home page
    addJob({
      title: jobData.title,
      company: jobData.company,
      location: `${jobData.city}, ${jobData.country}`,
      description: jobData.description,
    });
    
    setJobData({ title: '', company: '', description: '', salary: '', country: '', city: '', position: 'onsite', type: 'full-time', requirements: '', benefits: '' });
    setShowJobModal(false);
    alert('Job posted successfully! It will appear on the job listings.');
  };

  const toggleRequirement = (key) => {
    setJobRequirements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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

          <div className={styles.content}>
            {userType === 'jobseeker' ? (
              <>
                {activeTab === 'overview' && (
                  <div className={styles.section}>
                    <h2>Resume & CV</h2>
                    <div className={styles.resumeList}>
                      {cvs.map((cv) => (
                        <div key={cv.id} className={styles.resumeItem}>
                          <span>📄 {cv.name}</span>
                          <div className={styles.cvActions}>
                            <button 
                              className={styles.actionBtn}
                              onClick={() => handleDownloadCV(cv)}
                            >
                              {cv.type === 'view' ? 'View' : 'Download'}
                            </button>
                            <button 
                              className={styles.actionBtn}
                              onClick={() => handleUpdateCV(cv)}
                            >
                              Update
                            </button>
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
                    <button className={styles.uploadBtn} onClick={() => setShowCVModal(true)}>+ Upload New Resume</button>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h2 style={{ margin: 0 }}>Skills & Education</h2>
                      <button className={styles.uploadBtn} onClick={() => setShowCVMaker(true)}>
                        📄 Create CV
                      </button>
                    </div>
                    
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', marginTop: 0 }}>Skills</h2>
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
                    <button className={styles.uploadBtn} onClick={() => setShowJobModal(true)}>+ Post New Job</button>
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
                            <p>Posted on {job.posted}</p>
                            <div className={styles.requirementsTags}>
                              {job.requirements.cv && <span className={styles.reqTag}>CV Required</span>}
                              {job.requirements.education && <span className={styles.reqTag}>Education</span>}
                              {job.requirements.experience && <span className={styles.reqTag}>Experience</span>}
                              {job.requirements.interview && <span className={styles.reqTag}>Interview</span>}
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
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Upload New Resume</h2>
              <button className={styles.closeBtn} onClick={() => setShowCVModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Resume Name *</label>
                <input
                  type="text"
                  placeholder="e.g., My Resume 2024"
                  value={newCVName}
                  onChange={(e) => {
                    setNewCVName(e.target.value);
                    if (uploadError) setUploadError('');
                  }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Upload File</label>
                <div 
                  className={`${styles.fileUpload} ${dragActive ? styles.dragActive : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <p>Drag and drop your file here or click to browse</p>
                  <input 
                    id="fileInput"
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
                {cvFile && <p className={styles.fileName}>✓ Selected: {cvFile.name}</p>}
                {uploadError && <p className={styles.errorMsg}>{uploadError}</p>}
                {!uploadError && (
                  <div className={styles.uploadChecklist}>
                    <p className={styles.checklistItem}>
                      {newCVName.trim() ? '✓' : '○'} Resume name entered
                    </p>
                    <p className={styles.checklistItem}>
                      {cvFile ? '✓' : '○'} File selected
                    </p>
                  </div>
                )}
              </div>
            </div>
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
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '95vh', overflowY: 'auto' }}>
            <div className={styles.modalHeader}>
              <h2>Post New Job</h2>
              <button className={styles.closeBtn} onClick={() => setShowJobModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              {/* Basic Information */}
              <h3 style={{ marginTop: 0, color: '#0052cc' }}>Basic Information</h3>
              
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
                <label>Company Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Tech Solutions Inc"
                  value={jobData.company}
                  onChange={(e) => setJobData({...jobData, company: e.target.value})}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Country *</label>
                  <input
                    type="text"
                    placeholder="e.g., Pakistan"
                    value={jobData.country}
                    onChange={(e) => setJobData({...jobData, country: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>City *</label>
                  <input
                    type="text"
                    placeholder="e.g., Peshawar"
                    value={jobData.city}
                    onChange={(e) => setJobData({...jobData, city: e.target.value})}
                  />
                </div>
              </div>

              {/* Job Details */}
              <h3 style={{ marginTop: '1.5rem', color: '#0052cc' }}>Job Details</h3>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Position Type *</label>
                  <select
                    value={jobData.position}
                    onChange={(e) => setJobData({...jobData, position: e.target.value})}
                  >
                    <option value="onsite">On-site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Employment Type *</label>
                  <select
                    value={jobData.type}
                    onChange={(e) => setJobData({...jobData, type: e.target.value})}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Salary Range *</label>
                <input
                  type="text"
                  placeholder="e.g., PKR 100,000 - 150,000"
                  value={jobData.salary}
                  onChange={(e) => setJobData({...jobData, salary: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Job Description *</label>
                <textarea
                  placeholder="Describe the job responsibilities, requirements, and qualifications..."
                  rows="5"
                  value={jobData.description}
                  onChange={(e) => setJobData({...jobData, description: e.target.value})}
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label>Benefits & Perks</label>
                <textarea
                  placeholder="e.g., Health insurance, Flexible hours, Remote work options..."
                  rows="3"
                  value={jobData.benefits}
                  onChange={(e) => setJobData({...jobData, benefits: e.target.value})}
                ></textarea>
              </div>

              {/* Requirements */}
              <h3 style={{ marginTop: '1.5rem', color: '#0052cc' }}>Application Requirements</h3>
              <div className={styles.requirementsList}>
                <label className={styles.requirementItem}>
                  <input
                    type="checkbox"
                    checked={jobRequirements.uploadCV}
                    onChange={() => toggleRequirement('uploadCV')}
                  />
                  <span>CV/Resume Required</span>
                </label>
                <label className={styles.requirementItem}>
                  <input
                    type="checkbox"
                    checked={jobRequirements.education}
                    onChange={() => toggleRequirement('education')}
                  />
                  <span>Education Details Required</span>
                </label>
                <label className={styles.requirementItem}>
                  <input
                    type="checkbox"
                    checked={jobRequirements.experience}
                    onChange={() => toggleRequirement('experience')}
                  />
                  <span>Work Experience Required</span>
                </label>
                <label className={styles.requirementItem}>
                  <input
                    type="checkbox"
                    checked={jobRequirements.interviewAvailability}
                    onChange={() => toggleRequirement('interviewAvailability')}
                  />
                  <span>Interview Availability Required</span>
                </label>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowJobModal(false)}>Cancel</button>
              <button className={styles.submitBtn} onClick={handlePostJob}>Post Job</button>
            </div>
          </div>
        </div>
      )}

      {/* Update CV Modal */}
      {showUpdateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowUpdateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Update Resume</h2>
              <button className={styles.closeBtn} onClick={() => setShowUpdateModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Resume Name *</label>
                <input
                  type="text"
                  placeholder="e.g., My Resume 2024"
                  value={updateCVName}
                  onChange={(e) => setUpdateCVName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Update File (Optional)</label>
                <div 
                  className={styles.fileUpload}
                  onClick={() => document.getElementById('updateFileInput').click()}
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <p>Click to select a new file or leave empty to keep current</p>
                  <input 
                    id="updateFileInput"
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleUpdateFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
                {updateCVFile && <p className={styles.fileName}>✓ New file: {updateCVFile.name}</p>}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowUpdateModal(false)}>Cancel</button>
              <button className={styles.submitBtn} onClick={handleSaveUpdateCV}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* CV Maker Modal */}
      {showCVMaker && (
        <div className={styles.modalOverlay} onClick={() => setShowCVMaker(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px', maxHeight: '95vh' }}>
            <div className={styles.modalHeader}>
              <h2>Create Your CV</h2>
              <button className={styles.closeBtn} onClick={() => setShowCVMaker(false)}>✕</button>
            </div>
            <div className={styles.modalBody} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              {/* Personal Information */}
              <h3 style={{ marginTop: 0, color: '#0052cc' }}>Personal Information</h3>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" value={cvMakerData.fullName} onChange={(e) => setCVMakerData({...cvMakerData, fullName: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Position/Title</label>
                <input type="text" placeholder="e.g., Web Developer, Doctor, Graphic Designer" value={cvMakerData.position} onChange={(e) => setCVMakerData({...cvMakerData, position: e.target.value})} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" value={cvMakerData.email} onChange={(e) => setCVMakerData({...cvMakerData, email: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input type="tel" value={cvMakerData.phone} onChange={(e) => setCVMakerData({...cvMakerData, phone: e.target.value})} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Address</label>
                  <input type="text" value={cvMakerData.address} onChange={(e) => setCVMakerData({...cvMakerData, address: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Country</label>
                  <input type="text" value={cvMakerData.country} onChange={(e) => setCVMakerData({...cvMakerData, country: e.target.value})} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Professional Summary</label>
                <textarea rows="3" value={cvMakerData.summary} onChange={(e) => setCVMakerData({...cvMakerData, summary: e.target.value})} placeholder="Brief overview of your professional background..."></textarea>
              </div>

              {/* Skills */}
              <h3 style={{ marginTop: '1.5rem', color: '#0052cc' }}>Skills</h3>
              <div className={styles.formGroup}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" placeholder="Add a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} style={{ flex: 1 }} />
                  <button className={styles.actionBtn} onClick={handleAddSkill}>Add</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {cvMakerData.skills.map((skill, idx) => (
                  <span key={idx} className={styles.skillTag} style={{ position: 'relative', paddingRight: '1.5rem' }}>
                    {skill}
                    <button onClick={() => handleRemoveSkill(idx)} style={{ position: 'absolute', right: '0.25rem', background: 'none', border: 'none', color: '#d84a38', cursor: 'pointer', fontSize: '1rem' }}>×</button>
                  </span>
                ))}
              </div>

              {/* Languages */}
              <h3 style={{ marginTop: '1.5rem', color: '#0052cc' }}>Languages</h3>
              <div className={styles.formGroup}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" placeholder="Add a language" value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} style={{ flex: 1 }} />
                  <button className={styles.actionBtn} onClick={handleAddLanguage}>Add</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {cvMakerData.languages.map((lang, idx) => (
                  <span key={idx} className={styles.skillTag} style={{ position: 'relative', paddingRight: '1.5rem' }}>
                    {lang}
                    <button onClick={() => handleRemoveLanguage(idx)} style={{ position: 'absolute', right: '0.25rem', background: 'none', border: 'none', color: '#d84a38', cursor: 'pointer', fontSize: '1rem' }}>×</button>
                  </span>
                ))}
              </div>

              {/* Certifications */}
              <h3 style={{ marginTop: '1.5rem', color: '#0052cc' }}>Certifications</h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Certification Name</label>
                  <input type="text" placeholder="e.g., Web Development" value={newCertification} onChange={(e) => setNewCertification(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Institute/Organization</label>
                  <input type="text" placeholder="e.g., Coursera, Google" value={newCertificationInstitute} onChange={(e) => setNewCertificationInstitute(e.target.value)} />
                </div>
              </div>
              <button className={styles.uploadBtn} onClick={handleAddCertification} style={{ marginBottom: '1rem' }}>+ Add Certification</button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                {cvMakerData.certifications.map((cert, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #e8e8e8' }}>
                    <div>
                      <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: '#333' }}>{cert.name}</p>
                      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>📍 {cert.institute}</p>
                    </div>
                    <button onClick={() => handleRemoveCertification(idx)} style={{ background: 'none', border: 'none', color: '#d84a38', cursor: 'pointer', fontSize: '1.5rem', padding: '0.5rem' }}>×</button>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <h3 style={{ marginTop: '1.5rem', color: '#0052cc' }}>Projects</h3>
              <div className={styles.formGroup}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" placeholder="e.g., E-commerce Platform" value={newProject} onChange={(e) => setNewProject(e.target.value)} style={{ flex: 1 }} />
                  <button className={styles.actionBtn} onClick={handleAddProject}>Add</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {cvMakerData.projects.map((project, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f9f9f9', borderRadius: '6px' }}>
                    <span>• {project}</span>
                    <button onClick={() => handleRemoveProject(idx)} style={{ background: 'none', border: 'none', color: '#d84a38', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                  </div>
                ))}
              </div>

              {/* Portfolio */}
              <h3 style={{ marginTop: '1.5rem', color: '#0052cc' }}>Portfolio / Links</h3>
              <div className={styles.formGroup}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" placeholder="e.g., https://github.com/yourprofile" value={newPortfolio} onChange={(e) => setNewPortfolio(e.target.value)} style={{ flex: 1 }} />
                  <button className={styles.actionBtn} onClick={handleAddPortfolio}>Add</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {cvMakerData.portfolio.map((link, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f9f9f9', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#0052cc', textDecoration: 'underline' }}>🔗 {link}</span>
                    <button onClick={() => handleRemovePortfolio(idx)} style={{ background: 'none', border: 'none', color: '#d84a38', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowCVMaker(false)}>Cancel</button>
              <button className={styles.submitBtn} onClick={handleGenerateCV}>Generate CV</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
