import { CHANGECOLOR } from './todo.action-type';

export type todoIdType = string;
export type todoContentType = string;
export type todoColorType = string;

export type todoActionType = {
  type: string;
  payload?: any;
};

export type todoStateType = {
  todoId: todoIdType;
  todoContent: todoContentType;
  date: string;
  isComplete: boolean;
  color?: todoColorType;
}[];
