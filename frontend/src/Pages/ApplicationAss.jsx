import React from 'react';
import { FaClipboardCheck, FaFileAlt, FaPaperPlane, FaSearch } from 'react-icons/fa'; // Importing icons

const ApplicationAssistance = () => {
  return (
    <div className="bg-white p-10 rounded-lg shadow-xl max-w-5xl mx-auto overflow-hidden">
      <h2 className="text-3xl font-semibold text-[#00008B] mb-6">Application Assistance</h2>
      <p className="text-[#03346E] text-lg mb-8">
        Follow these steps to prepare and submit your bail application:
      </p>

      <div className="flex items-center justify-between overflow-hidden">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center w-1/4 group">
          <div className="bg-[#00008B] text-white p-5 rounded-full mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 ease-in-out transform group-hover:-translate-y-1">
            <FaFileAlt size={30} />
          </div>
          <h3 className="text-xl font-semibold text-[#03346E] group-hover:text-[#00008B] transition-colors duration-300">Step 1</h3>
          <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Gather necessary documents</p>
        </div>

        {/* Connector */}
        <div className="flex-grow border-t-4 border-gray-300 mx-4" />

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center w-1/4 group">
          <div className="bg-[#00008B] text-white p-5 rounded-full mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 ease-in-out transform group-hover:-translate-y-1">
            <FaClipboardCheck size={30} />
          </div>
          <h3 className="text-xl font-semibold text-[#03346E] group-hover:text-[#00008B] transition-colors duration-300">Step 2</h3>
          <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Complete the bail application form</p>
        </div>

        {/* Connector */}
        <div className="flex-grow border-t-4 border-gray-300 mx-4" />

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center w-1/4 group">
          <div className="bg-[#00008B] text-white p-5 rounded-full mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 ease-in-out transform group-hover:-translate-y-1">
            <FaPaperPlane size={30} />
          </div>
          <h3 className="text-xl font-semibold text-[#03346E] group-hover:text-[#00008B] transition-colors duration-300">Step 3</h3>
          <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Submit the application</p>
        </div>

        {/* Connector */}
        <div className="flex-grow border-t-4 border-gray-300 mx-4" />

        {/* Step 4 */}
        <div className="flex flex-col items-center text-center w-1/4 group">
          <div className="bg-[#00008B] text-white p-5 rounded-full mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 ease-in-out transform group-hover:-translate-y-1">
            <FaSearch size={30} />
          </div>
          <h3 className="text-xl font-semibold text-[#03346E] group-hover:text-[#00008B] transition-colors duration-300">Step 4</h3>
          <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Track application status</p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-[#03346E] mb-3">Common Mistakes to Avoid:</h3>
        <ul className="list-disc list-inside text-[#03346E] ml-6 text-lg">
          <li>Not signing the application where required</li>
          <li>Missing deadlines for submission</li>
          <li>Providing incorrect or incomplete information</li>
          <li>Failing to attach necessary documents</li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-[#03346E] mb-3">Resources:</h3>
        <ul className="list-disc list-inside text-[#03346E] ml-6 text-lg">
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Download Bail Application Form
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              View Example of Filled Application
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Guide to Bail Process
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ApplicationAssistance;