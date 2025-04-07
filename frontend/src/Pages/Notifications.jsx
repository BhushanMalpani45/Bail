// src/components/NotificationCenter.jsx
import React from 'react';

const NotificationCenter = () => {
  const notifications = [
    { type: 'info', message: 'Your next court date is scheduled for December 12th.' },
    { type: 'warning', message: 'Your lawyer has requested additional documents.' },
    { type: 'error', message: 'There was an error processing your last bail request.' },
    { type: 'success', message: 'You have successfully submitted your application for bail.' },
  ];

  return (
    <div className="bg-white border border-[#00008B] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-[#03346E] mb-4">Notifications</h2>
      <ul className="space-y-4">
        {notifications.map((notification, index) => (
          <li key={index} className={`flex justify-between items-center p-4 rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 ${notification.type === 'info' ? 'border-l-4 border-blue-500' : notification.type === 'warning' ? 'border-l-4 border-yellow-500' : notification.type === 'error' ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}`}>
            <span>{notification.message}</span>
            <button className="bg-[#00008B] text-white px-4 py-1 rounded hover:bg-[#1E3A55] transition duration-300">View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCenter;
