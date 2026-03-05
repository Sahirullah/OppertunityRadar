'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const SavedJobsContext = createContext();

// Initialize saved jobs from localStorage
const initializeSavedJobs = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('savedJobs');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('Initialized saved jobs from localStorage:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error initializing saved jobs from localStorage:', error);
    }
  }
  return [];
};

export function SavedJobsProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState(initializeSavedJobs);

  // Save to localStorage whenever saved jobs change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Saving saved jobs to localStorage:', savedJobs);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
  }, [savedJobs]);

  const saveJob = (job) => {
    // Check if job is already saved
    const isAlreadySaved = savedJobs.some(savedJob => savedJob.id === job.id);
    if (isAlreadySaved) {
      console.log('Job already saved:', job.id);
      return;
    }

    const newSavedJob = {
      ...job,
      savedAt: new Date().toISOString(),
    };
    
    console.log('Saving job:', newSavedJob);
    const updated = [...savedJobs, newSavedJob];
    setSavedJobs(updated);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedJobs', JSON.stringify(updated));
    }
  };

  const unsaveJob = (jobId) => {
    const updated = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updated);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedJobs', JSON.stringify(updated));
    }
  };

  const isJobSaved = (jobId) => {
    return savedJobs.some(job => job.id === jobId);
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, saveJob, unsaveJob, isJobSaved }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error('useSavedJobs must be used within SavedJobsProvider');
  }
  return context;
}
