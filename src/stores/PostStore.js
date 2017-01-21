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
        return state.set(action.subreddit, action.posts);

      default:
      return state;
    }
  }

}

export default new PostStore();
