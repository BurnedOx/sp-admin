import axios from 'axios';
import getUser from './getUser';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT
});

instance.interceptors.request.use((request) => {
    const user = getUser();
    if (user) {
        request.headers['x-userid'] = user.id;
        request.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return request;
});

instance.interceptors.response.use(
    res => res,
    error => {
        return Promise.reject(error);
    },
);

export default instance;
