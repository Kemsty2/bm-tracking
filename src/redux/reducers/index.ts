import { combineReducers } from 'redux';
import settingsReducer from './settings';
import messageReducer from './message';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  settings: settingsReducer,
});

export default rootReducer;
