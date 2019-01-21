import {
  createTodo,
  deleteTodo,
  retrieveTodos,
  updateAllTodos,
  updateTodo
} from './actionRequests';

import {
  SET_SCROLLBAR_OFFSET,
  SET_TODO_CREATED,
  SET_TODOS,
  SET_TODOS_UPDATED
} from './actions';

export const createNewTodo = params => {
  return async dispatch => {
    try {
      const payload = await createTodo(params);

      if (payload) await dispatch({ payload, type: SET_TODOS });
    } catch(err) {
      console.log(err);
    }
  };
};

export const setAllTodosUpdated = params => {
  return async dispatch => {
    try {
      const payload = await updateAllTodos(params);

      await dispatch({ payload, type: SET_TODOS });
      await dispatch(setTodosUpdated(true));

    } catch(err) {
      console.log(err);
    }
  };
};

export const setTodoCreated = payload => {
  return async dispatch => {
    return await dispatch({ payload, type: SET_TODO_CREATED });
  };
};

export const setTodoDeleted = params => {
  return async dispatch => {
    try {
      const payload = await deleteTodo(params);

      if (payload) await dispatch({ payload, type: SET_TODOS });
    } catch(err) {
      console.log(err);
    }
  };
};

export const setScrollBarOffset = payload => {
  return async dispatch => {
    return await dispatch({ payload, type: SET_SCROLLBAR_OFFSET });
  };
};

export const setTodos = () => async dispatch => {
  try {
    const payload = await retrieveTodos();

    await dispatch({ payload, type: SET_TODOS });
  } catch(err) {
    console.log(err);
  }
};

export const setTodoUpdated = params => {
  return async dispatch => {
    try {
      const payload = await updateTodo(params);

      await dispatch({ payload, type: SET_TODOS });
      await dispatch(setTodosUpdated(true));

    } catch(err) {
      console.log(err);
    }
  };
};

export const setTodosUpdated = payload => {
  return async dispatch => {
    await dispatch({ payload, type: SET_TODOS_UPDATED });
  };
};
