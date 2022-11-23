import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import { TypedDispatch } from '../../store';
import { todoContentType } from '../todo.types';
import { add } from '../todo.action';

const addTodo = (todoContent: todoContentType) => {
  return async (dispatch: TypedDispatch) => {
    const response = await fetch('http://localhost:4000/todos', {
      method: 'POST',
      body: JSON.stringify({
        id: uuidv4(),
        todoContent: todoContent,
        date: moment().format(),
        isComplete: false,
        color: 'GREEN',
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const todo = await response.json();
    dispatch(add(todo));
  };
};

export default addTodo;
