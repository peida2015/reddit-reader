import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';

class PostStore extends ReduceStore {
  constructor () {
    super(Dispatcher);
  }

  getInitialState () {
    return [];
  }

  reduce (state, action) {
    switch (action.type) {
      case "POSTS_RECEIVED":
        return state.concat(action.posts);

      default:
      return state;
    }
  }

}

export default new PostStore();
