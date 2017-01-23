import React, { Component } from 'react';
import PostCard from './PostCard.jsx';


class PIndex extends Component {

  componentWillMount() {
    if (this.props.params.subreddits) {
      let subreddits = this.parseSubredditsParams(this.props.params.subreddits);
      for (let idx in subreddits) {
        if (subreddits[idx] === "") {
          continue;
        }
        this.props.fetchPosts(subreddits[idx], true);
      };
    } else {
      this.props.fetchPosts();
    }
  }

  parseSubredditsParams (subredditsParam) {
    let subreddits = subredditsParam.split("+");
    if (subreddits.length > 1) {
      return subreddits;
    }

    let subreddits2 = decodeURIComponent(subredditsParam).split(",");

    return subreddits.length < subreddits2.length ? subreddits2 : subreddits;
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.subreddits !== nextProps.subreddits ||
          this.props.posts !== nextProps.posts;
  }

  componentWillUpdate(nextProps) {
    if (nextProps.subreddits.size === 0 && !this.props.apistatus) {
      this.props.fetchPosts();
    }
  }

  render () {

    let postsMap = this.props.posts.values();
    let posts = [];

    for (let subredditListing of postsMap) {
      posts = posts.concat(subredditListing.posts);
    }

    posts = posts.map((post)=>{
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
