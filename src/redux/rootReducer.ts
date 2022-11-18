import { combineReducers } from 'redux';
import filterReducer from './filter/filter.reducer';
import { filterStateType } from './filter/filter.types';
import todoReducer from './todo/todo.reducer';
import { todoStateType } from './todo/todo.types';

type rootReducerType = {
  todos: todoStateType;
  filter: filterStateType;
};

const rootReducer = combineReducers<rootReducerType>({
  todos: todoReducer,
  filter: filterReducer,
});

export default rootReducer;
