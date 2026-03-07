'use client';

import { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext';
import { useAuth } from '../context/AuthContext';
import styles from './ApplyFormModal.module.css';

export default function ApplyFormModal({ job, onClose, onSubmit }) {
  const { cvs, getDefaultCV } = useCV();
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Resume, 2: Questions, 3: Review, 4: Success
  const [selectedCVId, setSelectedCVId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [applicationData, setApplicationData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (cvs.length > 0) {
      const defaultCV = getDefaultCV();
      setSelectedCVId(defaultCV?.id || cvs[0]?.id);
    }
  }, [cvs, getDefaultCV]);

  const handleResumeSelect = () => {
    if (!selectedCVId) {
      alert('Please select a CV');
      return;
    }
    setStep(2);
  };

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handleQuestionsSubmit = () => {
    setStep(3);
  };

  const handleApplicationSubmit = () => {
    if (onSubmit) {
      onSubmit({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        selectedCVId: selectedCVId,
        applicationData: applicationData,
        answers: answers,
        appliedAt: new Date().toISOString(),
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2000);
  };

  const selectedCV = cvs.find(cv => cv.id === selectedCVId);

  // Sample questions from employer
  const questions = [
    {
      id: 1,
      text: 'Do you prefer front-end or back-end development?',
      type: 'textarea',
      required: true
    }
  ];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <button className={styles.backBtn} onClick={() => step > 1 ? setStep(step - 1) : onClose()}>
              ←
            </button>
            <div>
              <h2>{job.title}</h2>
              <p className={styles.company}>{job.company} - {job.location}</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {submitted ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>Application Submitted!</h3>
            <p>Your application has been sent successfully.</p>
          </div>
        ) : (
          <div className={styles.modalContent}>
            <div className={styles.progressSection}>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>
                <span className={styles.progressText}>Save and close {Math.round((step / 4) * 100)}%</span>
              </div>
            </div>

            {/* STEP 1: Resume Selection */}
            {step === 1 && (
              <>
                <h3 className={styles.sectionTitle}>Add a resume for the employer</h3>

                <div className={styles.resumeOptions}>
                  {cvs.length > 0 ? (
                    <>
                      {/* Recommended/Default CV */}
                      {cvs[0] && (
                        <div 
                          className={`${styles.resumeOption} ${styles.recommended} ${selectedCVId === cvs[0]?.id ? styles.selected : ''}`}
                          onClick={() => setSelectedCVId(cvs[0]?.id)}
                        >
                          <div className={styles.resumeIconWrapper}>
                            <i className="fa-solid fa-file-pdf"></i>
                          </div>
                          <div className={styles.resumeInfo}>
                            <p className={styles.resumeLabel}>{cvs[0]?.fileName}</p>
                            <p className={styles.resumeDate}>
                              Uploaded {new Date(cvs[0]?.uploadedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                            <span className={styles.recommendedBadge}>Recommended</span>
                          </div>
                          {selectedCVId === cvs[0]?.id && <div className={styles.checkmark}>✓</div>}
                        </div>
                      )}

                      {/* Other CVs */}
                      {cvs.slice(1).map((cv) => (
                        <div 
                          key={cv.id}
                          className={`${styles.resumeOption} ${selectedCVId === cv.id ? styles.selected : ''}`}
                          onClick={() => setSelectedCVId(cv.id)}
                        >
                          <div className={styles.resumeIconWrapper}>
                            <i className="fa-solid fa-file-pdf"></i>
                          </div>
                          <div className={styles.resumeInfo}>
                            <p className={styles.resumeLabel}>{cv.fileName}</p>
                            <p className={styles.resumeDate}>
                              Uploaded {new Date(cv.uploadedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                          {selectedCVId === cv.id && <div className={styles.checkmark}>✓</div>}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className={styles.noCVMessage}>
                      <p>No CVs uploaded yet. <a href="/profile" style={{ color: '#0052cc', textDecoration: 'none', fontWeight: '600', cursor: 'pointer' }}>Create or upload a CV first</a></p>
                    </div>
                  )}
                </div>

                {selectedCVId && selectedCV ? (
                  <div className={styles.resumePreview}>
                    <div className={styles.previewHeader}>
                      <div className={styles.previewTitle}>
                        <i className="fa-solid fa-file-pdf"></i>
                        <span>{selectedCV?.fileName}</span>
                        <i className="fa-solid fa-check"></i>
                      </div>
                    </div>
                    <div className={styles.previewContent}>
                      <div className={styles.resumeText}>
                        {selectedCV?.content ? (
                          <>
                            {selectedCV.content.name && (
                              <div className={styles.resumeName}>{selectedCV.content.name}</div>
                            )}
                            {(selectedCV.content.email || selectedCV.content.phone) && (
                              <div className={styles.resumeContact}>
                                <p>
                                  {selectedCV.content.email && `Email: ${selectedCV.content.email}`}
                                  {selectedCV.content.email && selectedCV.content.phone && ' | '}
                                  {selectedCV.content.phone && `Phone: ${selectedCV.content.phone}`}
                                </p>
                              </div>
                            )}
                            
                            {selectedCV.content.summary && (
                              <div className={styles.resumeSection}>
                                <h4>PROFESSIONAL SUMMARY</h4>
                                <p>{selectedCV.content.summary}</p>
                              </div>
                            )}

                            {selectedCV.content.skills && selectedCV.content.skills.length > 0 && (
                              <div className={styles.resumeSection}>
                                <h4>SKILLS</h4>
                                <ul>
                                  {selectedCV.content.skills.map((skill, idx) => (
                                    <li key={idx}>{skill}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {selectedCV.content.experience && selectedCV.content.experience.length > 0 && (
                              <div className={styles.resumeSection}>
                                <h4>EXPERIENCE</h4>
                                {selectedCV.content.experience.map((exp, idx) => (
                                  <div key={idx} className={styles.jobEntry}>
                                    <p><strong>{exp.position}</strong> - {exp.company} ({exp.startDate} - {exp.endDate})</p>
                                    {exp.description && <p>{exp.description}</p>}
                                  </div>
                                ))}
                              </div>
                            )}

                            {selectedCV.content.education && selectedCV.content.education.length > 0 && (
                              <div className={styles.resumeSection}>
                                <h4>EDUCATION</h4>
                                {selectedCV.content.education.map((edu, idx) => (
                                  <p key={idx}><strong>{edu.degree}</strong> - {edu.school} ({edu.year})</p>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <p>No CV content available</p>
                        )}
                      </div>
                    </div>
                    <button type="button" className={styles.cvOptionsBtn}>
                      <i className="fa-solid fa-sliders"></i> CV options
                    </button>
                  </div>
                ) : (
                  <div className={styles.resumePreview}>
                    <p>Please select or create a CV to continue</p>
                  </div>
                )}

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelBtn} onClick={onClose}>
                    Cancel
                  </button>
                  <button type="button" className={styles.submitBtn} onClick={handleResumeSelect}>
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: Answer Questions */}
            {step === 2 && (
              <>
                <h3 className={styles.sectionTitle}>Answer these questions from the employer</h3>
                <p className={styles.questionNote}>These questions are from the employer. If a question seems inappropriate, you can report the job.</p>

                <div className={styles.questionsContainer}>
                  {questions.map((question, idx) => (
                    <div key={question.id} className={styles.questionGroup}>
                      <label className={styles.questionLabel}>
                        {question.text}
                        {question.required && <span className={styles.required}>*</span>}
                      </label>
                      {question.type === 'textarea' && (
                        <textarea
                          className={styles.questionInput}
                          value={answers[idx] || ''}
                          onChange={(e) => handleAnswerChange(idx, e.target.value)}
                          placeholder="Your answer here..."
                          rows="4"
                        />
                      )}
                      <div className={styles.charCount}>
                        {(answers[idx] || '').length} / 1500
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="button" className={styles.submitBtn} onClick={handleQuestionsSubmit}>
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: Review Application */}
            {step === 3 && (
              <>
                <h3 className={styles.sectionTitle}>Please review your application</h3>
                <p className={styles.reviewNote}>You will not be able to make changes after you submit your application.</p>

                <div className={styles.reviewSection}>
                  <div className={styles.reviewHeader}>
                    <h4>Contact Information</h4>
                    <button className={styles.editBtn}>Edit</button>
                  </div>
                  <div className={styles.reviewContent}>
                    <div className={styles.reviewItem}>
                      <span className={styles.label}>Name</span>
                      <span className={styles.value}>{applicationData.fullName}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.label}>Email</span>
                      <span className={styles.value}>{applicationData.email}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.label}>Phone</span>
                      <span className={styles.value}>{applicationData.phone}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.reviewSection}>
                  <h4>Resume</h4>
                  <div className={styles.resumeReview}>
                    <i className="fa-solid fa-file-pdf"></i>
                    <span>{selectedCV?.fileName}</span>
                    <button className={styles.editBtn}>Edit</button>
                  </div>
                  <div className={styles.resumePreviewSmall}>
                    {selectedCV?.content?.name && (
                      <div className={styles.resumeName}>{selectedCV.content.name}</div>
                    )}
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button type="button" className={styles.submitBtn} onClick={handleApplicationSubmit}>
                    Submit your application
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
