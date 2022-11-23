import { TypedDispatch } from '../../store';
import { remove } from '../todo.action';
import { todoIdType } from '../todo.types';

const removeTodo = (id: todoIdType) => {
  return async (dispatch: TypedDispatch) => {
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'DELETE',
    });
    dispatch(remove(id));
  };
};

export default removeTodo;
