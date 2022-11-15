import { useTodosSelector } from '../redux/store';
import Todo from './Todo';

export default function TodoList() {
  const todoList = useTodosSelector();
  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {todoList.map((todo) => (
        <Todo key={todo.todoId} {...todo} />
      ))}
    </div>
  );
}
