import axios from 'axios';

const API_URL = 'http://localhost:3200/api/messages';

export const getMessages = async () => {
    return axios.get(`${API_URL}/getMessages`);
};

export const sendMessage = async (messageData: any) => {
    return axios.post(`${API_URL}/sendMessage`, messageData);
};
