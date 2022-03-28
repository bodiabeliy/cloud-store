import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import store from './store';
import Navigator from './navigation';

ReactDOM.render(
  <Provider store={store}>
    <Navigator />
  </Provider>,
  document.getElementById('root')
);
