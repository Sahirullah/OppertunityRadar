'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const CompaniesContext = createContext();

// Initialize companies from localStorage
const initializeCompanies = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('registeredCompanies');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('Initialized companies from localStorage:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error initializing companies from localStorage:', error);
    }
  }
  return [];
};

export function CompaniesProvider({ children }) {
  const [companies, setCompanies] = useState(initializeCompanies);

  // Save to localStorage whenever companies change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Saving companies to localStorage:', companies);
      localStorage.setItem('registeredCompanies', JSON.stringify(companies));
    }
  }, [companies]);

  const registerCompany = (companyData) => {
    // Check if company already exists
    const exists = companies.find(c => c.name.toLowerCase() === companyData.name.toLowerCase());
    if (exists) {
      return exists;
    }

    const newCompany = {
      id: Math.max(...companies.map(c => c.id || 0), 0) + 1,
      name: companyData.name,
      industry: companyData.industry || 'Technology',
      location: companyData.location || 'Remote',
      email: companyData.email || '',
      phone: companyData.phone || '',
      website: companyData.website || '',
      description: companyData.description || '',
      logo: companyData.logo || '🏢',
      registeredAt: new Date().toISOString(),
      rating: 0,
      reviewCount: 0,
      reviews: [],
    };
    console.log('Registering company:', newCompany);
    const updated = [...companies, newCompany];
    setCompanies(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('registeredCompanies', JSON.stringify(updated));
    }
    return newCompany;
  };

  const addReview = (companyId, review) => {
    const updated = companies.map(company => {
      if (company.id === companyId) {
        const newReview = {
          id: Math.max(...(company.reviews?.map(r => r.id) || []), 0) + 1,
          ...review,
          createdAt: new Date().toISOString(),
        };
        const reviews = [...(company.reviews || []), newReview];
        const totalRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
        return {
          ...company,
          reviews,
          rating: totalRating / reviews.length,
          reviewCount: reviews.length,
        };
      }
      return company;
    });
    setCompanies(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('registeredCompanies', JSON.stringify(updated));
    }
  };

  const deleteReview = (companyId, reviewId) => {
    const updated = companies.map(company => {
      if (company.id === companyId) {
        const reviews = company.reviews.filter(r => r.id !== reviewId);
        const totalRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length : 0;
        return {
          ...company,
          reviews,
          rating: totalRating,
          reviewCount: reviews.length,
        };
      }
      return company;
    });
    setCompanies(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('registeredCompanies', JSON.stringify(updated));
    }
  };

  return (
    <CompaniesContext.Provider value={{ companies, registerCompany, addReview, deleteReview }}>
      {children}
    </CompaniesContext.Provider>
  );
}

export function useCompanies() {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error('useCompanies must be used within CompaniesProvider');
  }
  return context;
}
