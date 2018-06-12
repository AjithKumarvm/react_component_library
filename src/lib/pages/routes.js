import React from 'react';
import { HashRouter as Router, Route, browserHistory, Redirect ,Switch } from 'react-router-dom';
import SamplePage from './SamplePage';

export default () => <Router history={browserHistory}>
      <Switch>
        <Route path="/SamplePage" component={SamplePage} />
        <Redirect from="" to="/SamplePage" />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
</Router>;
