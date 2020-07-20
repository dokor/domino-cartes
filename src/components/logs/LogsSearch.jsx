// @flow

import React from 'react';
import { I18n } from 'react-redux-i18n';
import PlmFormItem from '../../components/panel/PlmFormItem';

type Props = {
  functionSearch: Function,
};

class LogsSearch extends React.Component<Props> {
  render() {
    return (
      <div className="log-label log-label-search">
        <PlmFormItem label={`${I18n.t('logs.NAME')} :`}>
          <input
            className="form-control"
            name="logName"
            onChange={e => this.props.functionSearch(e.target.value)}
          />
        </PlmFormItem>
      </div>
    );
  }
}

export default LogsSearch;
