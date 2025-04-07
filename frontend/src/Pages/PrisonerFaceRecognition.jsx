import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const PrisonerFaceRecognition = () => {
    const [loading, setLoading] = useState(false);
    const handleButtonClick = async () => {
        setLoading(true);


        // location 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const response = await axios.post(
                            'http://localhost:3000/face/face-recogntion',
                            { latitude, longitude },
                            {
                                withCredentials: true,
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }
                        );

                        if (response.data.success) {
                            toast.success('Attendance marked successfully!');
                        } else {
                            toast.error('Failed to mark attendance.');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        toast.error('An error occurred while marking attendance.');
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                    toast.error('Failed to retrieve location.');
                    setLoading(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            toast.error('Geolocation is not supported by your browser.');
            setLoading(false);
        }
    };
    return (
        <>
            <div>
                <button
                    onClick={handleButtonClick}
                    disabled={loading}
                    style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                    {loading ? 'Processing...' : 'Capture Face'}
                </button>
            </div>
        </>
    )
}

export default PrisonerFaceRecognition
