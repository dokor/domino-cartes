// @flow

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { I18n, Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import type { Role } from '../../types/rolesTypes';
import PlmPanel from '../panel/PlmPanel';
import PlmFormItem from '../panel/PlmFormItem';

type Props = {
  roles: Role[],
  search: Function,
}

class UserSearch extends React.PureComponent<Props> {
  render() {
    if (this.props.roles === undefined) {
      return false;
    }
    return (
      <PlmPanel title={I18n.t('users.SEARCH_TITLE')}>
        <Form
          onSubmit={this.props.search}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="panel-body">
                <Row className="search-form">
                  <Col xs="5">
                    <PlmFormItem label={I18n.t('users.USERNAME')}>
                      <Field
                        className="form-control"
                        component="input"
                        name="userName"
                        type="text"
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('users.EMAIL')}>
                      <Field
                        className="form-control"
                        component="input"
                        name="email"
                        type="text"
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('users.FIRSTNAME')}>
                      <Field
                        className="form-control"
                        component="input"
                        name="firstName"
                        type="text"
                      />
                    </PlmFormItem>
                  </Col>
                  <Col xs="5">
                    <PlmFormItem label={I18n.t('users.LASTNAME')}>
                      <Field
                        className="form-control"
                        component="input"
                        name="lastName"
                        type="text"
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('users.ROLE')}>
                      <Field
                        className="form-control"
                        component="select"
                        name="idRole"
                        type="text"
                      >
                        <option value="any"> Tous</option>
                        {this.props.roles.map(role => (
                          <option value={role.id} key={role.id}>{role.label}</option>
                        ))
                        }
                      </Field>
                    </PlmFormItem>
                  </Col>
                </Row>
              </div>
              <div className="panel-footer">
                <button
                  className="btn btn-info"
                  type="submit"
                >
                  <Translate value="actions.SEARCH" />
                </button>
              </div>
            </form>
          )}
        />
      </PlmPanel>
    );
  }
}

export default withRouter(connect()(UserSearch));
