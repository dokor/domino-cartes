// @flow

import React from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import PlmReactTable from '../PlmReactTable';
import PlmPanel from '../panel/PlmPanel';
import type { HistoryLog } from '../../types/historyTypes';

type Props = {
  historyLogs: HistoryLog[],
};

type State = {
  columns: Array<{
    Header: string,
    accessor: string,
  }>,
};

class HistoryList extends React.Component<Props, State> {
  state = {
    columns: [
      {
        Header: I18n.t('history.USERNAME'),
        accessor: 'username',
      },
      {
        Header: I18n.t('history.ID_ITEM'),
        accessor: 'idItem',
      },
      {
        Header: I18n.t('history.TABLE'),
        accessor: 'table',
      },
      {
        Header: I18n.t('history.MESSAGE'),
        accessor: 'message',
      },
      {
        Header: I18n.t('history.MODIFICATION_TYPE.TITLE'),
        accessor: 'modificationType',
        Cell: row => <Translate value={`history.MODIFICATION_TYPE.${row.value}`} />,
      },
    ],
  };

  render() {
    if (this.props.historyLogs === undefined) {
      return false;
    }
    return (
      <PlmPanel title={I18n.t('history.TITLE')}>
        <div className="panel-body">
          <PlmReactTable
            className="table table-striped"
            data={this.props.historyLogs}
            columns={this.state.columns}
          />
        </div>
        <div className="panel-footer" />
      </PlmPanel>
    );
  }
}

export default HistoryList;
