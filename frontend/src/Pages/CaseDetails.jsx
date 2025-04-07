import React, { useEffect, useState } from 'react';
// import caseDetail from "../../public/data/CaseDetail.json";
import axios from 'axios';
const CaseDetail = () => {
  const [caseDetail, setCaseDetail]=useState([])
  console.log('yay')
  useEffect(()=>{
    const fetchCases=async()=>{
      const prisonerId=localStorage.getItem('id')
      // console.log(id)
      const response = await axios.post('http://localhost:3000/prisoner/caseDetailsByPrisonerId', { prisonerId }, {
        withCredentials: true
      });
      console.log(response)
      setCaseDetail(response.data.data)
    }
    console.log('yayay')
    fetchCases()
  },[])
  return (
    <>
      {caseDetail.length!=0 && 
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border-2 border-[#03346E] p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">

        <h2 className="text-3xl font-bold text-[#1E40AF] mb-6">Case Details</h2>
      <div className='flex justify-between'>

      <p className="text-[#1E40AF] text-lg mb-4">
        <strong className="font-semibold">Case ID:</strong> {caseDetail.caseId}
      </p>
      <p className="text-[#1E40AF] text-lg mb-4">
        <strong className="font-semibold">Date FIled:</strong> {caseDetail.dateFiled.substr(0,10)}
      </p>

      </div>
      <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-4">Case Details:</h3>
      <ul className="list-disc list-inside mb-6 text-[rgb(30,64,175)]">
        {/* {caseDetail.length>0 && caseDetail.caseDetails.map((caseDetail, index) => ( */}
          <li  className="mb-3 bg-gray-100 p-4 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105">
            <strong className="font-semibold">{caseDetail.title}:</strong> {caseDetail.description}
            <br />
            <em className="text-sm text-gray-600">Penalty:</em> {caseDetail.sentenceDetails.duration}
          </li>
        {/* ))} */}
      </ul>

      <p className="text-[#1E40AF] text-2xl mb-4">
        <strong className="font-semibold">Imprisonment Duration:</strong> {caseDetail.sentenceDetails.duration}
      </p>
      <p className="text-[#1E40AF] text-2xl mb-4">
        <strong className="font-semibold">Court:</strong> {caseDetail.courtName}
      </p>
      <p className="text-[#1E40AF] text-2xl">
        <strong className="font-semibold">Hearing Dates:</strong> 
      </p>
      <ul className='pl-5'>
        {caseDetail.hearingDates.map(date=><li className='text-[#1E40AF] text-lg  list-disc p'>{date.date.substr(0,10)}</li>)}
      </ul>
      <p className="text-[#1E40AF] text-2xl mb-6 mt-4">
        <strong className="font-semibold">Judge:</strong> {caseDetail.judge.name}
      </p>

      <h3 className="text-2xl font-semibold text-[#1E40AF] mb-4  mr-1">Case Status:<span className="text-[#DC2626] text-xl ml-1 mb-6 font-semibold">

      {caseDetail.status}
      </span></h3>

      

      {caseDetail.lawyer && <>
      <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-4">Lawyer: {caseDetail.lawyer}</h3>
      <p className="text-[#1E40AF] text-lg">
        <strong className="font-semibold">Name:</strong> {caseDetail.lawyer.name} <br />
        <strong className="font-semibold">Contact:</strong> {caseDetail.lawyer.contact}
      </p>
      </>
      }
    </div>
      }
      </>
  );
};

export default CaseDetail;