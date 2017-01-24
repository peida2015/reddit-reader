import React, { Component } from 'react';

class Label extends Component {

  render () {
    return (
      <span className="small-label">
        <span className="small-label">{this.props.subreddit}</span>
        <span className="label-delete" onClick={this.props.removeAction}>x</span>
      </span>
    );
  }
}

export default Label;
