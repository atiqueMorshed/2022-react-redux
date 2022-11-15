import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Todo from './Todo';

export default function TodoList() {
  const todoList = useSelector((state: RootState) => state.todos);
  console.log(todoList);
  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      <Todo />
    </div>
  );
}
