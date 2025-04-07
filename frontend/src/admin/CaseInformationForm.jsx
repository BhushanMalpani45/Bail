import React, { useState } from 'react';

const CaseInformationForm = ({ data, updateData }) => {
  const [formState, setFormState] = useState(data);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormState({
        ...formState,
        [parent]: {
          ...formState[parent],
          [child]: value
        }
      });
    } else {
      setFormState({
        ...formState,
        [name]: value
      });
    }
    
    // Update parent component
    updateData({
      ...formState,
      [name]: value
    });
  };
  
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
    updateData({
      ...formState,
      [name]: value
    });
  };
  
  // Handle sections array
  const addSection = () => {
    const updatedSections = [...formState.sections, { actName: '', sectionNumbers: [''] }];
    setFormState({
      ...formState,
      sections: updatedSections
    });
    updateData({
      ...formState,
      sections: updatedSections
    });
  };
  
  const removeSection = (index) => {
    const updatedSections = [...formState.sections];
    updatedSections.splice(index, 1);
    setFormState({
      ...formState,
      sections: updatedSections
    });
    updateData({
      ...formState,
      sections: updatedSections
    });
  };
  
  const updateSection = (index, field, value) => {
    const updatedSections = [...formState.sections];
    updatedSections[index][field] = value;
    setFormState({
      ...formState,
      sections: updatedSections
    });
    updateData({
      ...formState,
      sections: updatedSections
    });
  };
  
  const addSectionNumber = (sectionIndex) => {
    const updatedSections = [...formState.sections];
    updatedSections[sectionIndex].sectionNumbers.push('');
    setFormState({
      ...formState,
      sections: updatedSections
    });
    updateData({
      ...formState,
      sections: updatedSections
    });
  };
  
  const removeSectionNumber = (sectionIndex, numberIndex) => {
    const updatedSections = [...formState.sections];
    updatedSections[sectionIndex].sectionNumbers.splice(numberIndex, 1);
    setFormState({
      ...formState,
      sections: updatedSections
    });
    updateData({
      ...formState,
      sections: updatedSections
    });
  };
  
  const updateSectionNumber = (sectionIndex, numberIndex, value) => {
    const updatedSections = [...formState.sections];
    updatedSections[sectionIndex].sectionNumbers[numberIndex] = value;
    setFormState({
      ...formState,
      sections: updatedSections
    });
    updateData({
      ...formState,
      sections: updatedSections
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Case Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Case ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Case ID*
          </label>
          <input
            type="text"
            name="caseId"
            value={formState.caseId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* FIR Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            FIR Number*
          </label>
          <input
            type="text"
            name="firNumber"
            value={formState.firNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crime Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crime Title*
          </label>
          <input
            type="text"
            name="crimeTitle"
            value={formState.crimeTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Case Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Case Type*
          </label>
          <select
            name="caseType"
            value={formState.caseType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Case Type</option>
            <option value="Criminal">Criminal</option>
            <option value="Civil">Civil</option>
            <option value="Juvenile">Juvenile</option>
            <option value="POCSO">POCSO</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      {/* Crime Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Crime Description*
        </label>
        <textarea
          name="crimeDescription"
          value={formState.crimeDescription}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crime Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crime Date*
          </label>
          <input
            type="date"
            name="crimeDate"
            value={formState.crimeDate}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Crime Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crime Time*
          </label>
          <input
            type="time"
            name="crimeTime"
            value={formState.crimeTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FIR Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            FIR Date*
          </label>
          <input
            type="date"
            name="firDate"
            value={formState.firDate}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Case Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Case Status*
          </label>
          <select
            name="caseStatus"
            value={formState.caseStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Investigation">Investigation</option>
            <option value="Chargesheet Filed">Chargesheet Filed</option>
            <option value="Under Trial">Under Trial</option>
            <option value="Judgment Delivered">Judgment Delivered</option>
            <option value="Appeal">Appeal</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
      
      {/* Crime Location */}
      <div className="border p-4 rounded-md bg-gray-50">
        <h3 className="text-lg font-medium mb-3">Crime Location</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address*
            </label>
            <input
              type="text"
              name="crimeLocation.address"
              value={formState.crimeLocation.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Police Station */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Police Station*
            </label>
            <input
              type="text"
              name="crimeLocation.policeStation"
              value={formState.crimeLocation.policeStation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District*
            </label>
            <input
              type="text"
              name="crimeLocation.district"
              value={formState.crimeLocation.district}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State*
            </label>
            <input
              type="text"
              name="crimeLocation.state"
              value={formState.crimeLocation.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <input
              type="text"
              name="crimeLocation.pincode"
              value={formState.crimeLocation.pincode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      {/* Sections */}
      <div className="border p-4 rounded-md bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Sections Applied</h3>
          <button
            type="button"
            onClick={addSection}
            className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm"
          >
            + Add Section
          </button>
        </div>
        
        {formState.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-3 p-3 border rounded bg-white">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-md font-medium">Section {sectionIndex + 1}</h4>
              {formState.sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md text-xs"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              {/* Act Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Act Name*
                </label>
                <input
                  type="text"
                  value={section.actName}
                  onChange={(e) => updateSection(sectionIndex, 'actName', e.target.value)}
                  placeholder="e.g., IPC, NDPS Act"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            {/* Section Numbers */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Section Numbers*
                </label>
                <button
                  type="button"
                  onClick={() => addSectionNumber(sectionIndex)}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-xs"
                >
                  + Add Number
                </button>
              </div>
              
              {section.sectionNumbers.map((number, numberIndex) => (
                <div key={numberIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => updateSectionNumber(sectionIndex, numberIndex, e.target.value)}
                    placeholder="e.g., 302, 34"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {section.sectionNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSectionNumber(sectionIndex, numberIndex)}
                      className="ml-2 px-2 py-1 bg-gray-300 text-gray-700 rounded-md text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Police Report */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Police Report
          </label>
          <textarea
            name="policeReport"
            value={formState.policeReport}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>
        
        {/* Previous Court Actions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Previous Court Actions
          </label>
          <textarea
            name="previousCourtActions"
            value={formState.previousCourtActions}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>
      </div>
    </div>
  );
};

export default CaseInformationForm;