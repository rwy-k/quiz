import { createSlice, configureStore, type PayloadAction } from '@reduxjs/toolkit'
import type { Quiz } from './types'

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    email: '',
    quizzes: [] as Quiz[],
    currentQuiz: null as Quiz | null,
    currentQuestion: '',
    currentAnswer: '',
    currentScore: 0,
    currentQuestionIndex: 0,
    currentAnswerIndex: 0,
    currentScoreIndex: 0,
  },
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload
    },
    setCurrentQuestion: (state, action: PayloadAction<string>) => {
      state.currentQuestion = action.payload
    },
    setCurrentAnswer: (state, action: PayloadAction<string>) => {
      state.currentAnswer = action.payload
    },
    setCurrentScore: (state, action: PayloadAction<number>) => {
      state.currentScore = action.payload
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload
    },
    setCurrentAnswerIndex: (state, action: PayloadAction<number>) => {
      state.currentAnswerIndex = action.payload
    },
    setCurrentScoreIndex: (state, action: PayloadAction<number>) => {
      state.currentScoreIndex = action.payload
    },
  }
})

export const { setEmail, setQuizzes, setCurrentQuiz, setCurrentQuestion, setCurrentAnswer, setCurrentScore, setCurrentQuestionIndex, setCurrentAnswerIndex, setCurrentScoreIndex } = quizSlice.actions

export const store = configureStore({
  reducer: quizSlice.reducer
})

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))
