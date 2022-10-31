import rootReducer from '../rootReducer';
type ActionType = {
  type: string;
  payload: any;
};
// Custom Middleware
const myLogger = (store: any) => (next: any) => (action: ActionType) => {
  console.log('Action: ', JSON.stringify(action));
  console.log('Current state: ', JSON.stringify(store.getState()));

  const nextState = [action].reduce(rootReducer, store.getState());
  console.log('Next state:', JSON.stringify(nextState));

  return next(action);
};

export default myLogger;
