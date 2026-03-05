'use client';

import Header from '../../components/Header';
import styles from './reviews.module.css';

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>My Reviews</h1>
          <p>You haven't written any reviews yet.</p>
          <button className={styles.btn}>Write a Review</button>
        </div>
      </div>
    </>
  );
}
