import React from 'react';
import QuizCard from '../components/QuizCard';
import { store } from '../store';

const QuizPage: React.FC = () => {
    const currentQuiz = store.getState().currentQuiz;
    return (
        <div>
            <QuizCard question={currentQuiz?.question || ''} options={currentQuiz?.options || []} correctAnswer={currentQuiz?.correctAnswer || ''} />
        </div>
    )
}

export default QuizPage