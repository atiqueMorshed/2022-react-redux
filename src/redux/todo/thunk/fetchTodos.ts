import { TypedDispatch } from '../../store';
import { load } from '../todo.action';

const fetchTodos = async (dispatch: TypedDispatch) => {
  const response = await fetch('http://localhost:4000/todos');
  const todos = await response.json();
  dispatch(load(todos));
};

export default fetchTodos;
