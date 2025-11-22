import React, { useState } from 'react';

interface EmailFormProps {
    onSubmit: (email: string) => void
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(email);
    }
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Enter your email to get the quiz</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
            </form>
        </div>
    )
}

export default EmailForm