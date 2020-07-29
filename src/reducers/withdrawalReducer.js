import * as actionTypes from 'actions';

const initialState = {
  withdrawals: [],
  filter: 'all',
  error: null
};

/**
 * 
 * @param {any[]} withdrawals 
 * @param {string[]} ids 
 * @param {'paid' | 'unpaid' | 'canceled'} status 
 * @returns {any[]}
 */
const mapWithdrawalsWithIds = (withdrawals, ids, status) => (
  withdrawals.map(w => {
    if (ids.includes(w.id)) {
      w.status = status;
      w.updatedAt = new Date().toString()
    }
    return w;
  })
);

/**
 * 
 * @param {{withdrawals: any[], filter: string, error: null | string}} state 
 * @param {*} action 
 * @returns {{withdrawals: any[], filter: string, error: null | string}}
 */
const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WITHDRAWAL_GET_ALL: {
      return {
        withdrawals: action.data,
        filter: action.filter ? action.filter : 'all',
        error: null
      };
    }

    case actionTypes.WITHDRAWAL_PAY: {
      return {
        ...state,
        withdrawals: mapWithdrawalsWithIds(state.withdrawals, action.ids, 'paid'),
        error: null
      }
    }

    case actionTypes.WITHDRAWAL_CANCEL: {
      return {
        ...state,
        withdrawals: mapWithdrawalsWithIds(state.withdrawals, action.ids, 'canceled'),
        error: null
      }
    }

    case actionTypes.WITHDRAWAL_UNPAY: {
      return {
        ...state,
        withdrawals: mapWithdrawalsWithIds(state.withdrawals, action.ids, 'unpaid'),
        error: null
      }
    }

    case actionTypes.WITHDRAWAL_ERROR: {
      return {
        ...state,
        error: action.message
      }
    }

    default: {
      return state;
    }
  }
};

export default withdrawalReducer;