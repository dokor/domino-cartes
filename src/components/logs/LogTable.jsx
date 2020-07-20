// @flow

import React from 'react';
import { I18n } from 'react-redux-i18n';
import LogTableRow from './LogTableRow';

type Props = {
  logs: [],
  functionChange: Function,
  active: boolean,
}

class LogTable extends React.Component<Props> {
  render() {
    if (this.props.logs.length !== 0) {
      return (
        <div className="log-table">
          {this.props.logs.map(item =>
            (
              <LogTableRow
                key={item.name + item.originalLevel + item.level}
                item={item}
                active={this.props.active}
                functionChange={level => this.props.functionChange(level, item.name)}
              />))
          }
        </div>
      );
    }
    return (
      <div>{I18n.t('logs.EMPTY')}</div>
    );
  }
}

export default LogTable;
