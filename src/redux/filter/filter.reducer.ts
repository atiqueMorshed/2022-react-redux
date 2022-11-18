import { COLORSTATUS, COMPLETESTATUS } from './filter.action-type';
import { filterActionType, filterStateType } from './filter.types';

const initialState: filterStateType = {
  completeStatus: 'ALL',
  colorStatus: 'NONE',
};

const filterReducer = (
  state: filterStateType = initialState,
  action: filterActionType
) => {
  switch (action.type) {
    case COMPLETESTATUS:
      return {
        ...state,
        completeStatus: action.payload,
      };
    case COLORSTATUS: {
      if (state.colorStatus === action.payload) {
        return {
          ...state,
          colorStatus: 'NONE',
        };
      }
      return {
        ...state,
        colorStatus: action.payload,
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
