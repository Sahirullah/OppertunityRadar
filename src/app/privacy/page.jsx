'use client';

import Header from '../../components/Header';
import styles from './privacy.module.css';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: March 5, 2026</p>

          <section className={styles.section}>
            <h2>1. Introduction</h2>
            <p>
              OpportunityRadar ("we", "us", "our", or "Company") operates the OpportunityRadar website and mobile application. 
              This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service 
              and the choices you have associated with that data.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            
            <h3>Types of Data Collected:</h3>
            <ul>
              <li><strong>Personal Data:</strong> Email address, name, phone number, location, resume/CV</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visits</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies to track activity on our Service</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Use of Data</h2>
            <p>OpportunityRadar uses the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of 
              electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, 
              we cannot guarantee its absolute security.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className={styles.contactDetails}>
              <p>📧 Email: privacy@opportunityradar.com</p>
              <p>📱 Phone: +1 (555) 123-4567</p>
              <p>🏢 Address: 123 Tech Street, San Francisco, CA 94105</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
