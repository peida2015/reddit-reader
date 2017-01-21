// This file organizes the success callbacks actions and sends data to the dispatcher after receiving success responses in ApiUtils.

import Dispatcher from '../Dispatcher';

let ApiActions = {
  receiveHotPosts (listing) {
    Dispatcher.dispatch({
      type: "HOT_POSTS_RECEIVED",
      subreddit: "HOT",
      posts: listing.data.children
    });
  },

  receivePosts (listing) {
    Dispatcher.dispatch({
      type: "POSTS_RECEIVED",
      subreddit: listing.data.children[0].subreddit,
      posts: listing.data.children
    });
  }
};

export default ApiActions;
