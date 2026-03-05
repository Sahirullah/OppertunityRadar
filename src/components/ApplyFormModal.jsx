'use client';

import { useState } from 'react';
import styles from './ApplyFormModal.module.css';

export default function ApplyFormModal({ job, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedCV: '',
    coverLetter: '',
    yearsExperience: '',
    currentPosition: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.selectedCV) {
      alert('Please fill in all required fields');
      return;
    }

    // Call onSubmit callback
    if (onSubmit) {
      onSubmit({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        ...formData,
        appliedAt: new Date().toISOString(),
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        selectedCV: '',
        coverLetter: '',
        yearsExperience: '',
        currentPosition: '',
      });
    }, 2000);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Apply for {job.title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {submitted ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>Application Submitted!</h3>
            <p>Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been sent successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.jobInfo}>
              <div className={styles.jobInfoItem}>
                <span className={styles.label}>Position:</span>
                <span className={styles.value}>{job.title}</span>
              </div>
              <div className={styles.jobInfoItem}>
                <span className={styles.label}>Company:</span>
                <span className={styles.value}>{job.company}</span>
              </div>
              <div className={styles.jobInfoItem}>
                <span className={styles.label}>Location:</span>
                <span className={styles.value}>{job.location}</span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="currentPosition">Current Position</label>
              <input
                type="text"
                id="currentPosition"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleChange}
                placeholder="e.g., Senior Developer"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="yearsExperience">Years of Experience</label>
              <select
                id="yearsExperience"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="selectedCV">Select CV *</label>
              <select
                id="selectedCV"
                name="selectedCV"
                value={formData.selectedCV}
                onChange={handleChange}
                required
              >
                <option value="">Choose a CV</option>
                <option value="default">Matthew's CV</option>
                <option value="cv2">Alternative CV</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell the employer why you're a great fit for this role (optional)"
                rows="5"
              />
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
