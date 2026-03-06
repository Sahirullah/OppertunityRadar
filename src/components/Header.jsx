'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';
import AuthModal from './AuthModal';
import { useSavedJobs } from '../context/SavedJobsContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { savedJobs } = useSavedJobs();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isActive = (path) => pathname === path;

  const handleFavorites = () => router.push('/saved');
  const handleMessages = () => router.push('/messages');
  const handleNotifications = () => router.push('/notifications');
  const handleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleMenuClick = (path) => {
    router.push(path);
    setShowProfileMenu(false);
  };

  const handleSignOut = () => {
    // Clear any auth data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    
    // Close menu and redirect to home
    setShowProfileMenu(false);
    router.push('/');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/logo.png" 
              alt="OpportunityRadar Logo" 
              width={50}
              height={50}
              priority
            />
          </Link>
          
          <nav className={styles.nav}>
            <Link 
              href="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/job-finder" 
              className={`${styles.navLink} ${isActive('/job-finder') ? styles.active : ''}`}
            >
              Company reviews
            </Link>
          </nav>

          <div className={styles.actions}>
            <div className={styles.iconBtnWrapper}>
              <button 
                className={styles.iconBtn} 
                title="Saved"
                data-tooltip="Saved"
                onClick={handleFavorites}
              >
                <i className="fa-regular fa-bookmark"></i>
              </button>
              {savedJobs.length > 0 && (
                <span className={styles.badge}>{savedJobs.length}</span>
              )}
            </div>
            <button 
              className={styles.iconBtn} 
              title="Messages"
              data-tooltip="Messages"
              onClick={handleMessages}
            >
              <i className="fa-regular fa-comment"></i>
            </button>
            <button 
              className={styles.notificationBtn} 
              title="Notifications"
              data-tooltip="Notifications"
              onClick={handleNotifications}
            >
              <i className="fa-regular fa-bell"></i>
            </button>
            <div className={styles.profileContainer}>
              <button 
                className={styles.profileBtn} 
                title="Profile"
                data-tooltip="Account"
                onClick={handleProfile}
              >
                <i className="fa-regular fa-circle-user"></i>
              </button>
              {showProfileMenu && (
                <div className={styles.profileMenu}>
                  <div className={styles.menuHeader}>
                    sahirullah313@gmail.com
                  </div>
                  <button 
                    className={styles.menuItem}
                    onClick={() => handleMenuClick('/profile')}
                  >
                    <i className="fa-solid fa-user"></i>
                    Profile
                  </button>
                  <button 
                    className={styles.menuItem}
                    onClick={() => handleMenuClick('/applications')}
                  >
                    <i className="fa-solid fa-file-lines"></i>
                    My applications
                  </button>
                  <button 
                    className={styles.menuItem}
                    onClick={() => handleMenuClick('/reviews')}
                  >
                    <i className="fa-solid fa-star"></i>
                    My reviews
                  </button>
                  <button 
                    className={styles.menuItem}
                    onClick={() => handleMenuClick('/settings')}
                  >
                    <i className="fa-solid fa-gear"></i>
                    Settings
                  </button>
                  <button 
                    className={styles.menuItem}
                    onClick={() => handleMenuClick('/help')}
                  >
                    <i className="fa-solid fa-circle-question"></i>
                    Help
                  </button>
                  <button 
                    className={styles.menuItem}
                    onClick={() => handleMenuClick('/privacy')}
                  >
                    <i className="fa-solid fa-lock"></i>
                    Privacy Center
                  </button>
                  <div className={styles.menuFooter}>
                    © 2026 OpportunityRadar
                  </div>
                  <button 
                    className={styles.signOutBtn}
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
            <div className={styles.divider}></div>
            <button 
              className={styles.postBtn}
              onClick={() => setShowAuthModal(true)}
            >
              Employers / Post Job
            </button>
          </div>
        </div>
      </header>

      {showProfileMenu && (
        <div 
          className={styles.menuBackdrop}
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
