import React from 'react';
import type { Quiz, QuizAnswer } from '../types';
interface SubmittedCardProps {
    email: string;
    score: number;
    quizzesAnswers: QuizAnswer[];
    quizzes: Quiz[];
    onClick: () => void;
}

const SubmittedCard: React.FC<SubmittedCardProps> = ({ email, score, quizzesAnswers, quizzes, onClick }) => {
    const correctAnswers = quizzesAnswers.filter(
        (quiz) => quiz.answer === quizzes.find((q) => q.id === quiz.id)?.correctAnswer
    ).length;
    const incorrectAnswers = quizzesAnswers.filter(
        (quiz) => quiz.answer !== quizzes.find((q) => q.id === quiz.id)?.correctAnswer
    ).length;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md animate-fade-in">
            <p className="text-gray-500">Email: {email}</p>
            <p className="text-gray-500">Score: {score}</p>
            <p className="text-gray-500">Total Questions: {quizzes.length}</p>
            <p className="text-gray-500">Correct Answers: {correctAnswers}</p>
            <p className="text-gray-500">Incorrect Answers: {incorrectAnswers}</p>
            <br />
            <br />
            <span>Answers:</span>
            <div className="flex flex-col gap-2">
                {quizzesAnswers.map((quiz) => (
                    <div key={quiz.id}>
                        <p>
                            <b>{quizzes.find((q) => q.id === quiz.id)?.question}</b>
                        </p>
                        <p>{quiz.answer}</p>
                    </div>
                ))}
            </div>
            <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full">
                Try one more time
            </button>
        </div>
    );
};

export default SubmittedCard;
