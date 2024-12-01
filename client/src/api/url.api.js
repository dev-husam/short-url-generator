import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const createShortUrl = async (originalUrl) => {
    return axios.post(
        `${API_BASE_URL}/url/shorten`,
        { originalUrl },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
};

export const getShortUrls = async () => {
    return axios.get(`${API_BASE_URL}/url/shorten`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

export const getUrlsList = async () => {
    return axios.get(`${API_BASE_URL}/url`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};