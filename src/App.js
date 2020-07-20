// @flow
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import NotificationsSystem from 'reapop';

import Home from './pages/Home';
import History from './pages/history/History';
import Header from './components/layout/header/Header';
import AsideNav from './components/layout/AsideNav';
import {
  HISTORY_PAGE_ROUTE,
  HOME_PAGE_ROUTE, LOG_API_PAGE_ROUTE,
  ROLES_PAGE_ROUTE,
  USER_PAGE_ROUTE,
  SCHEDULED_PAGE_ROUTE,
  LOGS_PAGE_ROUTE,
} from './const';
import ConfirmationModal from './components/modaleNotification/ConfirmationModal';
import theme from './components/modaleNotification/theme/index';
import PrivateRoute from './components/PrivateRoute';
import UsersRoutes from './pages/users/UsersRoutes';
import Roles from './pages/roles/Roles';
import LogApi from './components/logApi/LogApi';
import Scheduled from './pages/scheduled/Scheduled';
import Logs from './pages/logs/Logs';

class App extends React.Component {
  state = {
    isAsideNavOpen: false,
  };

  render() {
    return (
      /* eslint-disable react/jsx-filename-extension */
      <div id="app">
        <NotificationsSystem theme={theme} />
        <ConfirmationModal />
        <div className="admin-container">
          <Header toggleAsideNav={() => this.setState({
            isAsideNavOpen: !this.state.isAsideNavOpen,
          })}
          />
          <div className="admin-content-container">
            <AsideNav isActive={this.state.isAsideNavOpen} />
            <main id="main-content">
              <Switch>
                <Route exact path={HOME_PAGE_ROUTE} component={Home} />
                <PrivateRoute
                  path={USER_PAGE_ROUTE}
                  authorization="MANAGE_USERS"
                  component={UsersRoutes}
                />
                <PrivateRoute
                  exact
                  path={ROLES_PAGE_ROUTE}
                  authorization="MANAGE_ROLES"
                  component={Roles}
                />
                <PrivateRoute
                  exact
                  path={LOG_API_PAGE_ROUTE}
                  authorization="MANAGE_API_LOGS"
                  component={LogApi}
                />
                <PrivateRoute
                  exact
                  path={SCHEDULED_PAGE_ROUTE}
                  authorization="MANAGE_SYSTEM"
                  component={Scheduled} />
                <PrivateRoute
                  exact
                  path={LOGS_PAGE_ROUTE}
                  authorization="MANAGE_SYSTEM"
                  component={Logs} />
                <Route exact path={HISTORY_PAGE_ROUTE} component={History} />
                <Route path="*" render={() => <Redirect to={HOME_PAGE_ROUTE} />} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
