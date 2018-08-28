// @flow
import { SET_USERNAME } from '../actions';
import type { Action } from './types';

export default function counter(state = [], action: Action) {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.name };
    default:
      return state;
  }
}
