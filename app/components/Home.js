// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import styles from './Home.css';
import { loginUser } from './API/api';

import * as CounterActions from '../actions';

type Props = {
  setUserName: () => void,
  setUserExist: () => void,
  exists: boolean
};




class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    ipcRenderer.send('xml', 'sup_main Process im rendered');
    this.state = {
      username: ''
    }
  }

  // eslint-disables
  // eslint-disable sx-a11y/click-events-have-key-events

  componentWillMount() {
    const { setUserName } = this.props;
    ipcRenderer.on('xml', (event, xml) => {
      console.log('msg from main PRocess', xml);
      const user = xml.settings.domain[4].section[0].setting[0].$.value;
      setUserName(user);
      console.log('redierect');
      this.setState({
        username: user
      });
    });
  }

  usernameListener(event) {
    const {
      setUserName
    } = this.props;
    setUserName(event.target.value);
    this.setState({
      inputUsername: event.target.value,
      loginCalled: false
    })
  }

  handleLogin() {
    console.log('handleLogin');
    const { setUserExist } = this.props; 
    const { inputUsername } = this.state;
    loginUser(setUserExist, inputUsername)
    this.setState({
      loginCalled: true
    })


  }

  render() {
    const { username, inputUsername, loginCalled } = this.state;
    const { exists } = this.props;

    if (username && username !== '') {
      return <Redirect to='/recorder' />;
    }
    if(exists) {
      return <Redirect to='/recorder' />;
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.usernameListener = this.usernameListener.bind(this);
    return (
      <div>
        <div className={styles.top_header}>
          <div style={{ float: 'right' }}>
            {/* <i
              className="fas fa-window-minimize"
              style={{ marginRight: '2px' }}
            />
            <i
              className="fas fa-window-maximize"
              style={{ marginRight: '2px' }}
            />
            <i className="fas fa-window-close" style={{ marginRight: '2px' }} /> */}
          </div>
        </div>
        {/* <span className={styles.top_title}>SOFTPHONE005</span> */}
        <div className={styles.container} data-tid="container">
          <h3 className="label">User ID</h3>
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          {/* eslint-disable jsx-a11y/click-events-have-key-events */}
          <div className={styles.input_container}>
            <input
              onChange={evt => this.usernameListener(evt)}
              placeholder="User ID"
            />
            <i
                onClick={this.handleLogin}
                style={{
                  // color: 'rgb(212, 132, 43)',
                  fontSize: '2.6rem',
                  verticalAlign: 'middle'
                }}
                className="fas fa-arrow-alt-circle-right"
              />
          </div>
          <p
            style={{fontSize: '12px'}}
          >{inputUsername && loginCalled && `${inputUsername} doesn't exist`}</p>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

function mapStateToProps(state) {
  return {
    exists: state.appData.exists
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
