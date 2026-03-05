'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const JobsContext = createContext();

// Initialize jobs from localStorage
const initializeJobs = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('adminJobs');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('Initialized jobs from localStorage:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error initializing jobs from localStorage:', error);
    }
  }
  return [];
};

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(initializeJobs);

  // Save to localStorage whenever jobs change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Saving to localStorage:', jobs);
      localStorage.setItem('adminJobs', JSON.stringify(jobs));
    }
  }, [jobs]);

  const addJob = (jobData) => {
    const newJob = {
      id: Math.max(...jobs.map(j => j.id), 0) + 1,
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      status: 'active',
      applications: 0,
      description: jobData.description || 'Job description coming soon...',
      postedTime: 'Just now',
      match: 75,
      recommended: false,
      applied: false,
      saved: false,
    };
    console.log('Adding job:', newJob);
    const updated = [...jobs, newJob];
    setJobs(updated);
    // Save immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminJobs', JSON.stringify(updated));
    }
    return newJob;
  };

  const deleteJob = (id) => {
    const updated = jobs.filter(job => job.id !== id);
    setJobs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminJobs', JSON.stringify(updated));
    }
  };

  const toggleJobStatus = (id) => {
    const updated = jobs.map(job =>
      job.id === id ? { ...job, status: job.status === 'active' ? 'inactive' : 'active' } : job
    );
    setJobs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminJobs', JSON.stringify(updated));
    }
  };

  const updateJob = (id, updates) => {
    const updated = jobs.map(job =>
      job.id === id ? { ...job, ...updates } : job
    );
    setJobs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminJobs', JSON.stringify(updated));
    }
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, deleteJob, toggleJobStatus, updateJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within JobsProvider');
  }
  return context;
}
