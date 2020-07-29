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
        const err = error.response ? error.response.data : error;
        return Promise.reject(err);
    },
);

export default instance;
