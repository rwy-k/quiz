import { openDB } from 'idb';

const getDB = async () => {
    return await openDB('quiz', 3, {
        upgrade(db, oldVersion) {
            // Delete old object stores if they exist with wrong schema
            if (oldVersion < 3) {
                if (db.objectStoreNames.contains('quizzesAnswers')) {
                    db.deleteObjectStore('quizzesAnswers');
                }
                if (db.objectStoreNames.contains('quizzes')) {
                    db.deleteObjectStore('quizzes');
                }
            }
            if (!db.objectStoreNames.contains('quizzesAnswers')) {
                db.createObjectStore('quizzesAnswers');
            }
            if (!db.objectStoreNames.contains('quizzes')) {
                const quizzesStore = db.createObjectStore('quizzes');
                quizzesStore.put(
                    [
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
                    ],
                    'questions'
                );
            }
        },
    });
};

export const loadInitialStateFromDB = async () => {
    try {
        const db = await getDB();
        const quizzesAnswers = await db.get('quizzesAnswers', 'answers');
        const quizzes = await db.get('quizzes', 'questions');
        return {
            quizzesAnswers: quizzesAnswers || [],
            quizzes: quizzes || [],
        };
    } catch (error) {
        console.error('Error loading initial state from IndexedDB:', error);
        return {
            quizzesAnswers: [],
            quizzes: [],
        };
    }
};

export const saveQuizzesAnswersToDB = async (
    quizzesAnswers: {
        id: string;
        answer: string;
    }[]
) => {
    try {
        const db = await getDB();
        await db.put('quizzesAnswers', quizzesAnswers, 'answers');
    } catch (error) {
        console.error('Error saving to IndexedDB:', error);
    }
};
