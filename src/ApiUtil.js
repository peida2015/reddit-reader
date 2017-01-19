import ApiActions from './actions/ApiActions.js';
import * as req from 'd3-request';

let baseURL = "http://www.reddit.com"
let ApiUtil = {
  fetchPosts (subreddit = "") {
    if (subreddit === "") {
      req.json(`${baseURL}/hot.json`, ApiActions.receivePosts);
    } else {
      req.json(`${baseURL}/r/${subreddit}.json`, ApiActions.receivePosts);
    }
  }
}

export default ApiUtil;