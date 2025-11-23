export interface Quiz {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface QuizAnswer {
    id: string;
    answer: string;
}
