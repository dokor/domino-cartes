// @flow

import React from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import Select from 'react-select';
import LogApiDetails from './LogApiDetails';
import type { LogList } from '../../types/LogApiTypes';
import logApi from '../../network/api/LogApi';

type Props = {}

type State = {
  logList: LogList,
  apiFilter: string,
  statusCodeFilter: string,
}

class LogApi extends React.Component<Props, State> {
  state = {
    logList: [{
      api: '',
      bodyRequest: '',
      bodyResponse: '',
      date: '',
      headerRequest: {
        header: [{
          id: '',
          idLogApi: '',
          key: '',
          type: '',
          value: '',
        }],
        mode: '',
      },
      headerResponse: {
        header: [{
          id: '',
          idLogApi: '',
          key: '',
          type: '',
          value: '',
        }],
        mode: '',
      },
      id: '',
      isCompleteTextRequest: false,
      isCompleteTextResponse: false,
      method: '',
      statusCode: '',
      url: '',
    }],
    apiFilter: '',
    statusCodeFilter: '',
  };

  componentDidMount() {
    logApi
      .fetchAll()
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ logList: responseJson });
      });
  }

  filterLogList = (filteredLogList: LogList) => (filteredLogList && filteredLogList.length ?
    filteredLogList.map(log => <LogApiDetails log={log} key={log.id} />) :
    <div className="no-content"> {I18n.t('apiLog.noContent')} </div>);

  render() {
    return (
      <div className="log-api">
        <h1 className="content-title">
          <Translate value="apiLog.TITLE" />
        </h1>
        <div className="content">
          <Select
            options={
              this.state.logList
                .map(value => value.api)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map(log => ({
                  value: log,
                  label: log,
                }))
            }
            isClearable
            isSearchable
            placeholder={I18n.t('apiLog.apiFilter')}
            onChange={e => this.setState({ apiFilter: e ? e.value : '' })}
          />
          <Select
            options={
              this.state.logList
                .map(value => value.statusCode)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map(log => ({
                  value: log,
                  label: log,
                }))
            }
            isClearable
            isSearchable
            placeholder={I18n.t('apiLog.statusCodeFilter')}
            onChange={e => this.setState({ statusCodeFilter: e ? e.value : '' })}
          />
          {
            this.state.logList && this.filterLogList(
              this.state.logList
                .filter((log) => {
                  if (this.state.statusCodeFilter && this.state.apiFilter) {
                    return log.statusCode === this.state.statusCodeFilter &&
                      log.api === this.state.apiFilter;
                  }
                  if (this.state.statusCodeFilter) {
                    return log.statusCode === this.state.statusCodeFilter;
                  }
                  if (this.state.apiFilter) {
                    return log.api === this.state.apiFilter;
                  }
                  return log;
                }))
          }
        </div>
      </div>
    );
  }
}

export default LogApi;
