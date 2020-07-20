import axios from '../utils/axios';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const SESSION_ERROR = 'SESSION_ERROR';

export const loginSuccess = (user) => ({
  type: SESSION_LOGIN,
  user
});

export const sessionFail = (message) => ({
  type: SESSION_ERROR,
  message
});

export const logout = () => ({
  type: SESSION_LOGOUT
});

export const login = (userId, password) => dispatch => {
  axios.post('/accounts/login', { userId, password })
    .then(res => dispatch(loginSuccess(res.data)))
    .catch(error => dispatch(sessionFail(error.message)));
}
