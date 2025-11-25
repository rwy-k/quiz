import React, { useCallback, useEffect, useState, useMemo } from 'react';
import QuizCard from '../components/QuizCard';
import { loadInitialStateFromDB, saveQuizzesAnswersToDB } from '../helpers';
import type { Quiz, QuizAnswer } from '../types';
import { PagePaths } from '../../../shared/types';
interface QuizPageProps {
    quizId: string;
    navigate: (pathname: PagePaths) => void;
    setQuizId: (quizId: string) => void;
}
const QuizPage: React.FC<QuizPageProps> = ({ quizId, navigate, setQuizId }: QuizPageProps) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quizzesAnswers, setQuizzesAnswers] = useState<QuizAnswer[]>([]);

    const currentQuiz = useMemo(() => (quizId ? quizzes.find((quiz) => quiz.id === quizId) : null), [quizId, quizzes]);
    const isLastQuiz = useMemo(() => quizId === quizzes.length.toString(), [quizId, quizzes]);
    const currentQuizAnswer = useMemo(
        () => quizzesAnswers.find((quiz) => quiz.id === quizId)?.answer,
        [quizzesAnswers, quizId]
    );

    useEffect(() => {
        loadInitialStateFromDB().then((dbData) => {
            setQuizzes(dbData.quizzes);
            setQuizzesAnswers(dbData.quizzesAnswers);
        });
    }, []);

    useEffect(() => {
        if (!quizId || (!currentQuiz && quizzes.length > 0)) {
            navigate(PagePaths.NOT_FOUND);
        }
    }, [quizId, navigate, quizzes, currentQuiz]);

    const handleSubmit = useCallback(
        async (selectedOption: string) => {
            const currentQuizData = quizId ? quizzes.find((quiz) => quiz.id === quizId) : null;
            if (!currentQuizData) {
                console.error('Quiz not found for ID:', quizId);
                return;
            }
            const updatedAnswers = [
                ...quizzesAnswers.filter((quiz) => quiz.id !== currentQuizData.id),
                {
                    id: currentQuizData.id,
                    answer: selectedOption,
                },
            ];
            await saveQuizzesAnswersToDB(updatedAnswers);
            setQuizzesAnswers(updatedAnswers);
        },
        [quizId, quizzesAnswers, quizzes]
    );

    const handleNext = useCallback(() => {
        if (isLastQuiz) {
            navigate(PagePaths.EMAIL);
        } else {
            navigate(PagePaths.QUIZ);
            setQuizId(`${parseInt(quizId) + 1}`);
        }
    }, [isLastQuiz, navigate, quizId, setQuizId]);

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="text-2xl font-bold text-center my-4 text-blue-500">Quiz</h1>
            {currentQuiz && (
                <QuizCard
                    key={quizId}
                    quiz={currentQuiz}
                    answer={currentQuizAnswer}
                    onSubmit={handleSubmit}
                    onNext={handleNext}
                />
            )}
        </div>
    );
};

export default QuizPage;
