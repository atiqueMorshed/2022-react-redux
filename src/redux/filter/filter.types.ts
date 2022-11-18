export type completeStatusType = string;
export type colorSatusType = string;

export type filterActionType = {
  type: string;
  payload: string;
};

export type filterStateType = {
  completeStatus: completeStatusType;
  colorStatus: colorSatusType;
};
