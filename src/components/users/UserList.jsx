// @flow

import React from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PlmReactTable from '../PlmReactTable';
import { USER_PAGE_ROUTE } from '../../const';
import PlmPanel from '../panel/PlmPanel';
import type { User } from '../../types/usersTypes';

type Props = {
  users: User[],
  history: Function,
};

type State = {
  columns: Array<{
    Header: string,
    accessor: string,
  }>,
};

class UserList extends React.Component<Props, State> {
  state = {
    columns: [
      {
        Header: I18n.t('users.USERNAME'),
        accessor: 'userName',
      },
      {
        Header: I18n.t('users.EMAIL'),
        accessor: 'email',
      },
      {
        Header: I18n.t('users.FIRSTNAME'),
        accessor: 'firstName',
      },
      {
        Header: I18n.t('users.LASTNAME'),
        accessor: 'lastName',
      },
    ],
  };

  render() {
    if (this.props.users === undefined) {
      return false;
    }
    return (
      <PlmPanel title={I18n.t('users.TITLE')}>
        <div className="panel-body">
          <PlmReactTable
            style={{ cursor: 'pointer', height: '450px' }}
            className="table table-striped"
            data={this.props.users}
            columns={this.state.columns}
            getTdProps={(state, rowInfo) => ({
              onClick: () => {
                if (rowInfo) {
                  this.props.history.push(`${USER_PAGE_ROUTE}/${rowInfo.original.id}`);
                }
              },
            })}
          />
        </div>
        <div className="panel-footer">
          <Link className="btn btn-success" to={`${USER_PAGE_ROUTE}/new`}>
            <Translate value="actions.NEW" />
          </Link>
        </div>
      </PlmPanel>
    );
  }
}

export default withRouter(connect()(UserList));
