import React, { useCallback, useEffect } from 'react';
import QuizCard from '../components/QuizCard';
import { setQuizzesAnswers, store } from '../store';
import { useNavigate, useParams } from 'react-router-dom';

const QuizPage: React.FC = () => {
    const currentQuizId = useParams().id;
    const navigate = useNavigate();
    const quizzes = store.getState().quizzes;
    const currentQuiz = currentQuizId ? quizzes.find((quiz) => quiz.id === currentQuizId) : null;
    const isLastQuiz = currentQuizId === quizzes.length.toString();

    const currentQuizAnswer = store.getState().quizzesAnswers.find((quiz) => quiz.id === currentQuizId)?.answer;

    const handleSubmit = useCallback(
        (selectedOption: string) => {
            const state = store.getState();
            const quizId = currentQuizId;
            const currentQuizData = quizId ? state.quizzes.find((quiz) => quiz.id === quizId) : null;
            if (!currentQuizData) {
                console.error('Quiz not found for ID:', quizId);
                return;
            }
            store.dispatch(
                setQuizzesAnswers([
                    ...state.quizzesAnswers.filter((quiz) => quiz.id !== currentQuizData.id),
                    {
                        id: currentQuizData.id,
                        answer: selectedOption,
                    },
                ])
            );
        },
        [currentQuizId, isLastQuiz, navigate]
    );

    const handleNext = useCallback(() => {
        if (isLastQuiz) {
            navigate('/email');
        } else {
            navigate(`/quiz/${parseInt(currentQuizId!) + 1}`);
        }
    }, [currentQuizId, isLastQuiz, navigate]);

    useEffect(() => {
        if (currentQuizId) {
            const currentQuizData = quizzes.find((quiz) => quiz.id === currentQuizId);
            if (!currentQuizData) {
                navigate('/not-found');
            }
        }
    }, [currentQuizId, navigate, quizzes]);

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="text-2xl font-bold text-center my-4 text-blue-500">Quiz</h1>
            {currentQuiz && (
                <QuizCard
                    key={currentQuizId}
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
