'use client';

import Header from '../../components/Header';
import styles from './messages.module.css';
import { useState } from 'react';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  const conversations = [
    {
      id: 1,
      name: 'Tech Corp HR',
      lastMessage: 'We are interested in your profile...',
      timestamp: '2 hours ago',
      unread: true,
      avatar: '🏢'
    },
    {
      id: 2,
      name: 'Digital Solutions',
      lastMessage: 'Thank you for applying!',
      timestamp: '1 day ago',
      unread: false,
      avatar: '💼'
    },
    {
      id: 3,
      name: 'Web Innovations',
      lastMessage: 'Can you join the interview call?',
      timestamp: '3 days ago',
      unread: false,
      avatar: '🌐'
    }
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.messagesWrapper}>
          <div className={styles.conversationList}>
            <h2>Messages</h2>
            <div className={styles.conversations}>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`${styles.conversationItem} ${selectedChat === conv.id ? styles.active : ''} ${conv.unread ? styles.unread : ''}`}
                  onClick={() => setSelectedChat(conv.id)}
                >
                  <div className={styles.avatar}>{conv.avatar}</div>
                  <div className={styles.conversationInfo}>
                    <h4>{conv.name}</h4>
                    <p>{conv.lastMessage}</p>
                  </div>
                  <span className={styles.timestamp}>{conv.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chatArea}>
            {selectedChat ? (
              <>
                <div className={styles.chatHeader}>
                  <h3>{conversations.find(c => c.id === selectedChat)?.name}</h3>
                </div>
                <div className={styles.messages}>
                  <div className={styles.message}>
                    <p>Hello! We are interested in your profile for the Senior React Developer position.</p>
                    <span>2 hours ago</span>
                  </div>
                  <div className={`${styles.message} ${styles.sent}`}>
                    <p>Thank you! I'm very interested in this opportunity.</p>
                    <span>1 hour ago</span>
                  </div>
                </div>
                <div className={styles.inputArea}>
                  <input type="text" placeholder="Type your message..." />
                  <button><i className="fa-solid fa-paper-plane"></i></button>
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <i className="fa-solid fa-comments"></i>
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
