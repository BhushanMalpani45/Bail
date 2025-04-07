import React from 'react';
import { FaUserCircle, FaTimes } from 'react-icons/fa'; // Import icons

const ProfileBox = ({ showProfile, onProfileClick, onCloseProfile }) => {
  return (
    <>
      {/* Profile Box */}
      <div className="bg-white shadow-md rounded-lg p-2 flex items-center justify-end space-x-3">
        <FaUserCircle 
          className="text-gray-600 text-2xl cursor-pointer" 
          onClick={onProfileClick} 
        />
        <div className="flex flex-col text-right">
          <p className="text-md font-semibold">{localStorage.getItem('name')}</p>
          <p className="text-gray-500 text-sm">Lawyer</p>
        </div>
      </div>

      {/* Profile Popup (conditionally rendered) */}
      {showProfile && (
        <div className="bg-white shadow-md rounded-lg p-2 absolute top-0 right-0 mt-4 mr-4 w-56 z-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Profile Details</h2>
            <FaTimes 
              className="text-gray-500 cursor-pointer" 
              onClick={onCloseProfile} 
            />
          </div>
          <p className="text-md font-semibold">John Doe</p>
          <p className="text-gray-500 text-sm">Lawyer</p>
          {/* Add more profile details here */}
        </div>
      )}

      {/* Welcome Box (below Profile Box) */}
      <div className="text-center p-2 mt-4">
        <h1 className="text-2xl font-bold text-left">Welcome to Your Dashboard</h1>
      </div>
    </>
  );
};

export default ProfileBox;
