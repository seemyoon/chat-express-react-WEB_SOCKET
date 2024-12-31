import axios from 'axios';

const API_URL = 'http://localhost:3200/api/auth';

export const loginWithGoogle = async () => {
    return axios.post(`${API_URL}/googleLogin`);
};

export const loginWithFacebook = async () => {
    return axios.post(`${API_URL}/facebookLogin`);
};

export const logout = async () => {
    return axios.post(`${API_URL}/logout`);
};
