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

  componentWillReceiveProps() {

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
      if (subreddits.join("+") !== nextProps.params.subreddits) {
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

    posts = posts.sort((a, b) => {
      let aNetUps = parseInt(a.data.ups, 10) - parseInt(a.data.downs, 10);
      let bNetUps = parseInt(b.data.ups, 10) - parseInt(b.data.downs, 10);
      return bNetUps - aNetUps;
    }).map((post)=>{
      return <PostCard key={ post.data.id } post={post}
        currentSubreddits={ this.props.subreddits }
        fetchPosts={ this.props.fetchPosts }/>
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
