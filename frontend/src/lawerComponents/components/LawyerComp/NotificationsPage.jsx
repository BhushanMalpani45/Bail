import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaInfoCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [expandedNotification, setExpandedNotification] = useState(null);

  const lawyerId = localStorage.getItem("id"); // Assuming login stores this

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/lawyer/${lawyerId}/notifications`);
        console.log(res.data.appliedPrisoners.data);
        setNotifications(res.data.appliedPrisoners.data || []);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };
    fetchNotifications();
  }, [lawyerId]);

  const handleDecision = async (prisonerId, decision) => {
    console.log(prisonerId);
    try {
      await axios.post(`http://localhost:3000/lawyer/decision/${lawyerId}`, {
        prisonerId,
        decision,
      });

      setNotifications((prev) => prev.filter(p => p._id !== prisonerId));
    } catch (error) {
      console.error("Error handling decision", error);
    }
  };

  const handleViewDetails = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h2>
      <div className="p-4">
        <ul className="space-y-4">
          {notifications.length === 0 && <p>No new requests</p>}
          {notifications.map(notification => (
            <li key={notification._id} className="shadow-md rounded-lg p-4 bg-white border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FaInfoCircle className="text-blue-500 text-2xl" />
                  <p className="font-semibold text-gray-800">
                    {notification.name} has requested to choose you as lawyer.
                  </p>
                </div>
                <button
                  onClick={() => handleViewDetails(notification._id)}
                  className="text-blue-600"
                >
                  {expandedNotification === notification._id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>

              {expandedNotification === notification._id && (
                <div className="mt-3 space-y-2 border-t pt-3 text-gray-700">
                  <p><strong>Email:</strong> {notification.email_id}</p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => handleDecision(notification._id, "accept")}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecision(notification._id, "reject")}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsPage;
