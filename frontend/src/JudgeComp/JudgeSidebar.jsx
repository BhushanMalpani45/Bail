import React from 'react';
import { NavLink } from 'react-router-dom';

const JudgeSidebar = () => {
  return (
    <div style={{ backgroundColor: '#03346E' }} className="w-64 h-full text-white">
      <div className="p-4 text-2xl font-bold">
        Judge Dashboard
      </div>
      <ul className="mt-6">
        <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
          <NavLink
            to="/judge/case-overview"
            className="block"
            activeClassName="bg-gray-200 text-blue-900"
          >
            Case Overview
          </NavLink>
        </li>
        <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
          <NavLink
            to="/judge/hearing-schedule"
            className="block"
            activeClassName="bg-gray-200 text-blue-900"
          >
            Hearing Schedule
          </NavLink>
        </li>
       
        <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
          <NavLink
            to="/judge/notifications"
            className="block"
            activeClassName="bg-gray-200 text-blue-900"
          >
            Notifications
          </NavLink>
        </li>
        <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
          Logout
        </li>
      </ul>
    </div>
  );
};

export default JudgeSidebar;
