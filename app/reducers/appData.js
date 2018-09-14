// @flow
import { SET_PAUSE_REPONSE, SET_RESUME_REPONSE, SET_ACTIVE_STATE } from '../actions';
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
    default:
      return {...state, active: true};
  }
}
