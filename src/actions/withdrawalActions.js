import axios from '../utils/axios';

export const WITHDRAWAL_GET_ALL = 'WITHDRAWAL_GET_ALL';
export const WITHDRAWAL_PAY = 'WITHDRAWAL_PAY';
export const WITHDRAWAL_CANCEL = 'WITHDRAWAL_CANCEL';
export const WITHDRAWAL_UNPAY = 'WITHDRAWAL_UNPAY';
export const WITHDRAWAL_ERROR = 'WITHDRAWAL_ERROR';

/**
 * 
 * @param {'paid' | 'unpaid' | undefined} status
 */
export const getWithdrawals = (status) => dispatch => (
    axios.get('/withdrawal/all', { params: { status } })
        .then(res => dispatch({ type: WITHDRAWAL_GET_ALL, filter: status, data: res.data }))
        .catch(error => dispatch({ type: WITHDRAWAL_ERROR, message: error.message }))
);

/**
 * 
 * @param {string[]} ids 
 */
export const payWithdrawals = (ids) => dispatch => (
    axios.put(`/withdrawal/${ids.join(',')}/pay`)
        .then(res => dispatch({ type: WITHDRAWAL_PAY, ids }))
        .catch(error => dispatch({ type: WITHDRAWAL_ERROR, message: error.message }))
);

/**
 * 
 * @param {string[]} ids 
 */
export const cancelWithdrawals = (ids) => dispatch => (
    axios.put(`/withdrawal/${ids.join(',')}/cancel`)
        .then(res => dispatch({ type: WITHDRAWAL_CANCEL, ids }))
        .catch(error => dispatch({ type: WITHDRAWAL_ERROR, message: error.message }))
);

/**
 * 
 * @param {string[]} ids 
 */
export const unpayWithdrawals = (ids) => dispatch => (
    axios.put(`/withdrawal/${ids.join(',')}/unpay`)
        .then(res => dispatch({ type: WITHDRAWAL_UNPAY, ids }))
        .catch(error => dispatch({ type: WITHDRAWAL_ERROR, message: error.message }))
);