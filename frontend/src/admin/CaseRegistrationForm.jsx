import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Components for form
import CaseInformationForm from './CaseInformationForm';
import AccusedForm from './AccusedForm';
import VictimsForm from './VictimForm';
import EvidenceForm from './EvidenceForm';
import SubmitSuccess from './SubmitSuccess';

const CaseRegistrationForm = () => {
  // Track form step
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    caseInformation: {
      caseId: '',
      crimeTitle: '',
      crimeDescription: '',
      crimeDate: '',
      crimeTime: '',
      crimeLocation: {
        address: '',
        district: '',
        state: '',
        pincode: '',
        policeStation: ''
      },
      firNumber: '',
      firDate: '',
      sections: [{ actName: '', sectionNumbers: [''] }],
      caseType: '',
      caseStatus: 'Investigation',
      policeReport: '',
      previousCourtActions: ''
    },
    partiesInvolved: {
      accused: [{
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
      }],
      victims: [{
        name: '',
        gender: '',
        age: '',
        address: '',
        contactDetails: {
          phone: '',
          email: ''
        },
        injuries: '',
        statement: '',
        isMinor: false,
        guardianDetails: {
          name: '',
          relationship: '',
          contactNumber: ''
        },
        confidentialityRequired: false
      }]
    },
    evidenceDocumentation: {
      physicalEvidence: [],
      documentaryEvidence: [],
      digitalEvidence: [],
      statements: [],
      medicalReports: [],
      firCopy: {
        stationFileNumber: '',
        filedBy: '',
        officerInCharge: ''
      },
      attachments: []
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle data updates from child components
  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Handle next step
  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 5));
  };

  // Handle previous step
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await axios.post('/api/cases', formData);
      
      if (response.status === 201) {
        setIsSuccess(true);
        setStep(5);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit case information');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render different form sections based on current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CaseInformationForm 
            data={formData.caseInformation} 
            updateData={(data) => updateFormData('caseInformation', data)} 
          />
        );
      case 2:
        return (
          <AccusedForm 
            data={formData.partiesInvolved.accused} 
            updateData={(data) => updateFormData('partiesInvolved', {
              ...formData.partiesInvolved,
              accused: data
            })} 
          />
        );
      case 3:
        return (
          <VictimsForm 
            data={formData.partiesInvolved.victims} 
            updateData={(data) => updateFormData('partiesInvolved', {
              ...formData.partiesInvolved,
              victims: data
            })} 
          />
        );
      case 4:
        return (
          <EvidenceForm 
            data={formData.evidenceDocumentation} 
            updateData={(data) => updateFormData('evidenceDocumentation', data)} 
          />
        );
      case 5:
        return <SubmitSuccess />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">Case Registration Form</h1>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {['Case Information', 'Accused Details', 'Victim Details', 'Evidence Documentation', 'Submit'].map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step > index + 1 ? 'bg-green-500' : step === index + 1 ? 'bg-blue-500' : 'bg-gray-300'} text-white font-semibold`}>
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span className={`text-xs mt-1 ${step === index + 1 ? 'font-semibold' : ''}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-width duration-300 ease-in-out" 
            style={{ width: `${(step - 1) * 25}%` }}
          ></div>
        </div>
      </div>
      
      {/* Form content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {renderStep()}
        
        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {/* Navigation buttons */}
        {step < 5 && (
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-auto flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseRegistrationForm;