// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import routes from '../constants/routes.json';
import styles from './Home.css';

import * as CounterActions from '../actions';

type Props = {
  setUserName: () => void
};

class Home extends Component<Props> {
  props: Props;

  // eslint-disables
  // eslint-disable sx-a11y/click-events-have-key-events

  usernameListener(event) {
    const { setUserName } = this.props;
    setUserName(event.target.value);
  }

  render() {
    this.usernameListener = this.usernameListener.bind(this);
    return (
      <div>
        <div className={styles.top_header}>
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
        <span className={styles.top_title}>SOFTPHONE005</span>
        <div className={styles.container} data-tid="container">
          <h3>User ID</h3>
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
