'use client';

import { useState } from 'react';
import { useApplications } from '../context/ApplicationsContext';
import styles from './ApplyForm.module.css';

export default function ApplyForm({ job, onClose, onSuccess }) {
  const { submitApplication } = useApplications();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.resume.trim()) {
      newErrors.resume = 'Please select a resume';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const application = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        ...formData,
      };

      submitApplication(application);
      setSuccessMessage(`Successfully applied to ${job.title} at ${job.company}!`);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        resume: '',
        coverLetter: '',
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Apply to {job.title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.jobInfo}>
          <div className={styles.jobInfoItem}>
            <span className={styles.label}>Company:</span>
            <span className={styles.value}>{job.company}</span>
          </div>
          <div className={styles.jobInfoItem}>
            <span className={styles.label}>Location:</span>
            <span className={styles.value}>{job.location}</span>
          </div>
        </div>

        {successMessage && (
          <div className={styles.successMessage}>
            <i className="fa-solid fa-check-circle"></i>
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className={styles.errorMessage}>
            <i className="fa-solid fa-exclamation-circle"></i>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? styles.inputError : ''}
            />
            {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className={errors.phone ? styles.inputError : ''}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="resume">Select Resume *</label>
            <select
              id="resume"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className={errors.resume ? styles.inputError : ''}
            >
              <option value="">Choose a resume</option>
              <option value="Matthew's CV">Matthew's CV</option>
              <option value="Professional CV">Professional CV</option>
              <option value="Technical CV">Technical CV</option>
            </select>
            {errors.resume && <span className={styles.errorText}>{errors.resume}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="coverLetter">Cover Letter (Optional)</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Tell the employer why you're a great fit for this role..."
              rows="5"
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
