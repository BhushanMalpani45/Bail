// src/App.jsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./UndertrialComponents/Dashboard";
import LawyerDashboard from "./lawerComponents/components/Pages/LawyerDashboard.jsx";
import Home from "./lawerComponents/components/Pages/Home.jsx";
import JudgeDashboard from "./lawerComponents/components/Pages/JudgeDashboard.jsx";
import CaseRegistrationForm from "./admin/caseRegistrationForm.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/utp/*" element={<Dashboard />} />{" "}
          <Route path="/lawyer/*" element={<LawyerDashboard />} />{" "}
          <Route path="/judge/*" element={<JudgeDashboard />} />
          <Route path="/" element={<Home />} />
          <Route path='/admin' element={<CaseRegistrationForm/>}></Route>
        </Routes>

      </Router>
    </>


  );
};

export default App;
