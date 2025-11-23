import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center flex-col items-center h-screen w-screen text-2xl font-bold text-blue-500">
            <h1>404 - Page Not Found</h1>
            <button onClick={() => navigate('/')} className="bg-blue-500 text-white p-2 rounded-md mt-4">
                Go to quiz
            </button>
        </div>
    );
};

export default NotFound;
