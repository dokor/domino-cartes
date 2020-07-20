// @flow
import React from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import RoleRow from './RoleRow';
import PlmPanel from '../panel/PlmPanel';
import type { Role } from '../../types/rolesTypes';
import { store } from '../../network/reduce';
import { ROLE_SELECTED } from '../../state/roles/roleReducer';

type Props = {
  roles: {
    rolesWithPermissions: Role[],
  },
  dispatch: Function,
};

function RoleList(props: Props) {
  const rows = [];
  if (props.roles.rolesWithPermissions) {
    props.roles.rolesWithPermissions.forEach((role) => {
      rows.push(<RoleRow
        label={role.label}
        permissions={role.permissions}
        key={role.idRole}
        displayDetails={() => props.dispatch(store(ROLE_SELECTED, role))}
        style={{ cursor: 'pointer' }}
      />);
    });
  }
  return (
    <PlmPanel title={I18n.t('roles.LIST_TITLE')}>
      <div className="panel-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <Translate value="roles.LABEL" />
                </th>
                <th>
                  <Translate value="roles.PERMISSIONS" />
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
        <div className="panel-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => props.dispatch(store(ROLE_SELECTED, { permissions: [] }))}
          >
            <Translate value="actions.NEW" />
          </button>
        </div>
      </div>
    </PlmPanel>
  );
}

export default withRouter(connect()(RoleList));
