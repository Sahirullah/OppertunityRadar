'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './admin.module.css';
import { useJobs } from '../../context/JobsContext';

export default function AdminPanel() {
  const { jobs, addJob, deleteJob, toggleJobStatus } = useJobs();
  const [activeTab, setActiveTab] = useState('jobs');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [users, setUsers] = useState([
    { id: 1, name: 'Matthew', email: 'matthew@example.com', role: 'user', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Sarah', email: 'sarah@example.com', role: 'user', status: 'active', joined: '2024-02-20' },
    { id: 3, name: 'John', email: 'john@example.com', role: 'admin', status: 'active', joined: '2024-01-01' },
  ]);

  const [applications, setApplications] = useState([
    { id: 1, jobTitle: 'Office Assistant', applicant: 'Matthew', status: 'pending', date: '2024-03-01' },
    { id: 2, jobTitle: 'Marketing Manager', applicant: 'Sarah', status: 'approved', date: '2024-02-28' },
    { id: 3, jobTitle: 'Social Media Manager', applicant: 'John', status: 'rejected', date: '2024-02-25' },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    name: '',
    email: '',
    role: 'user',
  });

  const stats = [
    { label: 'Total Jobs', value: jobs.length, change: '+2 this month' },
    { label: 'Total Users', value: users.length, change: '+1 this month' },
    { label: 'Applications', value: applications.length, change: '-3 this week', negative: true },
    { label: 'Active Jobs', value: jobs.filter(j => j.status === 'active').length, change: 'All active' },
  ];

  const getBadgeClass = (status) => {
    const statusMap = {
      'active': styles.badgeActive,
      'inactive': styles.badgeInactive,
      'pending': styles.badgePending,
      'approved': styles.badgeApproved,
      'rejected': styles.badgeRejected,
    };
    return statusMap[status] || styles.badgeActive;
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ title: '', company: '', location: '', name: '', email: '', role: 'user' });
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    if (activeTab === 'jobs' && formData.title && formData.company && formData.location) {
      addJob(formData);
      alert('Job added successfully!');
      closeModal();
    } else if (activeTab === 'users' && formData.name && formData.email) {
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: 'active',
        joined: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
      alert('User added successfully!');
      closeModal();
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleDeleteJob = (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      deleteJob(id);
    }
  };

  const handleDeleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleDeleteApplication = (id) => {
    if (confirm('Are you sure you want to delete this application?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const handleUpdateApplicationStatus = (id, newStatus) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>⚙ Admin</div>
          <div className={styles.navMenu}>
            <div
              className={`${styles.navItem} ${activeTab === 'jobs' ? styles.active : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              💼 Jobs
            </div>
            <div
              className={`${styles.navItem} ${activeTab === 'users' ? styles.active : ''}`}
              onClick={() => setActiveTab('users')}
            >
              👥 Users
            </div>
            <div
              className={`${styles.navItem} ${activeTab === 'applications' ? styles.active : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              📋 Applications
            </div>
            <div
              className={`${styles.navItem} ${activeTab === 'analytics' ? styles.active : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              📊 Analytics
            </div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h1>
              <p>Manage all {activeTab} in your system</p>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.searchBox}>
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {activeTab !== 'analytics' && (
                <button className={styles.addBtn} onClick={() => setShowModal(true)}>
                  + Add {activeTab.slice(0, -1)}
                </button>
              )}
            </div>
          </div>

          {activeTab === 'analytics' && (
            <div className={styles.statsGrid}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statCard}>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={`${styles.statChange} ${stat.negative ? styles.negative : ''}`}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Applications</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.location}</td>
                      <td>
                        <span className={`${styles.badge} ${getBadgeClass(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td>{job.applications}</td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={`${styles.actionBtn} ${job.status === 'active' ? styles.deactivateBtn : styles.activateBtn}`}
                            onClick={() => toggleJobStatus(job.id)}
                            title={job.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {job.status === 'active' ? '⏸️' : '▶️'}
                          </button>
                          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDeleteJob(job.id)}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`${styles.badge} ${getBadgeClass(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.joined}</td>
                      <td>
                        <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDeleteUser(user.id)}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Applicant</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.jobTitle}</td>
                      <td>{app.applicant}</td>
                      <td>
                        <span className={`${styles.badge} ${getBadgeClass(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>{app.date}</td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={`${styles.actionBtn} ${styles.approveBtn}`}
                            onClick={() => handleUpdateApplicationStatus(app.id, 'approved')}
                            title="Approve"
                          >
                            ✓
                          </button>
                          <button
                            className={`${styles.actionBtn} ${styles.rejectBtn}`}
                            onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')}
                            title="Reject"
                          >
                            ✕
                          </button>
                          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDeleteApplication(app.id)}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Add New {activeTab.slice(0, -1)}</h2>
              <button className={styles.closeBtn} onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleAddJob}>
              {activeTab === 'jobs' && (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Job Title</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter job title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Company</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Location</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </>
              )}
              {activeTab === 'users' && (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Name</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter user name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Role</label>
                    <select
                      className={styles.select}
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </>
              )}
              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>Save</button>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
