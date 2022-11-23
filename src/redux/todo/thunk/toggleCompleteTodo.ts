import { TypedDispatch } from '../../store';
import { toggleComplete } from '../todo.action';
import { isCompleteType, todoIdType } from '../todo.types';

const toggleCompleteTodo = (id: todoIdType, isComplete: isCompleteType) => {
  return async (dispatch: TypedDispatch) => {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isComplete: !isComplete,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const todo = await response.json();
    dispatch(toggleComplete(todo.id));
  };
};

export default toggleCompleteTodo;
