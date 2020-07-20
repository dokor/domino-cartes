// @flow

import React from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import PlmPanel from '../../components/panel/PlmPanel';
import LogsAdd from '../../components/logs/LogsAdd';
import LogsSearch from '../../components/logs/LogsSearch';
import logsApi from '../../network/api/logsApi';
import LogTable from '../../components/logs/LogTable';
import { notifyError, notifySuccess } from '../../network/notification';

type Props = {
  dispatch: Function,
};

type State = {
  data: [],
  initData: [],
  logs: [],
};

class Logs extends React.Component<Props, State> {
  state = {
    data: [],
    initData: [],
    logs: [],
  };

  componentWillMount() {
    this.getLogs();
  }

  getLogs = () => {
    logsApi.getLoggers()
      .then(response => response.json())
      .then((response) => {
        this.setState({
          data: response,
          initData: response,
          logs: response,
        });
      });
  };

  getDefaultLogs = logs => logs.filter(x => x.level === x.originalLevel);

  getChangedLogs = logs => logs.filter(x => x.level !== x.originalLevel);

  searchLogs = (logName) => {
    this.setState({
      logs: logName ?
        this.state.initData.filter(x => x.name.toLowerCase().includes(logName.toLowerCase()))
        : this.state.initData,
    });
  };

  updateLog = (level: String, name: String) => {
    if (!level) {
      level = I18n.t('logs.SELECT_OFF').toUpperCase();
    }
    logsApi.updateLogger(name, level)
      .then(notifySuccess(this.props.dispatch))
      .then(() => this.getLogs())
      .catch(notifyError(this.props.dispatch));
  };

  render() {
    return (
      <div>
        <h1 className="content-title">
          <Translate value="logs.TITLE" />
        </h1>
        <div className="content">
          <PlmPanel title={I18n.t('logs.ADD_TITLE')}>
            <div className="panel-body">
              <LogsAdd
                functionAdd={this.updateLog}
              />
            </div>
          </PlmPanel>
          <PlmPanel title={I18n.t('logs.SEARCH_TITLE')}>
            <div className="panel-body search-log-form">
              <LogsSearch
                functionSearch={this.searchLogs}
              />
            </div>
          </PlmPanel>
          <div className="log-container">
            <PlmPanel
              className="log-table-container"
              title={I18n.t('logs.CHANGED_TITLE')}
            >
              <div className="panel-body">
                <LogTable
                  logs={this.getChangedLogs(this.state.logs)}
                  functionChange={this.updateLog}
                  active
                />
              </div>
            </PlmPanel>
            <PlmPanel
              className="log-table-container"
              title={I18n.t('logs.DEFAULT_TITLE')}
            >
              <div className="panel-body">
                <LogTable
                  logs={this.getDefaultLogs(this.state.logs)}
                  functionChange={this.updateLog}
                />
              </div>
            </PlmPanel>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Logs);
