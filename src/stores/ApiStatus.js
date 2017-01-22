import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
// import Immutable from 'immutable';

class ApiStatus extends ReduceStore {
  constructor () {
    super(Dispatcher);
  }

  getInitialState () {
    return false;
  }

  reduce (state, action) {
    switch (action.type) {
      case "API_CALLED":
        return true;

      case "API_RESPONDED":
        return false;

      default:
      return state;
    }
  }

}

export default new ApiStatus();
