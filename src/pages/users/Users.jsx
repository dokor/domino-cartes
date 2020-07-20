// @flow

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import UserSearch from '../../components/users/UserSearch';
import UserList from '../../components/users/UserList';
import type { Criteria, UsersWithRoles } from '../../types/usersTypes';
import { store } from '../../network/reduce';
import { SEARCH_RESULTS_USER } from '../../state/users/userReducer';
import search from '../../state/search';
import { fetchUsers } from '../../state/users/userService';

type Props = {
  usersWithRoles: UsersWithRoles,
  searchResultsUser: [],
  dispatch: Function,
};

class Users extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  searchUsers = (criteria: Criteria) => {
    this.props.dispatch(store(
      SEARCH_RESULTS_USER,
      search(criteria, this.props.usersWithRoles.users),
    ));
  };

  render() {
    return (
      <div>
        <h1 className="content-title">
          <Translate value="users.TITLE" />
        </h1>
        <div className="content">
          <Row className="row">
            <Col xs="12">
              <UserSearch roles={this.props.usersWithRoles.roles} search={this.searchUsers} />
            </Col>
            <Col xs="12">
              <UserList
                users={
                  this.props.searchResultsUser
                    ? this.props.searchResultsUser
                    : this.props.usersWithRoles.users
                }
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  usersWithRoles: state.user.usersWithRoles,
  searchResultsUser: state.user.searchResultsUser,
}))(Users));
