import { describe, it, expect, beforeEach, vi } from 'vitest';
import SubmittedQuiz from '../pages/SubmittedQuiz';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

const mockQuizzesAnswers = [
    {
        id: '1',
        answer: 'Paris',
    },
    {
        id: '2',
        answer: 'Berlin',
    },
];

describe('SubmittedQuiz', () => {
    beforeEach(() => {
        // Mock localStorage
        const localStorageMock = {
            getItem: vi.fn((key) => {
                if (key === 'email') return 'test@test.com';
                return null;
            }),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        };
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true,
        });

        // Mock the helpers
        vi.mocked(loadInitialStateFromDB).mockResolvedValue({
            quizzesAnswers: mockQuizzesAnswers,
            quizzes: mockQuizzes,
        });
        vi.mocked(saveQuizzesAnswersToDB).mockResolvedValue(undefined);
    });
    it('should render', async () => {
        render(<SubmittedQuiz navigate={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText('Submitted Quiz')).toBeInTheDocument();
        });
    });
    it('should show correct answers', async () => {
        render(<SubmittedQuiz navigate={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText(/Correct Answers:/)).toBeInTheDocument();
        });
    });
    it('should show incorrect answers', async () => {
        render(<SubmittedQuiz navigate={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText(/Incorrect Answers:/)).toBeInTheDocument();
        });
    });
    it('should show total questions', async () => {
        render(<SubmittedQuiz navigate={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText(/Total Questions:/)).toBeInTheDocument();
        });
    });
    it('should show answers', async () => {
        render(<SubmittedQuiz navigate={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText('Answers:')).toBeInTheDocument();
        });
    });
    it('should show try one more time button', async () => {
        render(<SubmittedQuiz navigate={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText('Try one more time')).toBeInTheDocument();
        });
    });
    it('should clear answers when try one more time button is clicked', async () => {
        render(<SubmittedQuiz navigate={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText('Try one more time')).toBeInTheDocument();
        });
        const button = screen.getByText('Try one more time');
        fireEvent.click(button);

        await waitFor(() => {
            expect(saveQuizzesAnswersToDB).toHaveBeenCalledWith([]);
            expect(window.localStorage.removeItem).toHaveBeenCalledWith('email');
        });
    });
    it('should navigate to quiz page when try one more time button is clicked', async () => {
        const mockNavigate = vi.fn();
        render(<SubmittedQuiz navigate={mockNavigate} />);

        await waitFor(() => {
            expect(screen.getByText('Try one more time')).toBeInTheDocument();
        });

        // Click the button
        const button = screen.getByText('Try one more time');
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(PagePaths.QUIZ);
        });
    });
    it('should show email', async () => {
        render(<SubmittedQuiz navigate={() => {}} />);
        await waitFor(() => {
            expect(screen.getByText('Email: test@test.com')).toBeInTheDocument();
        });
    });
});
