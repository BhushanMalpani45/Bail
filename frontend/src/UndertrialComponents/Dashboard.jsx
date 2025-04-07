// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationAssistance from '../Pages/ApplicationAss';
import BailEligibility from '../Pages/BailEligibility';
import BailOptions from '../Pages/BailOptions';
import CaseDetails from '../Pages/CaseDetails';
import ChooseLawyer from '../Pages/ChooseALawyer';
import LegalResources from '../Pages/LegalResources';
import NotificationCenter from '../Pages/Notifications';
import ProfileBox from './ProfileBox'; // Import ProfileBox
import Sidebar from './Sidebar'; // Import the updated Sidebar component
import PrisonerFaceRecognition from '../Pages/PrisonerFaceRecognition';
import DocumentUpload from '../Pages/DocumentUpload';
import LegalQuery from '../Pages/LegalQuery';
import axios from 'axios';
import BailBuddy from './BailBuddy';
import ChooseNgo from '../Pages/ChooseANgo';
const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('BailEligibility');
  const [showProfile, setShowProfile] = useState(false); // State for profile visibility
  const navigate = useNavigate();
  const token=localStorage.getItem('token')
  if(!token) navigate('/')
  useEffect(()=>{
    const verify=async()=>{ 
      const response = await axios.post(`http://127.0.0.1:3000/prisoner/verifyToken`, {
        credentials:true
      });
      console.log(response)
      if(response.data.err){
        localStorage.removeItem('token')
        navigate('/')
      }
    }
      verify()
  })
  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleNavigation = (path) => {
    setActiveComponent(path);
    navigate(`${path.toLowerCase()}`);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'BailEligibility':
        return <BailEligibility />;
      case 'CaseDetails':
        return <CaseDetails />;
      case 'BailOptions':
        return <BailOptions />;
      case 'ApplicationAssistance':
        return <ApplicationAssistance />;
      case 'NotificationCenter':
        return <NotificationCenter />;
      case 'Documents':
        return <DocumentUpload />;
      case 'LegalResources':
        return <LegalResources />;
      case 'PrisonerFaceRecognition':
        return <PrisonerFaceRecognition />;
      case 'ChooseLawyer':
        return <ChooseLawyer />;
      case 'ChooseNgo':
        return <ChooseNgo />;
      case 'LegalQuery':
        return <LegalQuery />;
      case 'BailBuddy':
        return <BailBuddy />;
      default:
        return <BailEligibility />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar handleNavigation={handleNavigation} activeComponent={activeComponent} />

      {/* Main Content */}
      <div className="flex-1 p-8 lg:ml-64 lg:pl-8"> {/* Adjusted margin to prevent overlap */}
        {/* Profile and Welcome Box */}
        <ProfileBox
          showProfile={showProfile}
          onProfileClick={handleProfileClick}
          onCloseProfile={handleCloseProfile}
        />
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
