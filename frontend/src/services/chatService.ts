import axios from 'axios';

const API_URL = 'http://localhost:3200/api/chats';

export const createChat = async (chatData: any) => {
    return axios.post(`${API_URL}/createChat`, chatData);
};

export const updateChat = async (chatData: any) => {
    return axios.put(`${API_URL}/updateChat`, chatData);
};

export const getChats = async () => {
    return axios.get(`${API_URL}/getChats`);
};

export const searchChats = async (query: string) => {
    return axios.post(`${API_URL}/searchChats`, { query });
};

export const removeChat = async (chatId: string) => {
    return axios.post(`${API_URL}/removeChat`, { chatId });
};

export const getChat = async (chatId: string) => {
    return axios.get(`${API_URL}/${chatId}`);
};
