import React from 'react';
import EmailForm from '../components/EmailForm';
import { store, setEmail } from '../store';
import { useNavigate } from 'react-router-dom';

const EmailPage: React.FC = () => {
    const navigate = useNavigate();
    const handleSubmit = (email: string) => {
        store.dispatch(setEmail(email));
        navigate('/quiz');
    }   
    return (
        <div>
            <EmailForm onSubmit={handleSubmit} />
        </div>
    )
}

export default EmailPage