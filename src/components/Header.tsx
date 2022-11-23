import { useState } from 'react';
import tickImage from '../assets/images/double-tick.png';
import noteImage from '../assets/images/notes.png';
import { useTypedDispatch } from '../redux/store';
import addTodo from '../redux/todo/thunk/addTodo';
import { clearComplete, completeAll } from '../redux/todo/todo.action';
const Header = () => {
  const [todoInput, setTodoInput] = useState('');

  const dispatch = useTypedDispatch();

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todoInput && dispatch(addTodo(todoInput));
    setTodoInput('');
  };
  const handleCompleteAll = () => dispatch(completeAll());
  const handleClearComplete = () => dispatch(clearComplete());

  return (
    <div>
      <form
        onSubmit={handleAdd}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          className="w-full text-lg px-4 py-1 bg-plusIcon border-none outline-none bg-gray-100 text-gray-500"
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
          onClick={handleCompleteAll}
          className="flex space-x-1 cursor-pointer"
        >
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li onClick={handleClearComplete} className="cursor-pointer">
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
