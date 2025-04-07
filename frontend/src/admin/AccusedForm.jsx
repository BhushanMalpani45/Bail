import React, { useState } from 'react';

const AccusedForm = ({ data, updateData }) => {
  const [accusedList, setAccusedList] = useState(data);
  const [activeAccusedIndex, setActiveAccusedIndex] = useState(0);
  
  const addAccused = () => {
    const newAccused = {
      name: '',
      fatherName: '',
      gender: '',
      age: '',
      idType: '',
      idNumber: '',
      address: '',
      contactDetails: {
        phone: '',
        email: ''
      },
      custodyStatus: 'Not Arrested',
      prisonerDetails: {
        prisonId: '',
        currentCustodyType: '',
        dateOfArrest: '',
        familyBackground: {
          fatherName: '',
          motherName: '',
          maritalStatus: ''
        },
        pastRecords: []
      }
    };
    
    const updatedList = [...accusedList, newAccused];
    setAccusedList(updatedList);
    updateData(updatedList);
    setActiveAccusedIndex(updatedList.length - 1);
  };
  
  const removeAccused = (index) => {
    if (accusedList.length === 1) {
      return; // Keep at least one accused
    }
    
    const updatedList = [...accusedList];
    updatedList.splice(index, 1);
    setAccusedList(updatedList);
    updateData(updatedList);
    
    // Update active index if needed
    if (activeAccusedIndex >= updatedList.length) {
      setActiveAccusedIndex(updatedList.length - 1);
    }
  };
  
  const handleAccusedChange = (e, index) => {
    const { name, value } = e.target;
    const updatedList = [...accusedList];
    
    // Handle nested fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      updatedList[index] = {
        ...updatedList[index],
        [parent]: {
          ...updatedList[index][parent],
          [child]: value
        }
      };
    } else {
      updatedList[index] = {
        ...updatedList[index],
        [name]: value
      };
    }
    
    setAccusedList(updatedList);
    updateData(updatedList);
  };
  
  const handlePrisonerDetailsChange = (e, index) => {
    const { name, value } = e.target;
    const updatedList = [...accusedList];
    
    // Handle nested fields in prisonerDetails
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      updatedList[index].prisonerDetails = {
        ...updatedList[index].prisonerDetails,
        [parent]: {
          ...updatedList[index].prisonerDetails[parent],
          [child]: value
        }
      };
    } else {
      updatedList[index].prisonerDetails = {
        ...updatedList[index].prisonerDetails,
        [name]: value
      };
    }
    
    setAccusedList(updatedList);
    updateData(updatedList);
  };
  
  const addPastRecord = (accusedIndex) => {
    const updatedList = [...accusedList];
    if (!updatedList[accusedIndex].prisonerDetails.pastRecords) {
      updatedList[accusedIndex].prisonerDetails.pastRecords = [];
    }
    
    updatedList[accusedIndex].prisonerDetails.pastRecords.push({
      caseDescription: '',
      status: '',
      courtName: '',
      sentenceDuration: ''
    });
    
    setAccusedList(updatedList);
    updateData(updatedList);
  };
  
  const removePastRecord = (accusedIndex, recordIndex) => {
    const updatedList = [...accusedList];
    updatedList[accusedIndex].prisonerDetails.pastRecords.splice(recordIndex, 1);
    
    setAccusedList(updatedList);
    updateData(updatedList);
  };
  
  const updatePastRecord = (accusedIndex, recordIndex, field, value) => {
    const updatedList = [...accusedList];
    updatedList[accusedIndex].prisonerDetails.pastRecords[recordIndex][field] = value;
    
    setAccusedList(updatedList);
    updateData(updatedList);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Accused Details</h2>
      
      {/* Accused Tabs */}
      <div className="flex flex-wrap items-center border-b border-gray-200">
        {accusedList.map((accused, index) => (
          <button
            key={index}
            type="button"
            className={`mr-2 py-2 px-4 text-sm font-medium focus:outline-none ${
              activeAccusedIndex === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveAccusedIndex(index)}
          >
            {accused.name ? accused.name : `Accused ${index + 1}`}
          </button>
        ))}
        <button
          type="button"
          onClick={addAccused}
          className="ml-2 py-1 px-3 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200"
        >
          + Add Accused
        </button>
      </div>
      
      {/* Active Accused Form */}
      {accusedList.map((accused, index) => (
        <div key={index} className={activeAccusedIndex === index ? '' : 'hidden'}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Accused #{index + 1} Details</h3>
            {accusedList.length > 1 && (
              <button
                type="button"
                onClick={() => removeAccused(index)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200"
              >
                Remove Accused
              </button>
            )}
          </div>
          
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={accused.name}
                onChange={(e) => handleAccusedChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Father's Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Father's Name
              </label>
              <input
                type="text"
                name="fatherName"
                value={accused.fatherName}
                onChange={(e) => handleAccusedChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender*
              </label>
              <select
                name="gender"
                value={accused.gender}
                onChange={(e) => handleAccusedChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age*
              </label>
              <input
                type="number"
                name="age"
                value={accused.age}
                onChange={(e) => handleAccusedChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Custody Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custody Status
              </label>
              <select
                name="custodyStatus"
                value={accused.custodyStatus}
                onChange={(e) => handleAccusedChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Not Arrested">Not Arrested</option>
                <option value="Police Custody">Police Custody</option>
                <option value="Judicial Custody">Judicial Custody</option>
                <option value="Released on Bail">Released on Bail</option>
                <option value="Absconding">Absconding</option>
              </select>
            </div>
          </div>
          
          {/* ID Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* ID Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Type*
              </label>
              <select
                name="idType"
                value={accused.idType}
                onChange={(e) => handleAccusedChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select ID Type</option>
                <option value="Aadhar">Aadhar</option>
                <option value="PAN">PAN</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* ID Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Number*
              </label>
              <input
                type="text"
                name="idNumber"
                value={accused.idNumber}
                onChange={(e) => handleAccusedChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          {/* Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address*
            </label>
            <textarea
              name="address"
              value={accused.address}
              onChange={(e) => handleAccusedChange(e, index)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              required
            />
          </div>
          
          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="contactDetails.phone"
                value={accused.contactDetails.phone}
                onChange={(e) => handleAccusedChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="contactDetails.email"
                value={accused.contactDetails.email}
                onChange={(e) => handleAccusedChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Prisoner Details (conditional on custody status) */}
          {accused.custodyStatus !== 'Not Arrested' && accused.custodyStatus !== 'Absconding' && (
            <div className="border p-4 rounded-md bg-gray-50 mb-6">
              <h4 className="text-md font-medium mb-4">Prisoner Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Prison ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prison ID
                  </label>
                  <input
                    type="text"
                    name="prisonId"
                    value={accused.prisonerDetails.prisonId}
                    onChange={(e) => handlePrisonerDetailsChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Custody Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custody Type
                  </label>
                  <select
                    name="currentCustodyType"
                    value={accused.prisonerDetails.currentCustodyType}
                    onChange={(e) => handlePrisonerDetailsChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Police Custody">Police Custody</option>
                    <option value="Judicial Custody">Judicial Custody</option>
                  </select>
                </div>
                
                {/* Date of Arrest */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Arrest
                  </label>
                  <input
                    type="date"
                    name="dateOfArrest"
                    value={accused.prisonerDetails.dateOfArrest}
                    onChange={(e) => handlePrisonerDetailsChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Family Background */}
              <h5 className="text-sm font-medium mb-2">Family Background</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pl-2">
                {/* Father's Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="familyBackground.fatherName"
                    value={accused.prisonerDetails.familyBackground.fatherName}
                    onChange={(e) => handlePrisonerDetailsChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Mother's Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    name="familyBackground.motherName"
                    value={accused.prisonerDetails.familyBackground.motherName}
                    onChange={(e) => handlePrisonerDetailsChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Marital Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marital Status
                  </label>
                  <select
                    name="familyBackground.maritalStatus"
                    value={accused.prisonerDetails.familyBackground.maritalStatus}
                    onChange={(e) => handlePrisonerDetailsChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
              
              {/* Past Records */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-sm font-medium">Past Criminal Records</h5>
                  <button
                    type="button"
                    onClick={() => addPastRecord(index)}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-xs"
                  >
                    + Add Record
                  </button>
                </div>
                
                {accused.prisonerDetails.pastRecords && accused.prisonerDetails.pastRecords.map((record, recordIndex) => (
                  <div key={recordIndex} className="mb-3 p-3 border rounded bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <h6 className="text-sm font-medium">Record #{recordIndex + 1}</h6>
                      <button
                        type="button"
                        onClick={() => removePastRecord(index, recordIndex)}
                        className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-xs"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Case Description
                        </label>
                        <input
                          type="text"
                          value={record.caseDescription}
                          onChange={(e) => updatePastRecord(index, recordIndex, 'caseDescription', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <input
                          type="text"
                          value={record.status}
                          onChange={(e) => updatePastRecord(index, recordIndex, 'status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Court Name
                        </label>
                        <input
                          type="text"
                          value={record.courtName}
                          onChange={(e) => updatePastRecord(index, recordIndex, 'courtName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Sentence Duration
                        </label>
                        <input
                          type="text"
                          value={record.sentenceDuration}
                          onChange={(e) => updatePastRecord(index, recordIndex, 'sentenceDuration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccusedForm;