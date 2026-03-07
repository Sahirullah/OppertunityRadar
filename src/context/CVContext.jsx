'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CVContext = createContext();

export function CVProvider({ children }) {
  const [cvs, setCVs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCVs = async () => {
      try {
        const response = await fetch('/api/cv');
        const result = await response.json();
        if (result.success) {
          // Transform API CVs to match the expected format
          const transformedCVs = result.data.map(cv => ({
            id: cv._id,
            fileName: cv.name,
            uploadedDate: cv.createdAt || new Date().toISOString(),
            isDefault: false,
            content: cv.data || {},
          }));
          setCVs(transformedCVs);
        }
      } catch (error) {
        console.error('Error loading CVs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCVs();
  }, []);

  const getDefaultCV = () => {
    return cvs.find(cv => cv.isDefault) || cvs[0];
  };

  return (
    <CVContext.Provider value={{ cvs, loading, getDefaultCV }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within CVProvider');
  }
  return context;
}
