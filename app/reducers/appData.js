// @flow
import { SET_PAUSE_REPONSE, SET_RESUME_REPONSE, SET_SERVER_STATE, SET_USER_EXIST, SET_ACTIVE_STATE } from '../actions';
import type { Action } from './types';

export default function appData(state = [], action: Action) {
  switch (action.type) {
    case SET_PAUSE_REPONSE:
      console.log('indeed pause');
      return { ...state, pauseResponse: action.response };
    case SET_RESUME_REPONSE:
      console.log('indeed resume');
      return { ...state, resumeResponse: action.response };
    case SET_ACTIVE_STATE:
      console.log('set Active state');
      return { ...state, active: action.active };
    case SET_USER_EXIST: 
      console.log('set User exits');
      return { ...state, exists: action.exists};
    case SET_SERVER_STATE: 
      console.log('set Server state');
      return { ...state, serverStatus: action.status};
    default:
      return {...state, active: true, exists: false, serverStatus: true};
  }
}
