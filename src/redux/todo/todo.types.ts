export type todoIdType = string;
export type todoContentType = string;
export type dateType = string;
export type isCompleteType = boolean;
export type todoColorType = string;

export type todoActionType = {
  type: string;
  payload?: any;
};

export type todoType = {
  id: todoIdType;
  todoContent: todoContentType;
  date: string;
  isComplete: boolean;
  color: todoColorType;
};

export type todoStateType = todoType[];
