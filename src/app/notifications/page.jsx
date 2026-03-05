'use client';

import Header from '../../components/Header';
import styles from './notifications.module.css';
import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Application Viewed',
      message: 'Tech Corp viewed your application for Senior React Developer',
      timestamp: '2 hours ago',
      read: false,
      icon: '👁️'
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Digital Solutions scheduled an interview for tomorrow at 2 PM',
      timestamp: '1 day ago',
      read: false,
      icon: '📅'
    },
    {
      id: 3,
      type: 'job',
      title: 'New Job Match',
      message: 'A new Full Stack Developer position matches your profile',
      timestamp: '2 days ago',
      read: true,
      icon: '💼'
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from Web Innovations',
      timestamp: '3 days ago',
      read: true,
      icon: '💬'
    },
    {
      id: 5,
      type: 'job',
      title: 'Job Recommendation',
      message: 'Frontend Engineer position at Web Innovations - Check it out!',
      timestamp: '1 week ago',
      read: true,
      icon: '⭐'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Notifications</h1>
            {unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount} unread</span>
            )}
          </div>

          <div className={styles.notificationsList}>
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`${styles.notificationItem} ${!notif.read ? styles.unread : ''}`}
                >
                  <div className={styles.icon}>{notif.icon}</div>
                  <div className={styles.content}>
                    <h3>{notif.title}</h3>
                    <p>{notif.message}</p>
                    <span className={styles.timestamp}>{notif.timestamp}</span>
                  </div>
                  <div className={styles.actions}>
                    {!notif.read && (
                      <button
                        className={styles.markReadBtn}
                        onClick={() => markAsRead(notif.id)}
                        title="Mark as read"
                      >
                        <i className="fa-solid fa-check"></i>
                      </button>
                    )}
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteNotification(notif.id)}
                      title="Delete"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <i className="fa-solid fa-bell-slash"></i>
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
