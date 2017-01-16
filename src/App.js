import { IndexRedirect, Router, Route, browserHistory } from 'react-router';
import React, { Component } from 'react';
import logo from '../public/Reddit-icon.png';
import Home from './components/Home.jsx';
import PIndex from './components/PIndex.jsx';
import Post from './components/Post.jsx';

class App extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ Home }>
          <IndexRedirect to="/index"/>
          <Route path="/index" component={ PIndex } />
          <Route path="/post/:postid" component={ Post } />
        </Route>
      </Router>
    );
  }
}

export default App;
