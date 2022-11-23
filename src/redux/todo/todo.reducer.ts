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
      return [...state, action.payload];

    case REMOVE:
      return state.filter((todo) => todo.id !== action.payload);

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
        todo.id === action.payload
          ? {
              ...todo,
              isComplete: !todo.isComplete,
            }
          : todo
      );

    case CHANGECOLOR:
      return state.map((todo) =>
        todo.id === action.payload.id
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
