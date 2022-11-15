import { useSelector } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools());

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Selectors And Dispatch
export const useTodosSelector = () =>
  useSelector((state: RootState) => state.todos);
