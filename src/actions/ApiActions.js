// This file organizes the success callbacks actions and sends data to the dispatcher after receiving success responses in ApiUtils.

import Dispatcher from '../Dispatcher';

let ApiActions = {
  receivePosts (listing) {
    Dispatcher.dispatch({
      type: "POSTS_RECEIVED",
      posts: listing.data.children
    });
  }
};

export default ApiActions;
