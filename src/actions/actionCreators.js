import { SET_SCROLLBAR_OFFSET } from './actions';

export const setScrollBarOffset = payload => {
  return async dispatch => {
    return await dispatch({ payload, type: SET_SCROLLBAR_OFFSET });
  };
};
