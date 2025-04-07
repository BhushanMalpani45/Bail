import React, { useEffect, useState } from 'react';
import { FaHome, FaLock } from 'react-icons/fa';
import BailPredictor from '../UndertrialComponents/BailPredictor';

const BailEligibility = () => {
  const [daysRemaining, setDaysRemaining] = useState(100); // Total days remaining
  const [totalDaysElapsed, setTotalDaysElapsed] = useState(0); // Days passed

  // Total sentence duration (e.g., 100 days for demo purposes)
  const totalDays = 100;

  // Calculate weeks for the progress
  const calculateWeeks = (days) => Math.ceil(days / 7);

  // Effect to simulate the passage of time (1 day per second for demo purposes)
  useEffect(() => {
    if (daysRemaining > 0) {
      const interval = setInterval(() => {
        setDaysRemaining((prevDays) => Math.max(prevDays - 1, 0));
        setTotalDaysElapsed((prevElapsed) => Math.min(prevElapsed + 1, totalDays));
      }, 1000); // Adjust the interval for real-time simulation (e.g., 1 day per second)
      return () => clearInterval(interval);
    }
  }, [daysRemaining, totalDaysElapsed]);

  return (
    <div>

    <div className="bg-white border-2 border-primary p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-primary mb-4">Bail Eligibility Tracker</h2>

      {/* Display bail eligibility status */}
      <p className={`text-lg ${daysRemaining === 0 ? 'text-blue-500' : 'text-red-500'}`}>
        {daysRemaining === 0 ? 'Eligible for Bail' : 'Not Eligible for Bail'}
      </p>

      <div className="mt-4">
        {/* Slider to show elapsed weeks */}
        <div className="flex items-center mb-4">
          <FaLock className="text-gray-700 mr-2" size={24} />
          <input
            type="range"
            min="0"
            max={calculateWeeks(totalDays)}
            value={calculateWeeks(totalDaysElapsed)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0000FF 0%, #0000FF ${(calculateWeeks(totalDaysElapsed) / calculateWeeks(totalDays)) * 100}%, #e5e7eb ${(calculateWeeks(totalDaysElapsed) / calculateWeeks(totalDays)) * 100}%, #e5e7eb 100%)`
            }}
            readOnly
            />
          <FaHome className="text-gray-700 ml-2" size={24} />
        </div>

        {/* Display of weeks/months remaining */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-2">
            {daysRemaining > 0
              ? `${daysRemaining} days remaining | ${Math.floor(daysRemaining / 30)} months remaining`
              : 'Eligible for release'}
          </p>
          <p className="text-sm text-gray-500">
            {totalDaysElapsed} days elapsed | {calculateWeeks(totalDaysElapsed)} weeks elapsed
          </p>
        </div>
      </div>
    </div>
      <br/>
      <BailPredictor/>  
              </div>
  );
};

export default BailEligibility;