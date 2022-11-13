import {
  ADD,
  REMOVE,
  COMPLETEALL,
  CLEARCOMPLETE,
  TOGGLECOMPLETE,
  CHANGECOLOR,
} from './todo.action-type';

// Type Definitions
import { todoColorType, todoContentType, todoIdType } from './todo.types';

export const add = (todoContent: todoContentType) => {
  return {
    type: ADD,
    payload: todoContent,
  };
};

export const remove = (todoId: todoIdType) => {
  return {
    type: REMOVE,
    payload: todoId,
  };
};

export const toggleComplete = (todoId: todoIdType) => {
  return {
    type: TOGGLECOMPLETE,
    payload: todoId,
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

export const changeColor = (todoId: todoIdType, color: todoColorType) => {
  return {
    type: CHANGECOLOR,
    payload: {
      todoId,
      color,
    },
  };
};
