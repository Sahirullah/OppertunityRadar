'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import styles from './cv-maker.module.css';

export default function CVMaker() {
  const [cvs, setCvs] = useState([
    { id: 1, name: 'Professional CV', createdDate: '2024-03-01', template: '📄' },
    { id: 2, name: 'Creative CV', createdDate: '2024-02-28', template: '🎨' },
  ]);

  const [editingCV, setEditingCV] = useState(null);
  const [formData, setFormData] = useState({
    fullName: 'Matthew Johnson',
    email: 'matthew@example.com',
    phone: '+1 (555) 123-4567',
    summary: 'Experienced professional with 5+ years in digital marketing and e-commerce management.',
    experience: 'Digital Marketing Manager at Tech Corp (2020-Present)\nMarketing Specialist at Digital Agency (2018-2020)',
    education: 'Bachelor of Business Administration - University of California',
    skills: 'Digital Marketing, E-commerce, Project Management, Data Analysis, SEO/SEM',
  });

  const handleCreateCV = () => {
    const newCV = {
      id: cvs.length + 1,
      name: `CV ${cvs.length + 1}`,
      createdDate: new Date().toISOString().split('T')[0],
      template: '📄',
    };
    setCvs([...cvs, newCV]);
  };

  const handleEditCV = (cv) => {
    setEditingCV(cv);
  };

  const handleDeleteCV = (id) => {
    setCvs(cvs.filter(cv => cv.id !== id));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveCV = () => {
    setEditingCV(null);
    alert('CV saved successfully!');
  };

  if (editingCV) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.editor}>
              <div className={styles.editorHeader}>
                <h1 className={styles.editorTitle}>Edit CV</h1>
                <div className={styles.editorActions}>
                  <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setEditingCV(null)}>
                    Cancel
                  </button>
                  <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSaveCV}>
                    Save CV
                  </button>
                </div>
              </div>

              <div className={styles.editorContent}>
                <div className={styles.editorForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className={styles.input}
                      value={formData.fullName}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      className={styles.input}
                      value={formData.email}
                      onChange={handleFormChange}
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
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Professional Summary</label>
                    <textarea
                      name="summary"
                      className={styles.textarea}
                      value={formData.summary}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Experience</label>
                    <textarea
                      name="experience"
                      className={styles.textarea}
                      value={formData.experience}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Education</label>
                    <textarea
                      name="education"
                      className={styles.textarea}
                      value={formData.education}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Skills</label>
                    <textarea
                      name="skills"
                      className={styles.textarea}
                      value={formData.skills}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className={styles.preview}>
                  <h2 className={styles.previewTitle}>{formData.fullName}</h2>
                  <div className={styles.previewContent}>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e8e8e8' }} />
                    <p><strong>Summary:</strong></p>
                    <p>{formData.summary}</p>
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e8e8e8' }} />
                    <p><strong>Experience:</strong></p>
                    <p>{formData.experience}</p>
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e8e8e8' }} />
                    <p><strong>Education:</strong></p>
                    <p>{formData.education}</p>
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e8e8e8' }} />
                    <p><strong>Skills:</strong></p>
                    <p>{formData.skills}</p>
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
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleCreateCV}>
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
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleCreateCV}>
                Create Your First CV
              </button>
            </div>
          ) : (
            <div className={styles.cvGrid}>
              {cvs.map(cv => (
                <div key={cv.id} className={styles.cvCard}>
                  <div className={styles.cvPreview}>{cv.template}</div>
                  <div className={styles.cvContent}>
                    <h3 className={styles.cvTitle}>{cv.name}</h3>
                    <p className={styles.cvMeta}>Created: {cv.createdDate}</p>
                    <div className={styles.cvActions}>
                      <button className={styles.cvBtn} onClick={() => handleEditCV(cv)}>
                        ✏️ Edit
                      </button>
                      <button className={styles.cvBtn} onClick={() => handleDeleteCV(cv.id)}>
                        🗑️ Delete
                      </button>
                      <button className={styles.cvBtn}>
                        📥 Download
                      </button>
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
