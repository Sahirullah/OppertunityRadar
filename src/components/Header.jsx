'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';
import AuthModal from './AuthModal';

export default function Header() {
  const pathname = usePathname();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            OpportunityRadar
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
            <button className={styles.iconBtn} title="Notifications">
              <i className="fas fa-bell"></i>
            </button>
            <button className={styles.iconBtn} title="Messages">
              <i className="fas fa-comments"></i>
            </button>
            <button className={styles.iconBtn} title="Saved">
              <i className="fas fa-heart"></i>
            </button>
            <button className={styles.profileBtn} title="Profile">
              <i className="fas fa-user-circle"></i>
            </button>
            <button 
              className={styles.postBtn}
              onClick={() => setShowAuthModal(true)}
            >
              Employer/Post job
            </button>
          </div>
        </div>
      </header>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
