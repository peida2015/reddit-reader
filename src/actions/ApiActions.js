// This file organizes the success callbacks actions and sends data to the dispatcher after receiving success responses in ApiUtils.

import Dispatcher from '../Dispatcher';
import SubredditActions from './SubredditActions';

let ApiActions = {
  requestMade () {
    Dispatcher.dispatch({
      type: "API_CALLED"
    });
  },

  receiveHotPosts (listing) {
    Dispatcher.dispatch({
      type: "HOT_POSTS_RECEIVED",
      subreddit: "HOT",
      posts: listing.data.children,
      after: listing.data.after
    });

    Dispatcher.dispatch({
      type: "API_RESPONDED"
    });
  },

  receivePosts (listing, groupReq) {
    if (listing !== null) {
      let subreddit = listing.data.children[0].data.subreddit
      Dispatcher.dispatch({
        type: "POSTS_RECEIVED",
        subreddit: subreddit,
        posts: listing.data.children,
        after: listing.data.after
      });

      SubredditActions.addSubreddit(subreddit);
      Dispatcher.dispatch({
        type: "API_RESPONDED"
      });
    } else if (!groupReq){
      SubredditActions.invalidSubreddit();
      Dispatcher.dispatch({
        type: "API_RESPONDED"
      });
    };

  }
};

export default ApiActions;
