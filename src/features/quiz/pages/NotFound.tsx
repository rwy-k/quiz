import React, { useCallback } from 'react';
import { PagePaths } from '../../../shared/types';
interface NotFoundProps {
    navigate: (path: PagePaths | `${PagePaths}/${string}`) => void;
}
const NotFound: React.FC<NotFoundProps> = ({ navigate }) => {
    const handleGoToQuiz = useCallback(() => {
        navigate(PagePaths.QUIZ);
    }, [navigate]);
    return (
        <div className="flex justify-center flex-col items-center h-screen w-screen text-2xl font-bold text-blue-500">
            <h1>404 - Page Not Found</h1>
            <button onClick={handleGoToQuiz} className="bg-blue-500 text-white p-2 rounded-md mt-4">
                Go to quiz
            </button>
        </div>
    );
};

export default NotFound;
