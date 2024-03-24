import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const registerUser = async(userData) => {
    try {
        const res = await axios.post(`${API_URL}/user/register`, userData);
        return res.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const loginUser = async(userData) => {
    try {
        const res = await axios.post(`${API_URL}/user/login`, userData);
        return res.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};