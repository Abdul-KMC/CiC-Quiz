import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    quizData: [],
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuizData(state, action) {
            state.quizData = action.payload;
        },
        updateTopic(state, action) {
            state.quizData = action.payload;
        },
        updateQuiz(state, action) {
            state.quizData = action.payload.updatedQuiz;
        },
        deleteQuiz(state, action) {
            const index = action.payload;
            state.quizData.splice(index, 1);
        },
    },
});

export const { setQuizData, updateTopic, updateQuiz, deleteQuiz } = quizSlice.actions;
export default quizSlice.reducer;