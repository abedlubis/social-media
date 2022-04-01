import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
      </div>
    </Provider>
  );
}

export default App;
