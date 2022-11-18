import { useDispatch } from 'react-redux';
import cancelImage from '../assets/images/cancel.png';
import { changeColor, remove, toggleComplete } from '../redux/todo/todo.action';
import { todoColorType, todoType } from '../redux/todo/todo.types';

const Todo = ({ todoId, todoContent, isComplete, date, color }: todoType) => {
  const dispatch = useDispatch();

  const handleRemove = () => dispatch(remove(todoId));
  const handleToggleComplete = () => dispatch(toggleComplete(todoId));
  const handleChangeColor = (color: todoColorType) =>
    dispatch(changeColor(todoId, color));

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        onClick={handleToggleComplete}
        className="rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-green-500 focus-within:border-green-500"
      >
        <input type="checkbox" className="opacity-0 absolute rounded-full" />
        <svg
          className="hidden fill-current w-3 h-3 text-green-500 pointer-events-none"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>

      <div className="flex-1">
        <div className={`select-none ${isComplete ? 'line-through' : ''}`}>
          {todoContent}
        </div>
        <div className="text-xs bg-gray-700 text-gray-200 w-fit py-[1px] px-2 rounded-xl">
          Added on {date}
        </div>
      </div>

      <div
        onClick={() => handleChangeColor('GREEN')}
        className={`${
          color === 'GREEN' && 'bg-green-500'
        } flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500`}
      ></div>

      <div
        onClick={() => handleChangeColor('YELLOW')}
        className={`${
          color === 'YELLOW' && 'bg-yellow-500'
        } flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500`}
      ></div>

      <div
        onClick={() => handleChangeColor('RED')}
        className={`${
          color === 'RED' && 'bg-red-500'
        } flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500`}
      ></div>

      <img
        onClick={handleRemove}
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
      />
    </div>
  );
};

export default Todo;
