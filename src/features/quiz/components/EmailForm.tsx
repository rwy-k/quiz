import React, { useCallback, useMemo, useState } from 'react';

interface EmailFormProps {
    email: string;
    onSubmit: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ email, onSubmit }) => {
    const [emailInput, setEmailInput] = useState<string>(email);
    const isEmailValid = useMemo(() => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    }, [emailInput]);
    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit(emailInput);
        },
        [emailInput, onSubmit]
    );
    return (
        <div className="bg-white p-4 rounded-lg shadow-md animate-fade-in">
            <h2 className="text-2xl font-bold">Enter your email to get the quiz</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md"
                />
                <button
                    type="submit"
                    disabled={!emailInput || !isEmailValid}
                    className="bg-blue-500 text-white p-2 rounded-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EmailForm;
