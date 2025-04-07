// src/lawyerComponents/components/CasesPage.jsx
import React, { useEffect, useState } from 'react';
import CaseDetailModal from './CaseDetailModal';
import axios from 'axios'

const CasesPage = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cases, setCases]=useState(null)
  useEffect(()=>{
    const fetchCases=async()=>{
      const token=localStorage.getItem('id');
      const response=await axios.post("http://localhost:3000/judge/getJudgeCases", {judgeId: token})
      setCases(response.data.data)
    }
    fetchCases()
  },[])
  const handleCaseClick = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCase(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Case Overview</h2>
      <ul className="w-full max-w-3xl">
        {cases && cases.map((caseItem) => (
          <li
            key={caseItem.caseId}
            className="p-4 bg-white shadow mb-4 rounded-lg cursor-pointer"
          >
            <h3 className="font-semibold">{caseItem.caseId}-{caseItem.title}</h3>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleCaseClick(caseItem)}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>

      {isModalVisible && (
        <CaseDetailModal caseItem={selectedCase} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CasesPage;
