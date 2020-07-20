// @flow

import 'font-awesome-5/src/lib/css/all.min.css';
import 'react-dates/initialize';
import 'react-datetime/css/react-datetime.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-table/react-table.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import thunk from 'redux-thunk';
import 'codemirror/lib/codemirror.css';

import App from './App';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/login/Login';
import { LOGIN_PAGE_ROUTE } from './const';
import './sass/app.scss';
import fr from './i18n/locales/fr';
import en from './i18n/locales/en';
import reducers from './state/reducers';
import { initializeSessionService } from './services/sessionService';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);
initializeSessionService(store);
syncTranslationWithStore(store);
store.dispatch(loadTranslations({
  fr,
  en,
}));
store.dispatch(setLocale('fr'));

/* eslint-disable react/jsx-filename-extension */
function wrapApp(RootComponent, reduxStore) {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter basename="/admin">
        <Switch>
          <Route exact path={LOGIN_PAGE_ROUTE} component={Login} />
          <PrivateRoute path="/" component={RootComponent} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

// $FlowFixMe
ReactDOM.render(wrapApp(App, store), document.getElementById('root'));
