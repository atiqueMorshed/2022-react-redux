import {
  changeColorStatus,
  changeCompleteStatus,
} from '../redux/filter/filter.action';
import {
  colorSatusType,
  completeStatusType,
} from '../redux/filter/filter.types';
import {
  useFilterSelector,
  useTodosSelector,
  useTypedDispatch,
} from '../redux/store';

const Footer = () => {
  const todos = useTodosSelector();
  const filter = useFilterSelector();
  const dispatch = useTypedDispatch();

  const handleCompleteStatus = (status: completeStatusType) => {
    dispatch(changeCompleteStatus(status));
  };
  const handleColorStatus = (color: colorSatusType) => {
    dispatch(changeColorStatus(color));
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{todos.length} tasks left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          onClick={() => handleCompleteStatus('ALL')}
          className={`cursor-pointer ${
            filter.completeStatus === 'ALL' && 'font-bold'
          }`}
        >
          All
        </li>
        <li>|</li>
        <li
          onClick={() => handleCompleteStatus('INCOMPLETE')}
          className={`cursor-pointer ${
            filter.completeStatus === 'INCOMPLETE' && 'font-bold'
          }`}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          onClick={() => handleCompleteStatus('COMPLETE')}
          className={`cursor-pointer ${
            filter.completeStatus === 'COMPLETE' && 'font-bold'
          }`}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          onClick={() => handleColorStatus('GREEN')}
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            filter.colorStatus === 'GREEN' && 'bg-green-500'
          }`}
        ></li>
        <li
          onClick={() => handleColorStatus('RED')}
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            filter.colorStatus === 'RED' && 'bg-red-500'
          }`}
        ></li>
        <li
          onClick={() => handleColorStatus('YELLOW')}
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            filter.colorStatus === 'YELLOW' && 'bg-yellow-500'
          }`}
        ></li>
      </ul>
    </div>
  );
};
export default Footer;
