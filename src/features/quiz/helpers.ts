import { openDB } from 'idb';
import type { Action, Middleware } from '@reduxjs/toolkit';

const getDB = async () => {
    return await openDB('quiz', 2, {
        upgrade(db, oldVersion) {
            // Delete old object store if it exists with the wrong schema
            if (oldVersion < 2 && db.objectStoreNames.contains('quizzesAnswers')) {
                db.deleteObjectStore('quizzesAnswers');
            }
            if (!db.objectStoreNames.contains('quizzesAnswers')) {
                db.createObjectStore('quizzesAnswers');
            }
        },
    });
};

export const loadInitialStateFromDB = async () => {
    try {
        const db = await getDB();
        const quizzesAnswers = await db.get('quizzesAnswers', 'answers');
        return {
            quizzesAnswers: quizzesAnswers || [],
        };
    } catch (error) {
        console.error('Error loading initial state from IndexedDB:', error);
        return {
            quizzesAnswers: [],
        };
    }
};

const saveQuizzesAnswersToDB = async (
    quizzesAnswers: {
        question: string;
        answer: string;
        correctAnswer: string;
    }[]
) => {
    try {
        const db = await getDB();
        await db.put('quizzesAnswers', quizzesAnswers, 'answers');
    } catch (error) {
        console.error('Error saving to IndexedDB:', error);
    }
};

// Redux middleware to automatically sync quizzesAnswers to IndexedDB
export const indexDBMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    // Only save to IndexedDB when quizzesAnswers is updated
    if ((action as Action).type === 'quiz/setQuizzesAnswers') {
        const state = store.getState();
        if (state.quizzesAnswers) {
            saveQuizzesAnswersToDB(state.quizzesAnswers).catch(console.error);
        }
    }

    return result;
};
