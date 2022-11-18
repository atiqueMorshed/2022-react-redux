import moment from 'moment';

import { useFilterSelector, useTodosSelector } from '../redux/store';
import Todo from './Todo';

// type Definitions
import { todoType } from '../redux/todo/todo.types';

export default function TodoList() {
  const todoList = useTodosSelector();
  const filter = useFilterSelector();

  const filterByCompleteStatus = (todo: todoType) => {
    switch (filter.completeStatus) {
      case 'ALL':
        return true;
      case 'INCOMPLETE':
        return !todo.isComplete;
      case 'COMPLETE':
        return todo.isComplete;
    }
  };

  const filterByColorStatus = (todo: todoType) => {
    switch (filter.colorStatus) {
      case 'GREEN':
        return filter.colorStatus === todo.color;
      case 'RED':
        return filter.colorStatus === todo.color;
      case 'YELLOW':
        return filter.colorStatus === todo.color;
      case 'NONE':
        return true;
    }
  };

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {todoList
        .filter(filterByCompleteStatus)
        .filter(filterByColorStatus)
        .map((todo) => (
          <Todo key={todo.todoId} {...todo} />
        ))}
    </div>
  );
}
