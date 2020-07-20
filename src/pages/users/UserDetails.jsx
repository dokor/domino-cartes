// @flow

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { I18n, Localize, Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';

import { USER_PAGE_ROUTE } from '../../const';
import { required } from '../../validator.js';
import type { User, UsersWithRoles } from '../../types/usersTypes';
import PlmPanel from '../../components/panel/PlmPanel';
import PlmFormItem from '../../components/panel/PlmFormItem';
import { displayModal, toggleConfirmationWithModal } from '../../state/notifications/notificationService';
import userApi from '../../network/api/userApi';
import { USERS_WITH_ROLES } from '../../state/users/userReducer';
import { store } from '../../network/reduce';
import { fetchUsers } from '../../state/users/userService';
import { notifyError, notifySuccess } from '../../network/notification';

type Props = {
  usersWithRoles: UsersWithRoles,
  match: {
    params: {
      id: string,
    }
  },
  history: Function,
  dispatch: Function,
};

type State = {
  labelTitle: string,
  userSelected: User,
};

class UserDetails extends React.Component<Props, State> {
  state = {
    labelTitle: '',
    userSelected: {},
  };

  componentDidMount() {
    if (this.props.match.params.id !== null) {
      const userSelectedId = this.props.match.params.id;
      userApi
        .fetch()
        .then(response => response.json())
        .then((usersWithRoles) => {
          this.props.dispatch(store(USERS_WITH_ROLES, usersWithRoles));
          const currentUser = usersWithRoles.users.filter(user => user.id === userSelectedId)[0];
          if (userSelectedId === 'new') {
            this.setState({
              userSelected: {},
              labelTitle: I18n.t('users.NEW_TITLE'),
            });
          } else if (currentUser) {
            this.setState({
              userSelected: currentUser,
              labelTitle: I18n.t('users.EDIT_TITLE', { username: currentUser.userName }),
            });
          }
        });
    }
  }

  saveUser = (user: User) => {
    userApi
      .save(user)
      .then(this.props.dispatch(notifySuccess))
      .then(() => {
        this.props.dispatch(fetchUsers());
        this.props.history.push(USER_PAGE_ROUTE);
      })
      .catch(this.props.dispatch(notifyError));
  };

  deleteUser = (user: User) => {
    userApi
      .delete(user.id)
      .then(this.props.dispatch(notifySuccess))
      .then(() => {
        this.props.dispatch(fetchUsers());
        this.props.history.push(USER_PAGE_ROUTE);
      })
      .catch(this.props.dispatch(notifyError));
  };

  render() {
    if (this.props.usersWithRoles === undefined) {
      return false;
    }
    return (
      <div>
        <h1 className="content-title"><Translate value="users.TITLE" /></h1>
        <div className="content">
          <PlmPanel title={this.state.labelTitle}>
            <Form
              className="form-horizontal"
              onSubmit={this.saveUser}
              initialValues={this.state.userSelected}
              render={({ handleSubmit, submitting, invalid, values }) => (
                <form onSubmit={handleSubmit}>
                  <div className="panel-body">
                    <PlmFormItem label={I18n.t('users.USERNAME')}>
                      <Field
                        className="form-control"
                        type="text"
                        component="input"
                        name="userName"
                        validate={required}
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('users.EMAIL')}>
                      <Field
                        className="form-control"
                        type="email"
                        component="input"
                        name="email"
                        autoComplete="email"
                        validate={required}
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('users.FIRSTNAME')}>
                      <Field
                        className="form-control"
                        type="text"
                        component="input"
                        name="firstName"
                        autoComplete="given-name"
                        validate={required}
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('users.LASTNAME')}>
                      <Field
                        className="form-control"
                        type="text"
                        component="input"
                        autoComplete="family-name"
                        name="lastName"
                        validate={required}
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('users.ROLE')}>
                      <Field
                        className="form-control"
                        type="text"
                        component="select"
                        autoComplete="off"
                        name="idRole"
                        validate={required}
                      >
                        <option value="" />
                        {this.props.usersWithRoles.roles !== undefined &&
                        this.props.usersWithRoles.roles
                          .map(role => <option value={role.id} key={role.id}>{role.label}</option>)
                        }
                      </Field>
                    </PlmFormItem>
                    <hr />
                    <PlmFormItem label={I18n.t('users.PASSWORD')}>
                      <Field
                        className="form-control"
                        type="password"
                        component="input"
                        autoComplete="off"
                        name="password"
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('users.PASSWORD_CONFIRM')}>
                      <Field
                        className="form-control"
                        type="password"
                        component="input"
                        autoComplete="off"
                        name="passwordConfirmation"
                      />
                    </PlmFormItem>
                    <hr />
                    {this.props.match.params.id !== 'new' &&
                    <PlmFormItem label={I18n.t('users.CREATION_DATE')}>
                      <Localize value={values.creationDate || ''} dateFormat="date.long" />
                    </PlmFormItem>
                    }
                  </div>
                  <div className="panel-footer">
                    <Link
                      className="btn btn-secondary"
                      style={{ marginRight: '5px' }}
                      to={USER_PAGE_ROUTE}
                    >
                      <Translate value="actions.BACK" />
                    </Link>
                    <button type="submit" className="btn btn-success" disabled={invalid || submitting}>
                      <Translate value="actions.SAVE" />
                    </button>
                    {this.props.match.params.id !== 'new' &&
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => this.props.dispatch(displayModal(
                        I18n.t('modal.title'),
                        I18n.t('modal.message'),
                        () => this.deleteUser(this.state.userSelected),
                      ))}
                    >
                      <Translate value="actions.DELETE" />
                    </button>
                    }
                  </div>
                </form>
              )}
            />
          </PlmPanel>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  usersWithRoles: state.user.usersWithRoles,
}))(UserDetails));
