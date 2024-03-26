import axios from 'axios';
import baseurl from '../api';
const API_URL = `${baseurl}/api`;

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