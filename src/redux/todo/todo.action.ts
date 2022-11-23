import {
  ADD,
  REMOVE,
  COMPLETEALL,
  CLEARCOMPLETE,
  TOGGLECOMPLETE,
  CHANGECOLOR,
  LOAD,
} from './todo.action-type';

// Type Definitions
import {
  todoColorType,
  todoIdType,
  todoStateType,
  todoType,
} from './todo.types';

export const load = (todos: todoStateType) => {
  return {
    type: LOAD,
    payload: todos,
  };
};

export const add = (todo: todoType) => {
  return {
    type: ADD,
    payload: todo,
  };
};

export const remove = (id: todoIdType) => {
  return {
    type: REMOVE,
    payload: id,
  };
};

export const toggleComplete = (id: todoIdType) => {
  return {
    type: TOGGLECOMPLETE,
    payload: id,
  };
};

export const completeAll = () => {
  return {
    type: COMPLETEALL,
  };
};

export const clearComplete = () => {
  return {
    type: CLEARCOMPLETE,
  };
};

export const changeColor = (id: todoIdType, color: todoColorType) => {
  return {
    type: CHANGECOLOR,
    payload: {
      id,
      color,
    },
  };
};
