import React from 'react';
import EmailForm from '../components/EmailForm';
import { store, setEmail } from '../store';
import { useNavigate } from 'react-router-dom';

const EmailPage: React.FC = () => {
    const navigate = useNavigate();
    const handleSubmit = (email: string) => {
        store.dispatch(setEmail(email));
        navigate('/submitted');
    };
    const email = store.getState().email;
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <EmailForm email={email} onSubmit={handleSubmit} />
        </div>
    );
};

export default EmailPage;
