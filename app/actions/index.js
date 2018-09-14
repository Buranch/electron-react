// @flow
// import type { GetState, Dispatch } from '../reducers/types';

// export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
// export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_PAUSE_REPONSE = 'SET_PAUSE_REPONSE';
export const SET_RESUME_REPONSE = 'SET_RESUME_REPONSE';
export const SET_ACTIVE_STATE = 'SET_ACTIVE_STATE';


export function setUserName(name) {
  console.log('setUserName', name);
  return {
    type: SET_USERNAME,
    name
  };
}

export function setPauseResponse(response) {
  return {
    type: SET_PAUSE_REPONSE,
    response
  };
}

export function setResumeResponse(response) {
  return {
    type: SET_RESUME_REPONSE,
    response
  };
}

export function setActive(active) {
  console.log('setActive');
  return {
    type: SET_ACTIVE_STATE,
    active
  }
}

// export function increment() {
//   return {
//     type: INCREMENT_COUNTER
//   };
// }

// export function decrement() {
//   return {
//     type: DECREMENT_COUNTER
//   };
// }

// export function incrementIfOdd() {
//   return (dispatch: Dispatch, getState: GetState) => {
//     const { counter } = getState();

//     if (counter % 2 === 0) {
//       return;
//     }

//     dispatch(increment());
//   };
// }

// export function incrementAsync(delay: number = 1000) {
//   return (dispatch: Dispatch) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
