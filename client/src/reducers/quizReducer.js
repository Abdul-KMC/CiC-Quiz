import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    quizData: [],
    jwtToken: null,
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
        setJWTToken(state, action) {
            state.jwtToken = action.payload;
        },
        clearJWTToken(state) {
            state.jwtToken = null;
        },
    },
});

export const { setQuizData, updateTopic, updateQuiz, deleteQuiz, setJWTToken, clearJWTToken } = quizSlice.actions;
export default quizSlice.reducer;