import { Navigate, createBrowserRouter } from 'react-router-dom';
import QuizPage from './features/quiz/pages/QuizPage';

export const router = createBrowserRouter([
    {
        path: '/quiz/:id',
        element: <QuizPage />,
    },
    {
        path: '/quiz',
        element: <QuizPage />,
    },
    {
        path: '/',
        element: <Navigate to="/quiz/1" />,
    },
]);