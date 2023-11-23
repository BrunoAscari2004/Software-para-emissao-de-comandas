import axios, { AxiosError } from 'axios';
import EventEmitter from 'events';

const apiEventEmitter = new EventEmitter();

const token = localStorage.getItem('@nlweb/jwtToken');

const headers = token ? { Authorization: `Bearer ${token}` } : {};

const api = axios.create({
    baseURL: 'http://localhost:8080/NLBaseReact',
    headers: headers,
});

api.interceptors.response.use(
    response => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Ocorreu um 401 - Token expirou ou outro motivo
            apiEventEmitter.emit('invalid_token');
        }

        return Promise.reject(error);
    },
);

export { apiEventEmitter };
export default api;
