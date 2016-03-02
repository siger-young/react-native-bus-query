import { combineReducers } from 'redux';

import sessionReducer from './modules/session';

export default combineReducers({
  session: sessionReducer,
});
