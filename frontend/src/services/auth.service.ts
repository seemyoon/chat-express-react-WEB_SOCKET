import axios from 'axios';
import {authUrl, urlBuilder} from "../constants/url";

const axiosInstance = axios.create({
    baseURL: authUrl,
    headers: {}
});

const messageService = {
    loginWithGoogle: async () => {
        const response = await axiosInstance.post(urlBuilder.auth.loginWithGoogle())
        return response.data
    },
    logout: async () => {
        await axiosInstance.post(urlBuilder.auth.logout())
    },
}

export {messageService}