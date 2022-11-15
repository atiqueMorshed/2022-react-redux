import { combineReducers } from 'redux';
import todoReducer from './todo/todo.reducer';
import { todoStateType } from './todo/todo.types';

type rootReducerType = {
  todos: todoStateType;
};

const rootReducer = combineReducers<rootReducerType>({
  todos: todoReducer,
});

export default rootReducer;
