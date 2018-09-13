// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { ipcRenderer } from 'electron';

// import routes from '../constants/routes.json';
import styles from './Home.css';
// import xml from './xml.xml';


import * as CounterActions from '../actions';
import Recorder from './Recorder';

type Props = {
  setUserName: () => void
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
  }


  render() {

    const { username } = this.state;

    
    console.log(username);
    // console.log('username', username);
    console.log('why here');
    if (username === 'SOFTPHONE057') {
      // return (<p>You</p>)
      return <Redirect to='/recorder' />;

    }

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
            <Link to="/recorder">
              <i
                style={{
                  // color: 'rgb(212, 132, 43)',
                  fontSize: '2.6rem',
                  verticalAlign: 'middle'
                }}
                className="fas fa-arrow-alt-circle-right"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Home);
