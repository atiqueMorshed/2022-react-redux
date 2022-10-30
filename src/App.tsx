import React from 'react';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="">
        <h1 className="text-3xl">React Redux</h1>
        <Counter />
      </div>
    </Provider>
  );
};

export default App;
