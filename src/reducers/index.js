import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import memberReducer from './memberReducer';
import epinReducer from './epinReducer';
import withdrawalReducer from './withdrawalReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  member: memberReducer,
  epin: epinReducer,
  withdrawal: withdrawalReducer,
});

export default rootReducer;
