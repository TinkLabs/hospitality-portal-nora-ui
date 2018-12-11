import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './redux/store';
import AppRouter from './AppRouter.js';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Layout from './Layout';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </MuiThemeProvider>
  </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
