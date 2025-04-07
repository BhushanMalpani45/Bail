import React, { useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import useUserStore from '../stores';
import axios from 'axios';
const LoginModal = ({ title, onClose, apiEndPoint, navi }) => {
    const navigate = useNavigate();
    const setUserData = useUserStore((state) => state.setUserData);
  
    const [email_id, setEmail_id] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLogin = async (event) => {
      event.preventDefault();
      setErrorMessage('');
  
      try {
        const response = await axios.post(apiEndPoint, {
          email_id,
          password,
        }, {
          withCredentials: true
        });
        console.log("her")
        console.log(response)
        console.log(apiEndPoint)
  
        if (response.data.status_code === 200) {
          const userData = response; // Adjust based on your response
          setUserData(userData); // Update Zustand store
          // console.log("her")
          console.log(userData)
          console.log(title)
          if(title=="utp Login"){
            const utp = response.data.data.undertrial._id; 
            console.log(utp)
    
            if (utp) {
              localStorage.setItem('id', utp);
              localStorage.setItem('name', response.data.data.undertrial.name);
            }
  
          }
          if(title=="Lawyer Login"){
  
            const lawyerId = response.data.data.lawyer._id; 
            console.log(lawyerId)
    
            if (lawyerId) {
              localStorage.setItem('id', lawyerId);
              localStorage.setItem('name', response.data.data.lawyer.name);

            }
          }
          if(title=="Judge Login"){
            const Id = response.data.data.judge._id; 
            console.log(Id)
    
            if (Id) {
              localStorage.setItem('id', Id);
              localStorage.setItem('name', response.data.data.judge.name);
            }
  
          }
          if(title=="Visitor Login"){
            const Id = response.data.data.user._id; 
            console.log(Id)
    
            if (Id) {
              localStorage.setItem('id', Id);
              localStorage.setItem('name', response.data.data.user.name);
            }
          }
          localStorage.setItem('token', response.data.data.token);
          alert('Login successful!');
          onClose();
          navigate(navi);
        } else {
          setErrorMessage('Invalid username or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrorMessage('An error occurred during login');
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <label className="flex flex-col">
              <span className="font-semibold">Username:</span>
              <input
                type="text"
                value={email_id}
                onChange={(e) => setEmail_id(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="font-semibold">Password:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-[#03346E] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#1f5291] transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

export default LoginModal