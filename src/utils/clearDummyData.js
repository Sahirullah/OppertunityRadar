// Utility to clear dummy CV data from localStorage
export const clearDummyCVs = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userCVs');
    console.log('Dummy CVs cleared from localStorage');
    return true;
  }
  return false;
};

// Clear on app initialization if needed
export const initializeCVStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('userCVs');
    if (stored) {
      try {
        const cvs = JSON.parse(stored);
        // Check if these are dummy CVs (Indeed Resume or MyResume-MS.pdf)
        const isDummy = cvs.some(cv => 
          cv.fileName === 'Indeed Resume' || 
          cv.fileName === 'MyResume-MS.pdf'
        );
        if (isDummy) {
          console.log('Dummy CVs detected, clearing...');
          localStorage.removeItem('userCVs');
          return true;
        }
      } catch (error) {
        console.error('Error checking CVs:', error);
      }
    }
  }
  return false;
};
