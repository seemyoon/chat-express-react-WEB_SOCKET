import axios from "axios";
import {baseUrl} from "../constants/url";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {}
});