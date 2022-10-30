import { INCREMENT, DECREMENT } from './action.types';

// Type Definitions
interface CounterState {
  value: number;
}

interface CounterAction {
  type: string;
  payload: number;
}

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
        value: state.value + 1,
      };

    case DECREMENT:
      return {
        ...state,
        value: state.value - 1,
      };

    default:
      return state;
  }
};

export default counterReducer;
