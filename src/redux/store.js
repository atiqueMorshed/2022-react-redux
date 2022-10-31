import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import rootReducer from './rootReducer';
import myLogger from './middlewares/myLogger';

// Without Redux DevTools
// const store = createStore(rootReducer, applyMiddleware(myLogger, logger));

// With Redux DevTools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(myLogger, logger))
);

export default store;
