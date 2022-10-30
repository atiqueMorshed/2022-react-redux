import { INCREMENT, DECREMENT } from './action.types';

// Type Definitions
export type CounterState = {
  value: number;
};

type CounterAction = {
  type: string;
  payload: number;
};

// Params
const initialState: CounterState = {
  value: 0,
};

// Reducer
const counterReducer = (state = initialState, action: CounterAction) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + action.payload,
      };

    case DECREMENT:
      return {
        ...state,
        value: state.value - action.payload,
      };

    default:
      return state;
  }
};

export default counterReducer;
