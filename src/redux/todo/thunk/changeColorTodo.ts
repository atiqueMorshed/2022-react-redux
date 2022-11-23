import { TypedDispatch } from '../../store';
import { changeColor } from '../todo.action';
import { todoColorType, todoIdType } from '../todo.types';

const changeColorTodo = (id: todoIdType, color: todoColorType) => {
  return async (dispatch: TypedDispatch) => {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        color,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const todo = await response.json();
    dispatch(changeColor(todo.id, todo.color));
  };
};

export default changeColorTodo;
