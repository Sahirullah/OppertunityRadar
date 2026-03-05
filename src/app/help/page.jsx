'use client';

import Header from '../../components/Header';
import styles from './help.module.css';

export default function HelpPage() {
  const faqs = [
    {
      id: 1,
      question: 'How do I create an account?',
      answer: 'Click on "Employers / Post Job" button in the header and fill in your details. You can choose to register as a job seeker or employer.'
    },
    {
      id: 2,
      question: 'How do I apply for a job?',
      answer: 'Browse jobs using the search bar on the home page, click on a job listing, and click the "Apply" button. Make sure your profile is complete before applying.'
    },
    {
      id: 3,
      question: 'How do I post a job as an employer?',
      answer: 'Switch to employer mode in your profile, click "Post New Job", fill in the job details, and publish. Your job will be visible to all job seekers.'
    },
    {
      id: 4,
      question: 'How do I save a job?',
      answer: 'Click the bookmark icon on any job listing to save it. You can view all saved jobs in your profile under "Saved Jobs".'
    },
    {
      id: 5,
      question: 'How do I update my profile?',
      answer: 'Go to your profile page, click on the relevant tab (Skills, Education, etc.), and make your changes. Click "Save Changes" to update.'
    },
    {
      id: 6,
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the contact form on this page or email us at support@opportunityradar.com'
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Help & Support</h1>
          <p className={styles.subtitle}>Find answers to common questions</p>

          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <div key={faq.id} className={styles.faqItem}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.contactSection}>
            <h2>Still need help?</h2>
            <p>Contact our support team</p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.icon}>📧</span>
                <div>
                  <h4>Email</h4>
                  <p>support@opportunityradar.com</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>💬</span>
                <div>
                  <h4>Live Chat</h4>
                  <p>Available 9 AM - 6 PM EST</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
