import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SubmittedCard from '../components/SubmittedCard';
import type { Quiz, QuizAnswer } from '../types';
import { loadInitialStateFromDB, saveQuizzesAnswersToDB } from '../helpers';
import { PagePaths } from '../../../shared/types';
interface SubmittedQuizProps {
    navigate: (path: PagePaths | `${PagePaths}/${string}`) => void;
}
const SubmittedQuiz: React.FC<SubmittedQuizProps> = ({ navigate }) => {
    const email = window.localStorage.getItem('email') || '';
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quizzesAnswers, setQuizzesAnswers] = useState<QuizAnswer[]>([]);
    const score = useMemo(
        () =>
            quizzesAnswers.filter((quiz) => quiz.answer === quizzes.find((q) => q.id === quiz.id)?.correctAnswer)
                .length,
        [quizzesAnswers, quizzes]
    );
    const clearQuizzesAnswers = useCallback(async () => {
        localStorage.removeItem('email');
        await saveQuizzesAnswersToDB([]);
        navigate(PagePaths.QUIZ);
    }, [navigate]);

    useEffect(() => {
        loadInitialStateFromDB().then((dbData) => {
            setQuizzes(dbData.quizzes);
            setQuizzesAnswers(dbData.quizzesAnswers);
        });
    }, []);
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
