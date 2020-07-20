// @flow

import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Button } from 'reactstrap';
import moment from 'moment';
import PlmReactTable from '../PlmReactTable';
import PlmPanel from '../panel/PlmPanel';

type State = {
  columns: Array<{
    Header: string,
    accessor: string,
    Cell?: () => any,
  }>,
};

type Props = {
  jobs: [],
  functionExecute: Function,
};

class ScheduledList extends React.Component<Props, State> {
  state = {
    columns: [
      {
        Header: I18n.t('scheduled.TASKNAME'),
        accessor: 'name',
      },
      {
        Header: I18n.t('scheduled.FREQUENCY'),
        accessor: 'frequency',
        Cell: (row: any) => <div title={row.value}>{row.value}</div>,
      },
      {
        Header: I18n.t('scheduled.EXECUTIONS'),
        accessor: 'executionsCount',
      },
      {
        Header: I18n.t('scheduled.NEXT'),
        accessor: 'nextExecutionTimeInMillis',
        Cell: (row: any) => <div>{this.displayDate(row.value)}</div>,
      },
      {
        Header: I18n.t('scheduled.PREVIOUS_START'),
        accessor: 'lastExecutionStartedTimeInMillis',
        Cell: (row: any) => (
          <div title={I18n.t('scheduled.DURATION', { duration: row.original.lastExecutionEndedTimeInMillis - row.value })}>
            {this.displayDate(row.value)}
          </div>),
      },
      {
        Header: I18n.t('scheduled.PREVIOUS_END'),
        accessor: 'lastExecutionEndedTimeInMillis',
        Cell: (row: any) => (
          <div title={I18n.t('scheduled.DURATION', { duration: row.value - row.original.lastExecutionStartedTimeInMillis })}>
            {this.displayDate(row.value)}
          </div>),
      },
      {
        Header: I18n.t('scheduled.STATUS'),
        accessor: 'status',
        Cell: (row: any) =>
          <div className={row.value.toLowerCase()}>{row.value}</div>,
      },
      {
        Header: I18n.t('scheduled.START'),
        accessor: 'start',
        Cell: (row: any) => (
          <Button
            onClick={() => this.props.functionExecute(row.original.name)}
            color="info"
            disabled={!row.original.canBeRun}
          >
            <i className="fal fa-play icon" />
          </Button>),
      },
    ],
  };

  displayDate = (date: number) => {
    if (!date) {
      return I18n.t('scheduled.NEVER_EXECUTED');
    }
    return moment(date).format(I18n.t('scheduled.DATE_FORMAT'));
  };

  render() {
    return (
      <PlmPanel title={I18n.t('scheduled.TITLE')}>
        <div className="panel-body">
          <div className="">
            <PlmReactTable
              className="table table-striped scheduled-list"
              data={this.props.jobs}
              columns={this.state.columns}
              pageSize={this.props.jobs.length}
            />
          </div>
        </div>
      </PlmPanel>
    );
  }
}

export default ScheduledList;
