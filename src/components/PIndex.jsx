import React, { Component } from 'react';
import PostCard from './PostCard.jsx';


class PIndex extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  render () {
    let posts = this.props.posts.map((post)=>{
      return <PostCard key={ post.data.id } post={post} />
    })

    return (
      <div className="container">
        <div className="row">
          { posts }
        </div>
      </div>
    );
  }
}

export default PIndex;
