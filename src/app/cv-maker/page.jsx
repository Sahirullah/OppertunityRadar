'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import { useCV } from '../../context/CVContext';
import { useAuth } from '../../context/AuthContext';
import styles from './cv-maker.module.css';

export default function CVMaker() {
  const { cvs, addCV, deleteCV, updateCV, setDefaultCV } = useCV();
  const { user } = useAuth();
  const [editingCV, setEditingCV] = useState(null);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });

  const resetForm = () => {
    setFormData({
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      summary: '',
      experience: '',
      education: '',
      skills: '',
    });
  };

  const handleCreateCV = () => {
    if (!formData.fullName || !formData.email) {
      alert('Please fill in at least Full Name and Email');
      return;
    }
    const fileName = `CV-${new Date().toISOString().split('T')[0]}.pdf`;
    const cvContent = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      summary: formData.summary,
      experience: formData.experience,
      education: formData.education,
      skills: formData.skills,
    };
    addCV({ fileName, content: cvContent });
    resetForm();
    setEditingCV(null);
    alert('CV created successfully!');
  };

  const handleEditCV = (cv) => {
    setEditingCV(cv);
    setFormData({
      fullName: cv.content?.name || '',
      email: cv.content?.email || '',
      phone: cv.content?.phone || '',
      summary: cv.content?.summary || '',
      experience: cv.content?.experience || '',
      education: cv.content?.education || '',
      skills: cv.content?.skills || '',
    });
  };

  const handleDeleteCV = (id) => {
    if (confirm('Are you sure you want to delete this CV?')) {
      deleteCV(id);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveCV = () => {
    if (!formData.fullName || !formData.email) {
      alert('Please fill in at least Full Name and Email');
      return;
    }
    if (editingCV) {
      const cvContent = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        summary: formData.summary,
        experience: formData.experience,
        education: formData.education,
        skills: formData.skills,
      };
      updateCV(editingCV.id, { content: cvContent });
      alert('CV updated successfully!');
    }
    setEditingCV(null);
    resetForm();
  };

  if (editingCV) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.editor}>
              <div className={styles.editorHeader}>
                <h1 className={styles.editorTitle}>{editingCV.id ? 'Edit CV' : 'Create New CV'}</h1>
                <div className={styles.editorActions}>
                  <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => {
                    setEditingCV(null);
                    resetForm();
                  }}>
                    Cancel
                  </button>
                  <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSaveCV}>
                    {editingCV.id ? 'Update CV' : 'Create CV'}
                  </button>
                </div>
              </div>

              <div className={styles.editorContent}>
                <div className={styles.editorForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      className={styles.input}
                      value={formData.fullName}
                      onChange={handleFormChange}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      className={styles.input}
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className={styles.input}
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+1-234-567-8900"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Professional Summary</label>
                    <textarea
                      name="summary"
                      className={styles.textarea}
                      value={formData.summary}
                      onChange={handleFormChange}
                      placeholder="Brief overview of your professional background and skills"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Experience</label>
                    <textarea
                      name="experience"
                      className={styles.textarea}
                      value={formData.experience}
                      onChange={handleFormChange}
                      placeholder="Job title - Company (Start - End)&#10;Description of responsibilities and achievements"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Education</label>
                    <textarea
                      name="education"
                      className={styles.textarea}
                      value={formData.education}
                      onChange={handleFormChange}
                      placeholder="Degree - School (Year)"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Skills</label>
                    <textarea
                      name="skills"
                      className={styles.textarea}
                      value={formData.skills}
                      onChange={handleFormChange}
                      placeholder="Skill 1, Skill 2, Skill 3"
                    />
                  </div>
                </div>

                <div className={styles.preview}>
                  <h2 className={styles.previewTitle}>{formData.fullName || 'Your Name'}</h2>
                  <div className={styles.previewContent}>
                    {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
                    {formData.phone && <p><strong>Phone:</strong> {formData.phone}</p>}
                    {(formData.email || formData.phone) && <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e8e8e8' }} />}
                    {formData.summary && (
                      <>
                        <p><strong>Summary:</strong></p>
                        <p>{formData.summary}</p>
                        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e8e8e8' }} />
                      </>
                    )}
                    {formData.experience && (
                      <>
                        <p><strong>Experience:</strong></p>
                        <p>{formData.experience}</p>
                        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e8e8e8' }} />
                      </>
                    )}
                    {formData.education && (
                      <>
                        <p><strong>Education:</strong></p>
                        <p>{formData.education}</p>
                        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e8e8e8' }} />
                      </>
                    )}
                    {formData.skills && (
                      <>
                        <p><strong>Skills:</strong></p>
                        <p>{formData.skills}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h1>My CVs</h1>
              <p>Create and manage your professional CVs</p>
            </div>
            <div className={styles.headerActions}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setEditingCV({})}>
                + Create New CV
              </button>
              <Link href="/" className={`${styles.btn} ${styles.btnSecondary}`}>
                Back to Jobs
              </Link>
            </div>
          </div>

          {cvs.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📄</div>
              <h2 className={styles.emptyTitle}>No CVs Yet</h2>
              <p className={styles.emptyText}>Create your first CV to start applying for jobs</p>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setEditingCV({})}>
                Create Your First CV
              </button>
            </div>
          ) : (
            <div className={styles.cvGrid}>
              {cvs.map(cv => (
                <div key={cv.id} className={styles.cvCard}>
                  <div className={styles.cvPreview}>📄</div>
                  <div className={styles.cvContent}>
                    <h3 className={styles.cvTitle}>{cv.fileName}</h3>
                    <p className={styles.cvMeta}>
                      Uploaded: {new Date(cv.uploadedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    {cv.isDefault && <p className={styles.defaultBadge}>✓ Default</p>}
                    <div className={styles.cvActions}>
                      <button className={styles.cvBtn} onClick={() => handleEditCV(cv)}>
                        ✏️ Edit
                      </button>
                      <button className={styles.cvBtn} onClick={() => handleDeleteCV(cv.id)}>
                        🗑️ Delete
                      </button>
                      {!cv.isDefault && (
                        <button className={styles.cvBtn} onClick={() => setDefaultCV(cv.id)}>
                          ⭐ Set Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
