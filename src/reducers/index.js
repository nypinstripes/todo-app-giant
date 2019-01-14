import { combineReducers } from 'redux';
import { getBasicReducer } from '../utils/helperUtils';
import { SET_SCROLLBAR_OFFSET } from '../actions/actions';

const scrollOffset = (state = 0, action) => {
  return getBasicReducer({ action, name: SET_SCROLLBAR_OFFSET, state });
};

const rootReducer = combineReducers({
  scrollOffset
});

export default rootReducer;
