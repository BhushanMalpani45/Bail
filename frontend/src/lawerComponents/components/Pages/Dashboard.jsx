import React, { useState } from 'react';
import ApplicationAssistance from './ApplicationAss';
import BailEligibility from './BailEligibility';
import BailOptions from './BailOptions';
import CaseDetails from './CaseDetails';
import ChooseLawyer from './ChooseALawyer';
import LegalResources from './LegalResources';
import NotificationCenter from './Notifications';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('BailEligibility');

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
      case 'LegalResources':
        return <LegalResources />;
      case 'ChooseLawyer':
        return <ChooseLawyer />;
      default:
        return <BailEligibility />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Sidebar */}
      <div className="lg:w-64 w-full bg-primary text-white lg:flex lg:flex-col lg:justify-between lg:fixed lg:h-screen lg:top-0 lg:left-0 lg:p-6">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">Dashboard</h2>
          <ul>
            {['BailEligibility', 'CaseDetails', 'BailOptions', 'ApplicationAssistance', 'NotificationCenter', 'LegalResources', 'ChooseLawyer'].map((item) => (
              <li
                key={item}
                className={`cursor-pointer mb-4 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-white hover:text-primary ${activeComponent === item ? 'bg-white text-primary font-semibold' : ''}`}
                onClick={() => setActiveComponent(item)}
              >
                {item.replace(/([A-Z])/g, ' $1').trim()}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden flex justify-center p-4">
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition duration-300">Menu</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:ml-64">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
