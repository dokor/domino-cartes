// @flow

import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import hasPermission from '../services/permissionService';

type Props = {
  component: any,
  authorization: string,
  isConnected: boolean,
}

function PrivateRoute({ component: Component, authorization, isConnected, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authorization) {
          if (hasPermission(authorization)) {
            return <Component {...props} />;
          }
          return <Redirect to="/home" />;
        }
        if (isConnected) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
}

export default withRouter(connect(
  state => ({
    isConnected: state.login.isConnected,
  }),
)(PrivateRoute));
