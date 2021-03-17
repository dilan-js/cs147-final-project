import store from './store';

export const dispatch = store.dispatch;

export const getState = store.getState;

export const cleanAction = (reducer) => {
  dispatch({type: 'clean_' + reducer});
};

export const setAction = (reducer, data) => {
  dispatch({type: 'set_' + reducer, payload: data});
};
