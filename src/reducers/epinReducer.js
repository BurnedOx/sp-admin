import * as actionTypes from 'actions';

const initialState = {
  epins: [],
  filter: 'all',
  error: null
};

const epinReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EPIN_GET_ALL: {
      return {
        epins: action.epins,
        filter: 'all',
        error: null
      };
    }

    case actionTypes.EPIN_GET_USED: {
      return {
        epins: action.epins,
        filter: 'used',
        error: null
      }
    }

    case actionTypes.EPIN_GET_UNUSED: {
      return {
        epins: action.epins,
        filter: 'unused',
        error: null
      }
    }

    case actionTypes.EPIN_GENERATE: {
      if (state.filter === 'unused' || state.filter === 'all') {
        return {
          ...state,
          epins: [action.epin, ...state.epins],
          error: null
        }
      }
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

export default epinReducer;