import React, { useCallback } from 'react';
import EmailForm from '../components/EmailForm';
import { PagePaths } from '../../../shared/types';
interface EmailPageProps {
    navigate: (path: PagePaths | `${PagePaths}/${string}`) => void;
}
const EmailPage: React.FC<EmailPageProps> = ({ navigate }) => {
    const handleSubmit = useCallback(
        (email: string) => {
            window.localStorage.setItem('email', email);
            navigate(PagePaths.SUBMITTED);
        },
        [navigate]
    );
    const email = window.localStorage.getItem('email') || '';
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <EmailForm email={email} onSubmit={handleSubmit} />
        </div>
    );
};

export default EmailPage;
