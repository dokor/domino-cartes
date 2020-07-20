// @flow

import React from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';

import roleApi from '../../network/api/roleApi';
import type { Role } from '../../types/rolesTypes';
import PlmFormItem from '../../components/panel/PlmFormItem';
import PlmPanel from '../../components/panel/PlmPanel';
import { displayModal, toggleConfirmationWithModal } from '../../state/notifications/notificationService';
import { notifyError, notifySuccess } from '../../network/notification';
import { store } from '../../network/reduce';
import { ROLE_SELECTED } from '../../state/roles/roleReducer';

type Props = {
  formInitial: any,
  dispatch: Function,
  permissionsAvailable: string[],
};

type State = {
  enabled: string[],
  available: string[],
  previousFormInitial: any,
};

class RoleDetails extends React.Component<Props, State> {
  state = {
    enabled: [],
    available: [],
    previousFormInitial: {},
  };

  componentDidMount() {
    this.fillPermissions(this.props, this.props.formInitial.permissions);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      previousFormInitial: nextProps.formInitial,
    });
    if (nextProps.formInitial !== this.state.previousFormInitial) {
      if (nextProps.formInitial.permissions) {
        const enabledFromProps = [];
        nextProps.formInitial.permissions.forEach((permission) => {
          enabledFromProps.push(permission);
        });
        this.fillPermissions(nextProps, enabledFromProps);
      } else {
        this.setState({
          enabled: [],
          available: nextProps.permissionsAvailable,
        });
      }
    }
  }

  fillPermissions = (props: Props, enabled: string[]) => {
    const filteredEnabled = enabled
      .filter((permission, index, self) => permission &&
        self.indexOf(permission) === index);

    const availableFromProps = props.permissionsAvailable
      .filter(permission => permission && !filteredEnabled.includes(permission));

    this.setState({
      enabled: filteredEnabled,
      available: availableFromProps,
    });
  };

  addOne = (currentAvailable, form: any) => {
    if (currentAvailable) {
      const enabled = this.state.enabled.concat(currentAvailable);
      this.fillPermissions(this.props, enabled);
      form.change('permissions', enabled);
    }
  };

  removeOne = (currentEnabled, form: any) => {
    if (currentEnabled) {
      const enabled = this.state.enabled.filter(permission => !currentEnabled.includes(permission));
      this.fillPermissions(this.props, enabled);
      form.change('permissions', enabled);
    }
  };

  addAll = (form: any) => {
    const enabled = this.state.enabled.concat(this.state.available);
    this.fillPermissions(this.props, enabled);
    form.change('permissions', enabled);
  };

  removeAll = (form: any) => {
    const enabled = [];
    this.fillPermissions(this.props, enabled);
    form.change('permissions', enabled);
  };

  handleSubmit = (role: Role) =>
    roleApi
      .save(role)
      .then(notifySuccess(this.props.dispatch))
      .then(() => this.props.dispatch(store(ROLE_SELECTED, null)))
      .catch(notifyError(this.props.dispatch));

  onDelete = () => {
    roleApi
      .delete(this.props.formInitial.idRole)
      .then(notifySuccess(this.props.dispatch))
      .then(() => this.props.dispatch(store(ROLE_SELECTED, null)))
      .catch(notifyError(this.props.dispatch));
  };

  props: Props;

  render() {
    return (
      <PlmPanel
        title={
          this.props.formInitial.permissions.length !== 0
            ? I18n.t('roles.DETAIL_TITLE', { label: this.props.formInitial.label })
            : I18n.t('roles.NEW_TITLE')
        }
      >
        <Form
          initialValues={this.props.formInitial}
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, values, form }) => (
            <form className="form-horizontal" onSubmit={handleSubmit}>
              <div className="panel-body">
                <PlmFormItem label={I18n.t('roles.LABEL')}>
                  <Field
                    type="text"
                    className="form-control"
                    name="label"
                    component="input"
                    maxLength="30"
                    size="30"
                    required
                  />
                </PlmFormItem>
                <PlmFormItem label={I18n.t('roles.AVAILABLE')}>
                  <Field
                    type="text"
                    className="form-control"
                    name="available"
                    component="select"
                    size="5"
                    multiple
                  >
                    {this.state.available.map(permission => (
                      <option value={permission} key={`${permission}Available`}>
                        {' '}
                        {permission}
                      </option>
                    ))}
                  </Field>
                </PlmFormItem>
                <PlmFormItem label="">
                  <div className="button-container">
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => this.removeOne(values.enabled, form)}
                    >
                      <i className="fa fa-angle-up" aria-hidden="true" />
                    </button>
                    <button type="button" className="btn btn-default" onClick={() => this.removeAll(form)}>
                      <i className="fa fa-angle-double-up" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => this.addOne(values.available, form)}
                    >
                      <i className="fa fa-angle-down" aria-hidden="true" />
                    </button>
                    <button type="button" className="btn btn-default" onClick={() => this.addAll(form)}>
                      <i className="fa fa-angle-double-down" aria-hidden="true" />
                    </button>
                  </div>
                </PlmFormItem>
                <PlmFormItem label={I18n.t('roles.ENABLED')}>
                  <Field
                    type="text"
                    className="form-control"
                    name="enabled"
                    component="select"
                    size="5"
                    multiple
                  >
                    {this.state.enabled.map(permission => (
                      <option value={permission} key={`${permission}Enabled`}>
                        {' '}
                        {permission}
                      </option>
                    ))}
                  </Field>
                </PlmFormItem>
              </div>
              <div className="panel-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.props.dispatch(store(ROLE_SELECTED, null))}
                >
                  <Translate value="actions.BACK" />
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.props.dispatch(displayModal(
                    'Voulez-vous vraiment supprimer cet élément ?',
                    'cette modification est irréversible',
                    this.onDelete,
                  ))}
                >
                  <Translate value="actions.DELETE" />
                </button>
                <button type="submit" className="btn btn-success">
                  <Translate value="actions.SAVE" />
                </button>
              </div>
            </form>
          )}
        />
      </PlmPanel>
    );
  }
}

export default withRouter(connect()(RoleDetails));
