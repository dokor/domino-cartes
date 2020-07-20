// @flow

import React from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import { Button } from 'reactstrap';
import { Field, Form } from 'react-final-form';
import PlmFormItem from '../../components/panel/PlmFormItem';

type Props = {
  functionAdd: Function,
};

class LogsAdd extends React.Component<Props> {
  handleSubmit = (e: any) => {
    this.props.functionAdd(e.logLevel, e.logName);
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        render={({ handleSubmit, values, form }) => (
          <form onSubmit={(data) => {
            handleSubmit(data);
            form.reset();
          }}
          >
            <div className="add-log-form">
              <div className="log-label log-label-name">
                <PlmFormItem label={`${I18n.t('logs.NAME')} :`}>
                  <Field
                    className="form-control"
                    component="input"
                    name="logName"
                    type="text"
                  />
                </PlmFormItem>
              </div>
              <div className="log-label log-label-level">
                <PlmFormItem label={`${I18n.t('logs.LEVEL')} :`}>
                  <Field
                    className="form-control"
                    component="select"
                    name="logLevel"
                    type="text"
                  >
                    <option />
                    <option value="trace" className="trace"> {I18n.t('logs.SELECT_TRACE')}</option>
                    <option value="info" className="info"> {I18n.t('logs.SELECT_INFO')}</option>
                    <option value="debug" className="debug"> {I18n.t('logs.SELECT_DEBUG')}</option>
                    <option value="error" className="error"> {I18n.t('logs.SELECT_ERROR')}</option>
                    <option value="warn" className="warn"> {I18n.t('logs.SELECT_WARN')}</option>
                    <option value="off" className="off"> {I18n.t('logs.SELECT_INACTIVE')}</option>
                  </Field>
                </PlmFormItem>
              </div>
              <div className="log-label-add"><Button color="success"><Translate value="actions.ADD" /></Button></div>
            </div>
          </form>
        )}
      />
    );
  }
}

export default LogsAdd;
