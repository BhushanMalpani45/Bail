import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import JudgeSidebar from '../../../JudgeComp/JudgeSidebar';
import CaseOverviewPage from '../../../JudgeComp/CasesPage';
import HearingSchedulePage from '../../../JudgeComp/HearingSchedulePage';
import NotificationsPage from '../../../JudgeComp/NotificationsPage';
import ProfileBox from '../LawyerComp/ProfileBox'; // Import ProfileBox

const JudgeDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <div className="flex h-screen">
      <JudgeSidebar onProfileClick={handleProfileClick} /> {/* Sidebar */}
      <div className="flex-1 p-6 relative">
        <ProfileBox
          showProfile={showProfile}
          onCloseProfile={handleCloseProfile}
        />
        <div className="mt-5"> {/* Margin added to move content below ProfileBox */}
          <Routes>
            <Route path="/case-overview" element={<CaseOverviewPage />} />
            <Route path="/hearing-schedule" element={<HearingSchedulePage />} />
            {/* <Route path="/document-review" element={<DocumentReviewPage />} /> */}
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/" element={<CaseOverviewPage />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default JudgeDashboard;
