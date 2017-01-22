import { IndexRedirect, Router, Route, browserHistory } from 'react-router';
import React, { Component } from 'react';
import Home from './components/Home.jsx';
import PIndex from './components/PIndex.jsx';

class App extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ Home }>
          <IndexRedirect to="/index"/>
          <Route path="/index" component={ PIndex } />
          <Route path="/index/:subreddits" component={ PIndex } />
        </Route>
      </Router>
    );
  }
}

export default App;
