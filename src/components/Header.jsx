'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
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
          <button className={styles.iconBtn}>🔔</button>
          <button className={styles.iconBtn}>💬</button>
          <button className={styles.iconBtn}>❤️</button>
          <button className={styles.profileBtn}>👤</button>
          <button className={styles.postBtn}>Employer/Post job</button>
        </div>
      </div>
    </header>
  );
}
