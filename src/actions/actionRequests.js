import { setRequestOptions } from '../utils/requestUtils';
import { setTodoCreated } from './actionCreators';

export const deleteTodo = async params => {
  const { item: { id }} = params;

  return await fetch(`/todos/${id}`, setRequestOptions({ method: 'DELETE'}))
    .then(res => ({ data: res.json(), res }))
    .then(response => {
      const { data, res } = response;

      if (res.status === 202) return data;

      // TODO: Possibly a toaster would be smoothest.
      alert(data.message);

      return false;
    }).catch(err => console.log(err));
};

export const createTodo = async params => {
  const { dispatch, text } = params;
  let options = {
    data: { text },
    method: 'POST'
  };

  return await fetch('/todos', setRequestOptions(options))
    .then(res => ({ data: res.json(), res }))
    .then(response => {
      const { data, res } = response;

      if (res.status === 201) {
        dispatch(setTodoCreated({
          message: 'Todo Created!',
          status: 'success'
        }));

        return data;
      }

      dispatch(setTodoCreated({
        message: data.message,
        status: 'error'
      }));

      return false;
    }).catch(err => console.log(err));
};

export const retrieveTodos = async () => {
  return await fetch('/todos', setRequestOptions({}))
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const updateTodo = async params => {
  const { item, item: { id }, type } = params;
  let nextItem = item;
  nextItem.status = type;

  let options = {
    data: { item: nextItem },
    method: 'PUT'
  };

  return await fetch(`/todos/${id}`, setRequestOptions(options))
    .then(res => ({ data: res.json(), res }))
    .then(response => {
      const { data, res } = response;

      if (res.status === 200) return data;

      // TODO: Possibly a toaster would be smoothest.
      alert(data.message);

      return false;
    }).catch(err => console.log(err));
};

export const updateAllTodos = async params => {
  const { type } = params;

  let options = {
    data: { type },
    method: 'PUT'
  };

  return await fetch('/todos', setRequestOptions(options))
    .then(res => ({ data: res.json(), res }))
    .then(response => {
      const { data, res } = response;

      if (res.status === 200) return data;

      // TODO: Possibly a toaster would be smoothest.
      alert(data.message);

      return false;
    }).catch(err => console.log(err));
};
