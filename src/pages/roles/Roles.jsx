// @flow

import React from 'react';
import { Col, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import RoleList from '../../components/roles/RoleList';
import RoleDetails from './RoleDetails';
import roleApi from '../../network/api/roleApi';
import type { Role } from '../../types/rolesTypes';
import { store } from '../../network/reduce';
import { ROLES } from '../../state/roles/roleReducer';
import { notifyError } from '../../network/notification';
import { Translate } from 'react-redux-i18n';


type Props = {
  roles: Object,
  dispatch: Function,
  roleSelected: Role
};

class Roles extends React.Component<Props> {
  componentWillMount() {
    roleApi
      .fetch()
      .then(response => response.json())
      .then(responseJson => this.props.dispatch(store(ROLES, responseJson)))
      .catch(notifyError(this.props.dispatch));
  }

  componentDidUpdate(prevProps) {
    if (this.props.roleSelected !== prevProps.roleSelected) {
      roleApi
        .fetch()
        .then(response => response.json())
        .then(responseJson => this.props.dispatch(store(ROLES, responseJson)))
        .catch(notifyError(this.props.dispatch));
    }
  }

  render() {
    if (this.props.roles.size === 0) {
      return false;
    }
    return (
      <div>
        <h1 className="content-title">
          <Translate value="roles.TITLE" />
        </h1>
        <div className="content">
          <Row className="row">
            <Col sm="6"> <RoleList roles={this.props.roles} /> </Col>
            {this.props.roleSelected !== null && <Col sm="6">
              <RoleDetails
                formInitial={this.props.roleSelected}
                permissionsAvailable={this.props.roles.permissionsAvailable}
                initialValues={this.props.roleSelected}
              />
            </Col>}
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  roles: state.role.roles,
  roleSelected: state.role.roleSelected
}))(Roles));
