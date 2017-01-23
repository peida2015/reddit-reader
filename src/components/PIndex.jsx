import React, { Component } from 'react';
import PostCard from './PostCard.jsx';
import { browserHistory } from 'react-router';

class PIndex extends Component {

  componentWillMount(nextProps) {
    if (this.props.params.subreddits) {
      // Handle manually entered :subreddits param
      let subreddits = this.parseSubredditsParams(this.props.params.subreddits);

      for (let idx in subreddits) {
        // Submit (attempt to add) a new subreddit only if it's not already here
        if (!this.props.subreddits.has(subreddits[idx])) {
          this.props.fetchPosts(subreddits[idx], true);
        }
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
    // Default to fetching the HOT listing
    if (nextProps.subreddits.size === 0 && !this.props.apistatus) {
      this.props.fetchPosts();
    };

    // "Expected" :subreddits URL param : subreddits.join("+");  Update if different.
    if (nextProps.posts.size === nextProps.subreddits.size) {
      let subreddits = nextProps.subreddits.toJS();
      if (subreddits.join("+") !== this.props.params.subreddits) {
        browserHistory.push(`/index/${subreddits.join("+")}`);
      }
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
