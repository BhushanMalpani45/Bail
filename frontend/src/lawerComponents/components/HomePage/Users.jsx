import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from "../../../stores"
import LoginModal from '../../../Pages/LoginModal';

const InfoSections = ({ id }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [apiEndPoint, setApiEndPoint] = useState('');
  const [navi, setNavi] = useState('');

  const handleClick = (value, apiEndPoint, navi) => {
    setModalContent(value);
    setShowLoginModal(true);
    setApiEndPoint(apiEndPoint);
    setNavi(navi);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div>
      <div className='bg-slate-100 flex justify-center py-5 text-4xl font-bold'>
        <h1>Our Services</h1>
      </div>
      <div id={id} className="flex space-x-4 p- bg-slate-100 px-16">
        <Card
          img="https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg?t=st=1724425136~exp=1724428736~hmac=5c5bc0132c7b8e515aeeb33d97d298bbd9192991d5e57ed9a7380e2e4667007f&w=740"
          name="Undertrial Prisoners"
          onClick={() => handleClick("utp", "http://localhost:3000/prisoner/login")}
        />
        <Card
          img="https://img.freepik.com/premium-vector/blue-gold-sign-that-says-symbol-justice_1205884-833.jpg?w=740"
          name="Lawyers"
          onClick={() => handleClick("Lawyer", "http://localhost:3000/lawyer/login")}
        />
        <Card
          img="https://img.freepik.com/free-photo/closeup-gavel-judgement-concept_53876-31913.jpg?uid=R91335437&ga=GA1.1.651042858.1721845919&semt=ais_hybrid"
          name="Judges"
          onClick={() => handleClick("Judge", "http://localhost:3000/judge/login")}
        />
      </div>

      {showLoginModal && (
        <LoginModal
          title={`${modalContent} Login`}
          onClose={handleCloseModal}
          apiEndPoint={apiEndPoint}
          navi={`${modalContent}/`}
        />
      )}
    </div>
  );
};

const Card = ({ img, name, onClick }) => {
  return (
    <div
      className="flex-1 bg-[#03346E] text-white flex flex-col items-center justify-center h-96 transition duration-300 ease-in-out hover:scale-105 rounded-xl cursor-pointer"
      onClick={onClick}
    >
      <img
        src={img}
        alt={name}
        className="w-40 h-auto max-w-sm mb-6 rounded-lg"
      />
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="mb-6">You can login from here</p>
      <button
        className="bg-white text-[#2B4C65] py-2 px-4 rounded-full font-bold hover:bg-[#1c3449] hover:text-white"
      >
        {name}'s Login
      </button>
    </div>
  );
};



export default InfoSections;
