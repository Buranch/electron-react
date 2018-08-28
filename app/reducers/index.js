// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import user from './user';
import appData from './appData';

const rootReducer = combineReducers({
  user,
  router,
  appData
});

export default rootReducer;
