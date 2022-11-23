import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import {
  ADD,
  REMOVE,
  COMPLETEALL,
  CLEARCOMPLETE,
  TOGGLECOMPLETE,
  CHANGECOLOR,
  LOAD,
} from './todo.action-type';
import { todoActionType, todoStateType } from './todo.types';

const initialState: todoStateType = [] as todoStateType;

const todoReducer = (
  state: todoStateType = initialState,
  action: todoActionType
) => {
  switch (action.type) {
    case LOAD:
      return action.payload;

    case ADD:
      return [
        ...state,
        {
          todoId: uuidv4(),
          todoContent: action.payload,
          date: moment().format(),
          isComplete: false,
          color: 'GREEN',
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
      return state.map((todo) =>
        todo.todoId === action.payload
          ? {
              ...todo,
              isComplete: !todo.isComplete,
            }
          : todo
      );

    case CHANGECOLOR:
      return state.map((todo) =>
        todo.todoId === action.payload.todoId
          ? {
              ...todo,
              color: action.payload.color,
            }
          : todo
      );
    default:
      return state;
  }
};

export default todoReducer;
