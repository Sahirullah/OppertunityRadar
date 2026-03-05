'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const ApplicationsContext = createContext();

// Initialize applications from localStorage
const initializeApplications = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('Initialized applications from localStorage:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error initializing applications from localStorage:', error);
    }
  }
  return [];
};

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(initializeApplications);

  // Save to localStorage whenever applications change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Saving applications to localStorage:', applications);
      localStorage.setItem('applications', JSON.stringify(applications));
    }
  }, [applications]);

  const submitApplication = (applicationData) => {
    const newApplication = {
      id: Date.now().toString(),
      ...applicationData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    
    console.log('Submitting application:', newApplication);
    const updated = [...applications, newApplication];
    setApplications(updated);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('applications', JSON.stringify(updated));
    }
    
    return newApplication;
  };

  const getApplicationsByJobId = (jobId) => {
    return applications.filter(app => app.jobId === jobId);
  };

  const getApplicationsByUser = () => {
    return applications;
  };

  const updateApplicationStatus = (applicationId, status) => {
    const updated = applications.map(app =>
      app.id === applicationId ? { ...app, status } : app
    );
    setApplications(updated);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('applications', JSON.stringify(updated));
    }
  };

  return (
    <ApplicationsContext.Provider value={{
      applications,
      submitApplication,
      getApplicationsByJobId,
      getApplicationsByUser,
      updateApplicationStatus,
    }}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within ApplicationsProvider');
  }
  return context;
}
