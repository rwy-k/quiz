import React, { useState } from 'react';

interface QuizCardProps {
    question: string
    options: string[]
    correctAnswer: string
}

const QuizCard: React.FC<QuizCardProps> = ({ question, options, correctAnswer }) => {
    const [isCorrect, setIsCorrect] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const selectedOption = formData.get('option') as string;
        
        setIsCorrect(selectedOption === correctAnswer);
    };
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{question}</h2>
            <form onSubmit={handleSubmit}>
                {options.map((option) => (
                    <div key={option}>
                        <label>
                            <input type="radio" name="option" value={option} />
                            {option}
                        </label>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {isCorrect && <p>Correct!</p>}
            {!isCorrect && <p>Incorrect!</p>}
        </div>
    )
}

export default QuizCard