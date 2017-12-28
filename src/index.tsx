import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { StoreState } from './types/index';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/index'

import './index.css';

const store = createStore<StoreState>(rootReducer, {
  components: new Map()
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider> ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();