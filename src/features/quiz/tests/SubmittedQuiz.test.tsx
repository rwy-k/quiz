import { describe, it, expect, beforeEach } from 'vitest';
import SubmittedQuiz from '../pages/SubmittedQuiz';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { store, setQuizzesAnswers, setEmail, setQuizzes } from '../store';
import { fireEvent, render, screen } from '@testing-library/react';

// Component to track location changes
const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
};

describe('SubmittedQuiz', () => {
    beforeEach(() => {
        store.dispatch(setEmail('test@test.com'));
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
        store.dispatch(
            setQuizzesAnswers([
                {
                    id: '1',
                    answer: 'Paris',
                },
                {
                    id: '2',
                    answer: 'Berlin',
                },
            ])
        );
    });
    it('should render', () => {
        render(
            <MemoryRouter>
                <SubmittedQuiz />
            </MemoryRouter>
        );
        expect(screen.getByText('Submitted Quiz')).toBeInTheDocument();
    });
    it('should show correct answers', () => {
        render(
            <MemoryRouter>
                <SubmittedQuiz />
            </MemoryRouter>
        );
        expect(screen.getByText(/Correct Answers:/)).toBeInTheDocument();
    });
    it('should show incorrect answers', () => {
        render(
            <MemoryRouter>
                <SubmittedQuiz />
            </MemoryRouter>
        );
        expect(screen.getByText(/Incorrect Answers:/)).toBeInTheDocument();
    });
    it('should show total questions', () => {
        render(
            <MemoryRouter>
                <SubmittedQuiz />
            </MemoryRouter>
        );
        expect(screen.getByText(/Total Questions:/)).toBeInTheDocument();
    });
    it('should show answers', () => {
        render(
            <MemoryRouter>
                <SubmittedQuiz />
            </MemoryRouter>
        );
        expect(screen.getByText('Answers:')).toBeInTheDocument();
    });
    it('should show try one more time button', () => {
        render(
            <MemoryRouter>
                <SubmittedQuiz />
            </MemoryRouter>
        );
        expect(screen.getByText('Try one more time')).toBeInTheDocument();
    });
    it('should clear answers when try one more time button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/submitted']}>
                <SubmittedQuiz />
            </MemoryRouter>
        );
        const button = screen.getByText('Try one more time');
        fireEvent.click(button);

        const state = store.getState();
        expect(state.quizzesAnswers).toEqual([]);
    });
    it('should navigate to home page when try one more time button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/submitted']}>
                <Routes>
                    <Route path="/submitted" element={<SubmittedQuiz />} />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
                <LocationDisplay />
            </MemoryRouter>
        );

        // Verify we're on the submitted page initially
        expect(screen.getByTestId('location-display')).toHaveTextContent('/submitted');

        // Click the button
        const button = screen.getByText('Try one more time');
        fireEvent.click(button);

        // Verify navigation occurred by checking location
        expect(screen.getByTestId('location-display')).toHaveTextContent('/');
    });
    it('should show email', () => {
        render(
            <MemoryRouter initialEntries={['/submitted']}>
                <SubmittedQuiz />
            </MemoryRouter>
        );
        expect(screen.getByText('Email: test@test.com')).toBeInTheDocument();
    });
});
