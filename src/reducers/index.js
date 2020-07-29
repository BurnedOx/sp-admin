import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import memberReducer from './memberReducer';
import epinReducer from './epinReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  member: memberReducer,
  epin: epinReducer,
});

export default rootReducer;
