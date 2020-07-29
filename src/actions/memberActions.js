import axios from '../utils/axios';

export const MEMBER_GET = 'MEMBER_GET';
export const MEMBER_FAIL = 'MEMBER_FAIL';

export const getMembers = () => dispatch =>
    axios.get('/accounts/users')
        .then(res => dispatch({ type: MEMBER_GET, members: res.data }))
        .catch(error => dispatch({ type: MEMBER_FAIL, message: error.message }))