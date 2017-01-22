import ApiActions from './actions/ApiActions.js';
import * as req from 'd3-request';

let baseURL = "http://www.reddit.com"
let ApiUtil = {
  fetchPosts (subreddit = "", groupReq) {
    ApiActions.requestMade();

    if (subreddit === "") {
      req.json(`${baseURL}/hot.json`, ApiActions.receiveHotPosts);
    } else {
      // Closure to include groupReq param to indicate whether it's part of a group request
      let callback = (function (APIActions, groupParam) {
        return function (listing) {
          APIActions.receivePosts(listing, groupParam);
        };
      })(ApiActions, groupReq);

      req.json(`${baseURL}/r/${subreddit}.json`, callback);
    }
  }
}

export default ApiUtil;
