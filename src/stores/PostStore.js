import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import Immutable from 'immutable';

class PostStore extends ReduceStore {
  constructor () {
    super(Dispatcher);
  }

  getInitialState () {
    return Immutable.Map();
  }

  reduce (state, action) {
    switch (action.type) {
      case "HOT_POSTS_RECEIVED":
        if (state.get("HOT")) {
          return state.set("HOT", { after: action.after,
          posts: state.get("HOT").posts.concat(action.posts) })
        } else {
          let blankMap = state.clear();
          return blankMap.set("HOT",
          { posts: action.posts, after: action.after });
        }

      case "POSTS_RECEIVED":
        let subreddit = action.subreddit.toLowerCase();
        if (state.get("HOT")) {
          let blankMap = state.clear();
          return blankMap.set(subreddit,
            { posts: action.posts, after: action.after });
        } else {
          if (state.get(subreddit)) {
            return state.set(subreddit,
              { posts: state.get(subreddit).posts.concat(action.posts),
                after: action.after });
          } else {
            return state.set(subreddit,
              { posts: action.posts,
                after: action.after });
          }
        }

      case "REMOVE_POSTS":
        return state.delete(action.subreddit);

      default:
      return state;
    }
  }

}

export default new PostStore();
