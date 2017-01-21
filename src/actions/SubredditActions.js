import Dispatcher from '../Dispatcher';

let SubredditActions = {
  addSubreddit (subreddit) {
    Dispatcher.dispatch({
      type: "ADD_SUBREDDIT",
      subreddit: subreddit
    });
  },

  removeSubreddit (subreddit) {
    Dispatcher.dispatch({
      type: "REMOVE_SUBREDDIT",
      subreddit: subreddit
    });
  }
};

export default SubredditActions;
