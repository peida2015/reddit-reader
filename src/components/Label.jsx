import React, { Component } from 'react';
// import PostActions from '../actions/PostActions.js';
// import { Container } from 'flux/utils';

class Label extends Component {

  render () {
    return (
      <span className="small-label">
        <span>{this.props.subreddit}</span>
        <span className="label-delete" onClick={this.props.removeAction}>x</span>
      </span>
    );
  }
}

export default Label;
