import { v4 as uuidv4 } from 'uuid';
import {
  ADD,
  REMOVE,
  COMPLETEALL,
  CLEARCOMPLETE,
  TOGGLECOMPLETE,
  CHANGECOLOR,
} from './todo.action-type';
import { todoActionType, todoStateType } from './todo.types';

const initialState = [] as todoStateType;
const todoReducer = (state = initialState, action: todoActionType) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          todoId: uuidv4(),
          todoContent: action.payload,
          date: new Date().toISOString(),
          isComplete: false,
        },
      ];

    case REMOVE:
      return state.filter((todo) => todo.todoId !== action.payload);

    case COMPLETEALL:
      return state.map((todo) => ({
        ...todo,
        isComplete: true,
      }));

    case CLEARCOMPLETE:
      return state.map((todo) => ({
        ...todo,
        isComplete: false,
      }));

    case TOGGLECOMPLETE:
      return state.map((todo) => {
        todo.todoId === action.payload
          ? {
              ...todo,
              isComplete: !todo.isComplete,
            }
          : todo;
      });

    case CHANGECOLOR:
      return state.map((todo) => {
        todo.todoId === action.payload.todoId
          ? {
              ...todo,
              color: action.payload.color,
            }
          : todo;
      });
  }
};

export default todoReducer;
