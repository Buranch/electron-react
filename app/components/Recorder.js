// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Recorder.css';

import * as CounterActions from '../actions';

import { pauseGET, resumeGET, checkActive } from './API/api';


type Props = {
  // setUserName: () => void
  username: string,
  active: boolean,
  serverStatus: boolean,
  setPauseResponse: () => void,
  setResumeResponse: () => void,
  setActive: () => void,
  setServerStatus: () => void
};

class Recorder extends Component<Props> {

  constructor(props: Props) {
   super(props);
   this.state = {
    activity: 'recording',
    nocall: false,
    timer: null,
    counter: 0,
    starting: true
   };
   this.url = "audio/beep.mp3";
  //  this.audio = new Audio(this.url);
   this.audio = new Audio(this.url);
   console.log(this.audio);
  //  this.audio.loop = true;
  this.tick = this.tick.bind(this);
 }

  componentDidMount() {
    const timer = setInterval(this.tick, 5000);
    this.setState({
      timer
    });
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  tick() {
    const { counter } = this.state;
    const { setActive , username, setServerStatus } = this.props;

    checkActive(setActive, username, setServerStatus);
    
    if(counter === 0) {
      this.setState({
        starting: false
      });
    }

    this.setState({
      counter: counter + 1
    });


    // if(counter === 15) {
    //   clearInterval(timer);
    // }
  }

   handleRecorder() {
    const { setPauseResponse, setResumeResponse } = this.props;
    const { username, active } = this.props;

    const { activity } = this.state;
    // eslint-disable
    if (activity === 'recording' && active) {
      pauseGET(setPauseResponse, username)
      this.audio.play()
      this.audio.loop = true;

    }

    else {
      resumeGET(setResumeResponse, username);
      this.audio.loop = false;
      this.audio.pause();
    }
    this.setState({
      activity: activity === 'recording' ? 'paused' : 'recording'
    });
  }

  render() {
    this.handleRecorder = this.handleRecorder.bind(this);
    const { username, active, serverStatus } = this.props;
    const { activity, nocall, starting } = this.state;
    console.log('serverStatus', serverStatus);
    console.log('username is: ', username);
    return (
      <div>
        <div className={styles.top_header}>
          {/* <span className={styles.top_title}>SOFTPHONE005</span> */}
        </div>
        <div className={styles.goback}>
          <Link to="/home">
            <div className={styles.username}>{username}</div>
          </Link>
        </div>
        <div className={styles.container} data-tid="container">
          <div className={styles.mic}>
            {/* eslint-disable jsx-a11y/no-static-element-interactions */}{' '}
            {/* eslint-disable jsx-a11y/click-events-have-key-events */}
            { nocall || active && serverStatus && !starting && (
              <i
                className="fa fa-microphone-slash"
                onClick={this.handleRecorder}
                style={{
                  fontSize: '22px',
                  background: activity === 'recording' ? '#1b223a' : '#d4842b',
                  padding: activity === 'recording' ? '22px' : '24px',
                  borderRadius: '100%',
                  transitionProperty: 'padding',
                  transitionDuration: '0.2s',
                  transitionTimingFunction: 'linear',
                  transitionDelay: '0.1s'
                }}
              />
            )}
          </div>
          <p style={{ textAlign: 'center', fontSize: '8px', textTransform: 'uppercase' }}>{nocall || activity && !active}</p>
          <p className={styles.nocall}>{!nocall || 'No Call Detected'}</p>
          <p style={{ textAlign: 'center', fontSize: '8px', textTransform: 'uppercase' }}>{!active && ('Not active') }</p>
          <p style={{ textAlign: 'center', fontSize: '8px', textTransform: 'uppercase' }}>{starting && ('Starting...') }</p>
          {!serverStatus && (
            <div>
              <p style={{ textAlign: 'center', fontSize: '8px', textTransform: 'uppercase' }}>Something went wrong with server :(</p>
              <div className={styles.button_holder}><button className={styles.button} type="button" onClick={this.tick} >Retry</button></div>
            </div>
          )}
          
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username || 'Unknown',
    active: state.appData.active,
    serverStatus: state.appData.serverStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder);
