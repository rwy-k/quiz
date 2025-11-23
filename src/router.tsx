import { Navigate, createBrowserRouter } from 'react-router-dom';
import QuizPage from './features/quiz/pages/QuizPage';
import EmailPage from './features/quiz/pages/EmailPage';
import NotFound from './features/quiz/pages/NotFound';
import SubmittedQuiz from './features/quiz/pages/SubmittedQuiz';

export const router = createBrowserRouter([
    {
        path: '/quiz/:id',
        element: <QuizPage />,
    },
    {
        path: '/email',
        element: <EmailPage />,
    },
    {
        path: '/submitted',
        element: <SubmittedQuiz />,
    },
    {
        path: '/',
        element: <Navigate to="/quiz/1" />,
    },
    {
        path: '/*',
        element: <NotFound />,
    },
]);
