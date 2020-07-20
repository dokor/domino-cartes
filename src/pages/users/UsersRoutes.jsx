// @ flow

import React from 'react';
import { Route } from 'react-router-dom';

import { USER_DETAILS_PAGE_ROUTE, USER_PAGE_ROUTE } from '../../const';
import Users from './Users';
import UserDetails from './UserDetails';

function UserRoutes() {
  return (
    <div>
      <Route exact path={USER_PAGE_ROUTE} component={Users} />
      <Route path={USER_DETAILS_PAGE_ROUTE} component={UserDetails} />
    </div>
  );
}

export default UserRoutes;
