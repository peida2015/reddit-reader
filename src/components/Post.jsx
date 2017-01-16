import React, { Component } from 'react';

class Post extends Component {
  componentWillMount() {
  }

  render () {
    return (
      <div>
        <div>{"Post"+this.props.params.postid}</div>
      </div>
    );
  }
}

export default Post;
