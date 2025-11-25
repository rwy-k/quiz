import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import QuizPage from '../pages/QuizPage';
import { loadInitialStateFromDB, saveQuizzesAnswersToDB } from '../helpers';
import { PagePaths } from '../../../shared/types';

// Mock the helpers
vi.mock('../helpers', () => ({
    loadInitialStateFromDB: vi.fn(),
    saveQuizzesAnswersToDB: vi.fn(),
}));

const mockQuizzes = [
    {
        id: '1',
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
    },
    {
        id: '2',
        question: 'What is the capital of Germany?',
        options: ['Berlin', 'London', 'Madrid', 'Paris'],
        correctAnswer: 'Berlin',
    },
];

describe('QuizPage', () => {
    beforeEach(() => {
        vi.mocked(loadInitialStateFromDB).mockResolvedValue({
            quizzesAnswers: [],
            quizzes: mockQuizzes,
        });
        vi.mocked(saveQuizzesAnswersToDB).mockResolvedValue(undefined);
    });

    it('should render', async () => {
        render(<QuizPage quizId="1" navigate={() => {}} setQuizId={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText('Quiz')).toBeInTheDocument();
        });
    });
    it('should render quiz card', async () => {
        render(<QuizPage quizId="1" navigate={() => {}} setQuizId={() => {}} />);
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
        });
    });
    it('submit button should be disabled if no option is selected', async () => {
        render(<QuizPage quizId="1" navigate={() => {}} setQuizId={() => {}} />);
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
        });
    });
    it('submit button should be enabled if option is selected', async () => {
        const { container } = render(<QuizPage quizId="1" navigate={() => {}} setQuizId={() => {}} />);
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
        });
        const parisOption = container.querySelector('input[value="Paris"]') as HTMLInputElement;
        fireEvent.click(parisOption);
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
        });
    });
    it('should show Next button after submitting answer', async () => {
        const { container } = render(<QuizPage quizId="1" navigate={() => {}} setQuizId={() => {}} />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
        });

        const parisOption = container.querySelector('input[value="Paris"]') as HTMLInputElement;
        fireEvent.click(parisOption);
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
        });
        expect(screen.getByText(/^Correct!$|^Incorrect!$/i)).toBeInTheDocument();
    });
    it('should save answer to store when submit is clicked', async () => {
        const { container } = render(<QuizPage quizId="1" navigate={() => {}} setQuizId={() => {}} />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
        });

        const parisOption = container.querySelector('input[value="Paris"]') as HTMLInputElement;
        fireEvent.click(parisOption);
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(saveQuizzesAnswersToDB).toHaveBeenCalledWith([
                {
                    id: '1',
                    answer: 'Paris',
                },
            ]);
        });
    });
    it('should navigate to email page when last quiz is submitted', async () => {
        const mockNavigate = vi.fn();
        const { container } = render(<QuizPage quizId="2" navigate={mockNavigate} setQuizId={() => {}} />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
        });

        const berlinOption = container.querySelector('input[value="Berlin"]') as HTMLInputElement;
        fireEvent.click(berlinOption);
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
        });
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(PagePaths.EMAIL);
        });
    });
});
