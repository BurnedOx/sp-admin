import * as actionTypes from 'actions';

const initialState = {
  members: [],
  error: null
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MEMBER_GET: {
      return {
        members: action.members,
        error: null
      };
    }

    case actionTypes.MEMBER_FAIL: {
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

export default memberReducer;