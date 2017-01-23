import ApiActions from './actions/ApiActions.js';
import * as req from 'd3-request';

let baseURL = "http://www.reddit.com"
let ApiUtil = {
  fetchPosts (subreddit = "", groupReq, after) {
    ApiActions.requestMade();

    // Closure to include groupReq param to indicate whether it's part of a group request
    let callback = (function (APIActions, groupParam) {
      return function (listing) {
        APIActions.receivePosts(listing, groupParam);
      };
    })(ApiActions, groupReq);

    if (subreddit === "") {
      req.json(`${baseURL}/hot.json`, ApiActions.receiveHotPosts);
    } else if (subreddit === "HOT"){
      req.json(`${baseURL}/hot.json?limit=30&after=${after}`, ApiActions.receiveHotPosts);
    } else if (after === undefined) {
      req.json(`${baseURL}/r/${subreddit}.json?limit=30`, callback);
    } else if (after !== null){
      req.json(`${baseURL}/r/${subreddit}.json?limit=30&after=${after}`, callback);
    };
  },

  fetchMorePosts (subreddits) {
    let subredditsList = subreddits.keys();

    for (let subreddit of subredditsList) {
      this.fetchPosts(subreddit, true, subreddits.get(subreddit).after);
    };
  }
}

export default ApiUtil;
