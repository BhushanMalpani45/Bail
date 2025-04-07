import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../LawyerComp/Sidebar';
import NotificationsPage from '../LawyerComp/NotificationsPage';
import ClientsPage from '../LawyerComp/ClientsPage';
import ClientDocumentsPage from '../LawyerComp/ClientDocumentsPage';
import ClientMeetingsPage from '../LawyerComp/ClientMeetingsPage';
import DocumentUploadPage from '../LawyerComp/DocumentUploadPage';
import CourtAppearancesPage from '../LawyerComp/CourtAppearancesPage';
import ProfileBox from '../LawyerComp/ProfileBox';
import PrecedentsUsedPage from '../LawyerComp/Precedents'; // Import new component
import CasesPage from '../LawyerComp/Cases'; // Import new component

function LawyerDashboard() {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 relative lg:pl-64">
        {/* Profile Box */}
        <ProfileBox
          showProfile={showProfile}
          onProfileClick={handleProfileClick}
          onCloseProfile={handleCloseProfile}
        />

        {/* Dynamic Content Below Profile Box */}
        <Routes>
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/client-documents" element={<ClientDocumentsPage />} />
          <Route path="/client-meetings" element={<ClientMeetingsPage />} />
          <Route path="/document-upload" element={<DocumentUploadPage />} />
          <Route path="/court-appearances" element={<CourtAppearancesPage />} />
          <Route path="/precedents-used" element={<PrecedentsUsedPage />} /> {/* New Route */}
          <Route path="/cases" element={<CasesPage />} /> {/* New Route */}
          <Route path="/" element={<NotificationsPage />} /> {/* Default route */}
        </Routes>
      </div>
    </div>
  );
}

export default LawyerDashboard;
