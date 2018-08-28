// @flow
import { SET_PAUSE_REPONSE, SET_RESUME_REPONSE } from '../actions';
import type { Action } from './types';

export default function appData(state = [], action: Action) {
  switch (action.type) {
    case SET_PAUSE_REPONSE:
      console.log('indeed pause');
      return { ...state, pauseResponse: action.response };
    case SET_RESUME_REPONSE:
      console.log('indeed resume');
      return { ...state, resumeResponse: action.response };
    default:
      return state;
  }
}
