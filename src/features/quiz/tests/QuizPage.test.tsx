import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import QuizPage from '../pages/QuizPage';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { store, setQuizzesAnswers, setQuizzes } from '../store';

const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
};
describe('QuizPage', () => {
    beforeEach(() => {
        store.dispatch(setQuizzesAnswers([]));
        store.dispatch(
            setQuizzes([
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
            ])
        );
    });

    it('should render', () => {
        render(
            <MemoryRouter>
                <QuizPage />
            </MemoryRouter>
        );
        expect(screen.getByText('Quiz')).toBeInTheDocument();
    });
    it('should render quiz card', () => {
        render(
            <MemoryRouter initialEntries={['/quiz/1']}>
                <Routes>
                    <Route path="/quiz/:id" element={<QuizPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
    it('submit button should be disabled if no option is selected', () => {
        render(
            <MemoryRouter initialEntries={['/quiz/1']}>
                <Routes>
                    <Route path="/quiz/:id" element={<QuizPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    });
    it('submit button should be enabled if option is selected', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/quiz/1']}>
                <Routes>
                    <Route path="/quiz/:id" element={<QuizPage />} />
                </Routes>
            </MemoryRouter>
        );
        const parisOption = container.querySelector('input[value="Paris"]') as HTMLInputElement;
        fireEvent.click(parisOption);
        expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
    });
    it('should show Next button after submitting answer', async () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/quiz/1']}>
                <Routes>
                    <Route path="/quiz/:id" element={<QuizPage />} />
                </Routes>
            </MemoryRouter>
        );

        const parisOption = container.querySelector('input[value="Paris"]') as HTMLInputElement;
        fireEvent.click(parisOption);
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
        });
        expect(screen.getByText(/^Correct!$|^Incorrect!$/i)).toBeInTheDocument();
    });
    it('should save answer to store when submit is clicked', async () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/quiz/1']}>
                <Routes>
                    <Route path="/quiz/:id" element={<QuizPage />} />
                </Routes>
            </MemoryRouter>
        );

        const parisOption = container.querySelector('input[value="Paris"]') as HTMLInputElement;
        fireEvent.click(parisOption);
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            const state = store.getState();
            const answer = state.quizzesAnswers.find((q) => q.id === '1');
            expect(answer).toBeDefined();
            expect(answer?.answer).toBe('Paris');
        });
    });
    it('should navigate to email page when last quiz is submitted', async () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/quiz/2']}>
                <Routes>
                    <Route path="/quiz/:id" element={<QuizPage />} />
                </Routes>
                <LocationDisplay />
            </MemoryRouter>
        );
        const berlinOption = container.querySelector('input[value="Berlin"]') as HTMLInputElement;
        fireEvent.click(berlinOption);
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
        });
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(screen.getByTestId('location-display')).toHaveTextContent('/email');
    });
});
