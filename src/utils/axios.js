import axios from 'axios';
import getUser from './getUser';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT
});

instance.interceptors.request.use((req) => {
    const user = getUser();
    if (user) {
        request.headers['x-userid'] = user.id;
        request.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return req;
});

instance.interceptors.response.use(
    res => res,
    error => {
        message.error(error.message);
        return Promise.reject(error);
    },
);

export default instance;
