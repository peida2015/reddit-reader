import React, { Component } from 'react';

class Home extends Component {
  render () {
    return (
      <div>
        <h2>Reddit Reader</h2>
        { this.props.children }
      </div>
    );
  }
}

export default Home;
