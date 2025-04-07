import React from 'react';
import { FaTimes, FaUserCircle } from 'react-icons/fa'; // Import icons

const ProfileBox = ({ showProfile, onProfileClick, onCloseProfile }) => {
  return (
    <div className="relative">
      {/* Profile Box */}
      <div className="bg-white shadow-md rounded-lg p-2 flex items-center justify-between space-x-3 w-full">
        <div className="flex items-center space-x-2 cursor-pointer w-full" onClick={onProfileClick}>
          <FaUserCircle className="text-gray-600 text-2xl " />
          <div className="flex flex-col  justify-end">
            <p className="text-md font-semibold">{localStorage.getItem('name')}</p>
            <p className="text-gray-500 text-sm">Prisoner</p>
          </div>
        </div>
      </div>

      {/* Profile Popup (conditionally rendered) */}
      {showProfile && (
        <div className="bg-white shadow-md rounded-lg p-4 absolute top-12 right-0 w-56 z-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Profile Details</h2>
            <FaTimes className="text-gray-500 cursor-pointer" onClick={onCloseProfile} />
          </div>
          <p className="text-md font-semibold">John Doe</p>
          <p className="text-gray-500 text-sm">Prisoner</p>
          {/* Add more profile details here */}
        </div>
      )}

      {/* Welcome Box (below Profile Box) */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
      </div>
    </div>
  );
};

export default ProfileBox;
