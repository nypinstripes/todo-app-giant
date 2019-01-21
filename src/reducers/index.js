import { combineReducers } from 'redux';
import { getBasicReducer } from '../utils/helperUtils';
import {
  SET_SCROLLBAR_OFFSET,
  SET_TODO_CREATED,
  SET_TODOS,
  SET_TODOS_UPDATED
} from '../actions/actions';

const scrollOffset = (state = 0, action) => {
  return getBasicReducer({ action, name: SET_SCROLLBAR_OFFSET, state });
};

const todoCreated = (state = {}, action) => {
  return getBasicReducer({ action, name: SET_TODO_CREATED, state });
};

const todos = (state = [], action) => {
  return getBasicReducer({ action, name: SET_TODOS, state });
};

const todosUpdated = (state = false, action) => {
  return getBasicReducer({ action, name: SET_TODOS_UPDATED, state });
};

const rootReducer = combineReducers({
  scrollOffset,
  todoCreated,
  todos,
  todosUpdated
});

export default rootReducer;
