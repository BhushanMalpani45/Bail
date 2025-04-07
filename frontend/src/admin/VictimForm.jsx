import React, { useState } from "react";

const VictimsForm = ({ data, updateData }) => {
  const [victimsList, setVictimsList] = useState(data);
  const [activeVictimIndex, setActiveVictimIndex] = useState(0);

  const addVictim = () => {
    const newVictim = {
      name: "",
      gender: "",
      age: "",
      address: "",
      contactDetails: {
        phone: "",
        email: "",
      },
      injuries: "",
      statement: "",
      isMinor: false,
      guardianDetails: {
        name: "",
        relationship: "",
        contactNumber: "",
      },
      confidentialityRequired: false,
    };

    const updatedList = [...victimsList, newVictim];
    setVictimsList(updatedList);
    updateData(updatedList);
    setActiveVictimIndex(updatedList.length - 1);
  };

  const removeVictim = (index) => {
    if (victimsList.length === 1) {
      return; // Keep at least one victim
    }

    const updatedList = [...victimsList];
    updatedList.splice(index, 1);
    setVictimsList(updatedList);
    updateData(updatedList);

    // Update active index if needed
    if (activeVictimIndex >= updatedList.length) {
      setActiveVictimIndex(updatedList.length - 1);
    }
  };

  const handleVictimChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedList = [...victimsList];

    const val = type === "checkbox" ? checked : value;

    // Handle nested fields
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      updatedList[index] = {
        ...updatedList[index],
        [parent]: {
          ...updatedList[index][parent],
          [child]: val,
        },
      };
    } else {
      updatedList[index] = {
        ...updatedList[index],
        [name]: val,
      };
    }

    setVictimsList(updatedList);
    updateData(updatedList);
  };

  const handleGuardianDetailsChange = (e, index) => {
    const { name, value } = e.target;
    const updatedList = [...victimsList];

    updatedList[index].guardianDetails = {
      ...updatedList[index].guardianDetails,
      [name]: value,
    };

    setVictimsList(updatedList);
    updateData(updatedList);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Victim Details</h2>

      {/* Victim Tabs */}
      <div className="flex flex-wrap items-center border-b border-gray-200">
        {victimsList.map((victim, index) => (
          <button
            key={index}
            type="button"
            className={`mr-2 py-2 px-4 text-sm font-medium focus:outline-none ${
              activeVictimIndex === index
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveVictimIndex(index)}
          >
            {victim.name ? victim.name : `Victim ${index + 1}`}
          </button>
        ))}
        <button
          type="button"
          onClick={addVictim}
          className="ml-2 py-1 px-3 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200"
        >
          + Add Victim
        </button>
      </div>

      {/* Active Victim Form */}
      {victimsList.map((victim, index) => (
        <div
          key={index}
          className={activeVictimIndex === index ? "" : "hidden"}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Victim #{index + 1} Details</h3>
            {victimsList.length > 1 && (
              <button
                type="button"
                onClick={() => removeVictim(index)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200"
              >
                Remove Victim
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
                value={victim.name}
                onChange={(e) => handleVictimChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Is Minor Checkbox */}
            <div className="flex items-start pt-6">
              <div className="flex items-center h-5">
                <input
                  id={`victim-minor-${index}`}
                  name="isMinor"
                  type="checkbox"
                  checked={victim.isMinor}
                  onChange={(e) => handleVictimChange(e, index)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={`victim-minor-${index}`}
                  className="font-medium text-gray-700"
                >
                  Is Minor
                </label>
                <p className="text-gray-500">
                  Check if victim is under 18 years of age
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={victim.gender}
                onChange={(e) => handleVictimChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Age
              </label>
              <input
                type="number"
                name="age"
                value={victim.age}
                onChange={(e) => handleVictimChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confidentiality Required */}
            <div className="flex items-start pt-6">
              <div className="flex items-center h-5">
                <input
                  id={`victim-confidential-${index}`}
                  name="confidentialityRequired"
                  type="checkbox"
                  checked={victim.confidentialityRequired}
                  onChange={(e) => handleVictimChange(e, index)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={`victim-confidential-${index}`}
                  className="font-medium text-gray-700"
                >
                  Confidentiality Required
                </label>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address*
            </label>
            // Continuing from where your code left off
            <textarea
              name="address"
              value={victim.address}
              onChange={(e) => handleVictimChange(e, index)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
              required
            ></textarea>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="contactDetails.phone"
                value={victim.contactDetails.phone}
                onChange={(e) => handleVictimChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="contactDetails.email"
                value={victim.contactDetails.email}
                onChange={(e) => handleVictimChange(e, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Injuries */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description of Injuries (if any)
            </label>
            <textarea
              name="injuries"
              value={victim.injuries}
              onChange={(e) => handleVictimChange(e, index)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>

          {/* Statement */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Victim Statement
            </label>
            <textarea
              name="statement"
              value={victim.statement}
              onChange={(e) => handleVictimChange(e, index)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          {/* Guardian Details (conditionally shown) */}
          {victim.isMinor && (
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-md font-medium mb-3">Guardian Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={victim.guardianDetails.name}
                    onChange={(e) => handleGuardianDetailsChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={victim.isMinor}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship to Victim*
                  </label>
                  <input
                    type="text"
                    name="relationship"
                    value={victim.guardianDetails.relationship}
                    onChange={(e) => handleGuardianDetailsChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={victim.isMinor}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number*
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={victim.guardianDetails.contactNumber}
                    onChange={(e) => handleGuardianDetailsChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={victim.isMinor}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VictimsForm;
