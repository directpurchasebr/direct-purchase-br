
import { getCustomCookie } from "@lib/cookies";
import axios from "axios";

const url_api = process.env.API_URL;

const api = axios.create({
    baseURL: url_api,
});

api.interceptors.request.use(
    (config) => {
        const loginUrl = "/login";
        if (config.url === loginUrl) {
            return config;
        }

        const user = getCustomCookie('userSession');
        if (user && user.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
