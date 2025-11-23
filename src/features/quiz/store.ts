import { createSlice, configureStore, type PayloadAction } from '@reduxjs/toolkit';
import type { Quiz, QuizAnswer } from './types';
import { indexDBMiddleware } from './helpers';

const initialState = {
    email: localStorage.getItem('email') || '',
    quizzes: [
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
    ] as Quiz[],
    quizzesAnswers: [] as QuizAnswer[],
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            localStorage.setItem('email', action.payload);
        },
        setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
            state.quizzes = action.payload;
        },
        setQuizzesAnswers: (state, action: PayloadAction<QuizAnswer[]>) => {
            state.quizzesAnswers = action.payload;
        },
        // Action to hydrate state from IndexedDB
        hydrateFromDB: (state, action: PayloadAction<Partial<typeof initialState>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setEmail, setQuizzes, setQuizzesAnswers, hydrateFromDB } = quizSlice.actions;

export const store = configureStore({
    reducer: quizSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(indexDBMiddleware),
});

store.subscribe(() => {
    console.info(store.getState());
});
