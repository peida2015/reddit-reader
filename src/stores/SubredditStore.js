import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import Immutable from 'immutable';

class SubredditStore extends ReduceStore {
  constructor () {
    super(Dispatcher);
  }

  getInitialState () {
    return Immutable.Set();
  }

  reduce (state, action) {
    switch (action.type) {
      case "ADD_SUBREDDIT":
        return state.add(action.subreddit.toLowerCase());

      case "REMOVE_SUBREDDIT":
        return state.delete(action.subreddit.toLowerCase());

      default:
      return state;
    }
  }

}

export default new SubredditStore();
