import axios from '../utils/axios';

export const EPIN_GET_ALL = 'EPIN_GET_ALL';
export const EPIN_GET_USED = 'EPIN_GET_USED';
export const EPIN_GET_UNUSED = 'EPIN_GET_UNUSED';
export const EPIN_GENERATE = 'EPIN_GENERATE';
export const EPIN_FAIL = 'EPIN_FAIL';

export const getAllEpins = () => dispatch =>
    axios.get('/epin')
        .then(res => dispatch({ type: EPIN_GET_ALL, epins: res.data }))
        .catch(error => dispatch({ type: EPIN_FAIL, message: error.message }));

export const getUsedEpins = () => dispatch =>
    axios.get('/epin', { params: { status: "used" } })
        .then(res => dispatch({ type: EPIN_GET_USED, epins: res.data }))
        .catch(error => dispatch({ type: EPIN_FAIL, message: error.message }));

export const getUnusedEpins = () => dispatch =>
    axios.get('/epin', { params: { status: "unused" } })
        .then(res => dispatch({ type: EPIN_GET_UNUSED, epins: res.data }))
        .catch(error => dispatch({ type: EPIN_FAIL, message: error.message }));

export const generateEpin = () => dispatch =>
    axios.post('/epin')
        .then(res => dispatch({ type: EPIN_GENERATE, epin: res.data }))
        .catch(error => dispatch({ type: EPIN_FAIL, message: error.message }));