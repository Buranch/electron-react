// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Recorder.css';

import * as CounterActions from '../actions';

import { pauseGET, resumeGET } from './API/api';

// type Props = {
//   increment: () => void,
//   incrementIfOdd: () => void,
//   incrementAsync: () => void,
//   decrement: () => void,
//   counter: number
// };

type Props = {
  // setUserName: () => void
  username: string,
  setPauseResponse: () => void,
  setResumeResponse: () => void
};

class Recorder extends Component<Props> {
  props: Props;

  state = {
    activity: 'recording',
    nocall: false
  };

  handleRecorder() {
    const { setPauseResponse, setResumeResponse } = this.props;
    const { username } = this.props;

    const { activity } = this.state;
    // eslint-disable
    if (activity === 'recording') pauseGET(setPauseResponse, username);
    else resumeGET(setResumeResponse, username);
    this.setState({
      activity: activity === 'recording' ? 'paused' : 'recording'
    });
  }

  render() {
    this.handleRecorder = this.handleRecorder.bind(this);
    const { username } = this.props;
    const { activity, nocall } = this.state;
    console.log('username is: ', username);
    return (
      <div>
        <div className={styles.top_header}>
          <span className={styles.top_title}>SOFTPHONE005</span>

          <div style={{ float: 'right' }}>
            <i
              className="fas fa-window-minimize"
              style={{ marginRight: '2px' }}
            />
            <i
              className="fas fa-window-maximize"
              style={{ marginRight: '2px' }}
            />
            <i className="fas fa-window-close" style={{ marginRight: '2px' }} />
          </div>
        </div>
        <div className={styles.goback}>
          <Link to="/home">
            <i
              className="fas fa-arrow-alt-circle-left"
              style={{ fontSize: '2.3rem' }}
            />
          </Link>
          <div className={styles.username}>{username}</div>
        </div>
        <div className={styles.container} data-tid="container">
          {/* <i className="fa fa-microphone-slash" style={{fontSize: '192px'}} /> */}
          <div className={styles.mic}>
            {/* eslint-disable jsx-a11y/no-static-element-interactions */}{' '}
            {/* eslint-disable jsx-a11y/click-events-have-key-events */}
            {nocall || (
              <i
                className="fa fa-microphone-slash"
                onClick={this.handleRecorder}
                style={{
                  fontSize: '67px',
                  // rgb(48, 125, 138)
                  // d4842b
                  // #181e38 recording
                  background: activity === 'recording' ? '#1b223a' : '#d4842b',
                  padding: activity === 'recording' ? '50px' : '56px',
                  borderRadius: '100%',
                  transitionProperty: 'padding',
                  transitionDuration: '0.2s',
                  transitionTimingFunction: 'linear',
                  transitionDelay: '0.1s'
                }}
              />
            )}
          </div>
          <p style={{ textAlign: 'center' }}>{nocall || activity}</p>
          <p className={styles.nocall}>{!nocall || 'No Call Detected'}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username || 'Unknown'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder);