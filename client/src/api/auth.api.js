import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const register = async (email, password) => {
    return axios.post(`${API_BASE_URL}/auth/register`, { email, password });
};

export const login = async (email, password) => {
    return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};
