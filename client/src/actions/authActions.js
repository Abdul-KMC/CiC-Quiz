import axios from 'axios';
import baseurl from '../api';
import { setJWTToken, clearJWTToken } from '../reducers/quizReducer';

export const registerUser = (userData) => async(dispatch) => {
    try {
        const res = await axios.post(`${baseurl}/api/user/register`, userData);
        alert(`user sucessufully created`);
    } catch (err) {
        if (err.response) {
            alert(err.response.data);
        } else {
            alert('An error occurred while signing up');
        }
    }
};

export const loginUser = (userData) => async(dispatch) => {
    try {
        const res = await axios.post(`${baseurl}/api/user/login`, userData);
        const token = res.data;
        dispatch(setJWTToken(token));
        localStorage.setItem('jwtToken', token);
        return token;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data);
        } else {
            alert('An error occurred while logging in');
        }
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(clearJWTToken());
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('quizData');
};