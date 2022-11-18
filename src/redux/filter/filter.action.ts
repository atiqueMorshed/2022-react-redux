import { COMPLETESTATUS, COLORSTATUS } from './filter.action-type';
import { colorSatusType, completeStatusType } from './filter.types';

export const changeCompleteStatus = (isComplete: completeStatusType) => {
  return {
    type: COMPLETESTATUS,
    payload: isComplete,
  };
};

export const changeColorStatus = (color: colorSatusType) => {
  return {
    type: COLORSTATUS,
    payload: color,
  };
};
