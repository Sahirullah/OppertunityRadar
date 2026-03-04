'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import styles from './admin.module.css';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Office Assistant', company: 'JD', location: 'London', status: 'active', applications: 12 },
    { id: 2, title: 'Marketing Manager', company: 'Facebook', location: 'London', status: 'active', applications: 8 },
    { id: 3, title: 'Social Media Manager', company: 'Unilever', location: 'Remote', status: 'inactive', applications: 5 },
  ]);

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
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleDeleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className={styles.main}>
        {/* Header */}
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

        {/* Stats Grid */}
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

        {/* Jobs Table */}
        {activeTab === 'jobs' && (
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <div className={styles.tableTitle}>All Jobs</div>
              <div className={styles.tableFilters}>
                <button
                  className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </button>
                <button
                  className={`${styles.filterBtn} ${filterStatus === 'active' ? styles.active : ''}`}
                  onClick={() => setFilterStatus('active')}
                >
                  Active
                </button>
                <button
                  className={`${styles.filterBtn} ${filterStatus === 'inactive' ? styles.active : ''}`}
                  onClick={() => setFilterStatus('inactive')}
                >
                  Inactive
                </button>
              </div>
            </div>
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
                        <button className={`${styles.actionBtn} ${styles.editBtn}`}>✏️</button>
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          onClick={() => handleDeleteJob(job.id)}
                        >
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

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <div className={styles.tableTitle}>All Users</div>
            </div>
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
                      <div className={styles.actions}>
                        <button className={`${styles.actionBtn} ${styles.editBtn}`}>✏️</button>
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          onClick={() => handleDeleteUser(user.id)}
                        >
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

        {/* Applications Table */}
        {activeTab === 'applications' && (
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <div className={styles.tableTitle}>All Applications</div>
              <div className={styles.tableFilters}>
                <button
                  className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </button>
                <button
                  className={`${styles.filterBtn} ${filterStatus === 'pending' ? styles.active : ''}`}
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending
                </button>
                <button
                  className={`${styles.filterBtn} ${filterStatus === 'approved' ? styles.active : ''}`}
                  onClick={() => setFilterStatus('approved')}
                >
                  Approved
                </button>
              </div>
            </div>
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
                        <button className={`${styles.actionBtn} ${styles.editBtn}`}>✏️</button>
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          onClick={() => handleDeleteApplication(app.id)}
                        >
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

      {/* Modal */}
      <div className={`${styles.modal} ${showModal ? styles.open : ''}`}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>
              Add New {activeTab.slice(0, -1)}
            </h2>
            <button className={styles.closeBtn} onClick={closeModal}>✕</button>
          </div>
          <form onSubmit={handleAddJob}>
            {activeTab === 'jobs' && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Job Title</label>
                  <input type="text" className={styles.input} placeholder="Enter job title" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Company</label>
                  <input type="text" className={styles.input} placeholder="Enter company name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Location</label>
                  <input type="text" className={styles.input} placeholder="Enter location" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description</label>
                  <textarea className={styles.textarea} placeholder="Enter job description"></textarea>
                </div>
              </>
            )}
            {activeTab === 'users' && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Name</label>
                  <input type="text" className={styles.input} placeholder="Enter user name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input type="email" className={styles.input} placeholder="Enter email" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Role</label>
                  <select className={styles.select}>
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                </div>
              </>
            )}
            {activeTab === 'applications' && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Job Title</label>
                  <input type="text" className={styles.input} placeholder="Enter job title" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Applicant Name</label>
                  <input type="text" className={styles.input} placeholder="Enter applicant name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Status</label>
                  <select className={styles.select}>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
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
    </>
  );
}
