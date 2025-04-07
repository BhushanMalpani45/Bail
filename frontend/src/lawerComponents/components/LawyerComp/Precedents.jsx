import React, { useState } from 'react';
import { FaSearch, FaCheckCircle, FaClock, FaRegFileAlt, FaExclamationCircle } from 'react-icons/fa';

const Precedents = () => {
  // Sample data for precedents
  const precedentsData = [
    { caseNumber: '001', description: 'Case where defendant was acquitted based on self-defense.', date: '2023-01-15', status: 'Closed' },
    { caseNumber: '002', description: 'Case involving breach of contract with a focus on damages.', date: '2023-02-20', status: 'Reviewed' },
    { caseNumber: '003', description: 'Case where previous judgments were used to determine liability.', date: '2023-03-10', status: 'Pending' },
    { caseNumber: '004', description: 'Landmark case on intellectual property rights.', date: '2023-04-05', status: 'Approved' },
    { caseNumber: '005', description: 'Case dealing with corporate fraud and its legal implications.', date: '2023-05-22', status: 'Closed' },
  ];

  // State for search input and filtered precedents
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrecedents, setFilteredPrecedents] = useState(precedentsData);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    setFilteredPrecedents(
      precedentsData.filter((precedent) =>
        precedent.caseNumber.toUpperCase().includes(searchTerm.toUpperCase())
      )
    );
  };

  // Get icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FaClock className="text-yellow-500" />;
      case 'Reviewed':
        return <FaRegFileAlt className="text-blue-500" />;
      case 'Approved':
        return <FaCheckCircle className="text-green-500" />;
      case 'Closed':
        return <FaCheckCircle className="text-gray-500" />;
      default:
        return <FaExclamationCircle className="text-red-500" />;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Heading Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Legal Precedents</h1>
        <p className="text-lg text-gray-600">Explore and manage the precedents used in various legal cases.</p>
      </div>

      {/* Search Input and Button */}
      <div className="flex mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by Case Number"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg p-3 w-full md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          <button
            onClick={handleSearchClick}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaSearch className="w-5 h-5 mr-2" />
            <span className="font-semibold">Search</span>
          </button>
        </div>
      </div>

      {/* Card layout displaying precedents */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrecedents.map((precedent) => (
          <div
            key={precedent.caseNumber}
            className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 flex flex-col transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mr-2">Case Number: {precedent.caseNumber}</h2>
              {getStatusIcon(precedent.status)}
            </div>
            <p className="text-gray-700 mb-4">{precedent.description}</p>
            <div className="text-sm text-gray-500 mb-2">Date: {precedent.date}</div>
            <div className={`text-sm font-medium flex items-center ${precedent.status === 'Pending' ? 'text-yellow-500' : precedent.status === 'Reviewed' ? 'text-blue-500' : precedent.status === 'Approved' ? 'text-green-500' : 'text-gray-500'}`}>
              {getStatusIcon(precedent.status)}
              <span className="ml-2">Status: {precedent.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Precedents;
