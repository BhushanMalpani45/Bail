import React from 'react';
import { FaBell, FaExclamationTriangle, FaCheckCircle, FaGavel, FaCalendarCheck } from 'react-icons/fa'; // Import additional icons

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      message: "You have a new case assigned.",
      icon: <FaGavel className="text-blue-500" />, // Gavel icon for new case assignment
    },
    {
      id: 2,
      message: "Hearing scheduled for Case 002: Jane Smith vs City.",
      icon: <FaCalendarCheck className="text-blue-500" />, // Calendar check icon for hearing schedule
    },
    {
      id: 3,
      message: "Document review pending for Case 003: Alice Brown vs State.",
      icon: <FaExclamationTriangle className="text-yellow-500" />, // Warning icon for pending review
    },
    {
      id: 4,
      message: "Bail decision required for Case 004: Bob White vs State.",
      icon: <FaGavel className="text-red-500" />, // Gavel icon for bail decision
    },
    {
      id: 5,
      message: "Case 005: Carol Black vs City has been closed.",
      icon: <FaCheckCircle className="text-green-500" />, // Check circle icon for closed case
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="p-4 bg-white shadow mb-2 flex items-center">
            <span className="mr-4">{notification.icon}</span>
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
