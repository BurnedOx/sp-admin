import * as actionTypes from 'actions';

const initialState = {
  user: null,
  error: null
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        user: action.user,
        error: null
      };
    }

    case actionTypes.SESSION_ERROR: {
      return {
        ...state,
        error: action.message
      }
    }

    case actionTypes.SESSION_LOGOUT: {
      localStorage.removeItem('user');
      return {
        user: null,
        error: null
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
