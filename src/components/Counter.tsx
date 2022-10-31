// Packages
import React, { useState } from 'react';
import { connect } from 'react-redux';

// functions
import { increment, decrement } from '../redux/counter/actions';

// Type Definitions
import { StateType } from '../redux/state.type';

// Components
import Tooltip from './Tooltip';

type CounterProps = {
  counter: number;
  increment: any;
  decrement: any;
  id: number;
};

type ownPropsType = {
  id: number;
};

const Counter = ({ counter, increment, decrement, id }: CounterProps) => {
  const [customValue, setCustomValue] = useState(1);
  console.log('Accessing id from Counter component: ', id);
  return (
    <div className="bg-gray-50 w-11/12 max-w-[600px] mx-auto relative">
      <div className="flex flex-col justify-center items-center gap-4 py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="flex items-end gap-2">
          <span className="text-4xl md:text-7xl font-bold tracking-tight text-gray-900">
            {counter}
          </span>
          <span className="text-lg font-medium">unit(s)</span>
        </h2>
        <div className="interaction">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="floating_customValue"
              id="floating_customValue"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setCustomValue(parseInt(e.target.value))}
              required
            />
            <label
              htmlFor="floating_customValue"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              INCREMENT BY ...
            </label>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => increment(customValue)}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base text-white font-bold hover:bg-indigo-700"
              >
                Increment
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <button
                onClick={() => decrement(customValue)}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-pink-700 px-5 py-3 text-base font-bold text-white hover:bg-pink-800"
              >
                Decrement
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 right-5">
        <Tooltip text="Add New Counter">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-green-500 hover:text-green-600 active:text-green-900 hover:rotate-90 transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StateType, ownProps: ownPropsType) => {
  console.log('Accessing ownProps from mapStateToProps: id-', ownProps);
  return {
    counter: state.counter.value,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: (value = 1) => dispatch(increment(value)),
    decrement: (value = 1) => dispatch(decrement(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
