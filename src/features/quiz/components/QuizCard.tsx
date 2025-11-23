import React, { useCallback, useState } from 'react';
import type { Quiz } from '../types';

interface QuizCardProps {
    quiz: Quiz;
    answer?: string;
    onSubmit: (selectedOption: string) => void;
    onNext: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, answer = '', onSubmit, onNext }) => {
    const [isCorrect, setIsCorrect] = useState(answer === quiz.correctAnswer);
    const [isSubmitted, setIsSubmitted] = useState(!!answer);
    const [selectedOption, setSelectedOption] = useState(answer);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsCorrect(selectedOption === quiz.correctAnswer);
            setIsSubmitted(true);
            onSubmit(selectedOption);
        },
        [selectedOption, quiz.correctAnswer]
    );

    return (
        <>
            {isSubmitted ? (
                <div className="bg-white p-4 rounded-lg shadow-md p-4 animate-slide-in animate-duration-300">
                    <h2 className="text-2xl font-bold">{quiz.question}</h2>
                    {isCorrect ? (
                        <p className="text-green-500 text-center font-bold my-4">Correct!</p>
                    ) : (
                        <p className="text-red-500 text-center font-bold my-4">Incorrect!</p>
                    )}
                    <div className="flex justify-between flex-col gap-2">
                        <p className="text-gray-500">Correct Answer: {quiz.correctAnswer}</p>
                        <p className="text-gray-500">Selected Answer: {selectedOption}</p>
                    </div>
                    <button onClick={onNext} className="bg-blue-500 text-white p-2 rounded-md mt-4">
                        Next
                    </button>
                </div>
            ) : (
                <div className="bg-white p-4 rounded-lg shadow-md p-4 flex flex-col gap-4 animate-fade-in">
                    <h2 className="text-2xl font-bold">{quiz.question}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {quiz.options.map((option) => (
                            <div
                                key={option}
                                className={`${isSubmitted && isCorrect && option === quiz.correctAnswer ? 'bg-green-500 p-2 rounded-md' : ''} ${isSubmitted && !isCorrect && option === selectedOption ? 'bg-red-500 p-2 rounded-md' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value={option}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                />
                                <label
                                    className={`${isSubmitted && isCorrect && option === quiz.correctAnswer ? 'text-white' : ''} ${isSubmitted && !isCorrect && option === selectedOption ? 'text-white' : ''}`}
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                        <button
                            type="submit"
                            disabled={!selectedOption}
                            className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default QuizCard;
