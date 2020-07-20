// @flow

import React from 'react';
import { Button } from 'reactstrap';
import { I18n } from 'react-redux-i18n';

type Props = {
  item: Object,
  active: boolean,
  functionChange: Function,
}

class LogTableRow extends React.Component<Props> {
  render() {
    return (
      <div key={this.props.item.id} className="log-table-row">
        {this.props.active &&
        <div className="log-table-cell first-column">
          <Button
            onClick={() => this.props.functionChange(this.props.item.originalLevel)}
            color="danger"
          >
            <i className="fal fa-trash icon" />
          </Button>
        </div>
        }
        <div className="log-table-cell second-column">
          <select
            className={`form-control ${!this.props.item.level ? 'off' : this.props.item.level.toLowerCase()}`}
            value={this.props.item.level ? this.props.item.level.toLowerCase() : 'off'}
            onChange={e => this.props.functionChange(e.target.value)}
            name="level"
          >
            <option value="trace" className="trace"> {I18n.t('logs.SELECT_TRACE')}</option>
            <option value="info" className="info"> {I18n.t('logs.SELECT_INFO')}</option>
            <option value="debug" className="debug"> {I18n.t('logs.SELECT_DEBUG')}</option>
            <option value="error" className="error"> {I18n.t('logs.SELECT_ERROR')}</option>
            <option value="warn" className="warn"> {I18n.t('logs.SELECT_WARN')}</option>
            <option value="off" className="off"> {I18n.t('logs.SELECT_INACTIVE')}</option>
          </select>
        </div>
        <div className="log-table-cell third-column" title={this.props.item.name}>{this.props.item.name}</div>
      </div>
    );
  }
}

export default LogTableRow;
