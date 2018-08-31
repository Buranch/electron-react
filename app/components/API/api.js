// @flow
// import type { GetState, Dispatch } from '../../reducers/types';
// import {setPauseResponse} from '../../actions';

const baseURL = 'http://192.168.16.31:8080';
// http: //localhost:8080/orktrack/command?cmd=ondemand&type=pause&localparty=5002&orkuid=ABCD&side=both
// http: //localhost:8080/orktrack/command?cmd=ondemand&type=pause&localparty=SOFTPHONE057&side=both
export const pauseGET = (pauseAction, username) =>
  fetch(
    `${baseURL}/orktrack/command?cmd=ondemand&type=pause&localparty=${username}&side=both`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'text/plain',
        Accept: 'application/json'
      })
    }
  )
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(data => {
      console.log(data);
      return pauseAction(data);
    });

export const resumeGET = (resumeAction, username) =>
  fetch(
    `${baseURL}/orktrack/command?cmd=ondemand&type=resume&localparty=${username}&side=both`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'text/plain',
        Accept: 'application/json'
      })
    }
  )
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(data => {
      console.log(data);
      return resumeAction(data);
    });
