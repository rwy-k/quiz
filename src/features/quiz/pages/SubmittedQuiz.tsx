import React from 'react';
import SubmittedCard from '../components/SubmittedCard';
import { hydrateFromDB, store } from '../store';
import { useNavigate } from 'react-router-dom';
const SubmittedQuiz: React.FC = () => {
    const email = store.getState().email;
    const quizzes = store.getState().quizzes;
    const score = store
        .getState()
        .quizzesAnswers.filter((quiz) => quiz.answer === quizzes.find((q) => q.id === quiz.id)?.correctAnswer).length;
    const quizzesAnswers = store.getState().quizzesAnswers;
    const navigate = useNavigate();
    const clearQuizzesAnswers = () => {
        localStorage.removeItem('email');
        store.dispatch(hydrateFromDB({ quizzesAnswers: [] }));
        navigate('/');
    };
    return (
        <div className="flex justify-center flex-col gap-4 items-center h-screen w-screen">
            <h1 className="text-2xl font-bold text-center my-4 text-blue-500">Submitted Quiz</h1>
            <SubmittedCard
                email={email}
                score={score}
                quizzesAnswers={quizzesAnswers}
                quizzes={quizzes}
                onClick={clearQuizzesAnswers}
            />
        </div>
    );
};

export default SubmittedQuiz;
