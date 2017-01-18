import React, { Component } from 'react';

class PIndex extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  render () {
    // debugger
    let posts = this.props.posts.map((post)=>{
      return post.data.title
    })
    return (
      <div>
        <div>PIndex</div>
        {
          posts
        }
      </div>
    );
  }
}

export default PIndex;
