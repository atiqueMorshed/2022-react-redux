import { CHANGECOLOR } from './todo.action-type';
export type todoContentType = {
  todoContent: string;
};

export type todoIdType = {
  todoId: string;
};

export type todoColorType = {
  color: string;
};

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
