/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import RecorderPage from './containers/RecorderPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.RECORDER} component={RecorderPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
