// @flow

import React from 'react';
import { Field, Form } from 'react-final-form';
import { I18n, Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import PlmPanel from '../panel/PlmPanel';
import PlmFormItem from '../panel/PlmFormItem';
import type { HistoryLog } from '../../types/historyTypes';
import { ModificationType } from '../../types/historyTypes';

type Props = {
  historyLogs: HistoryLog[],
  search: Function,
}

class HistorySearch extends React.PureComponent<Props> {
  render() {
    if (this.props.historyLogs === undefined) {
      return false;
    }
    return (
      <PlmPanel title={I18n.t('history.SEARCH_TITLE')}>
        <Form
          onSubmit={this.props.search}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="panel-body">
                <Row className="search-form">
                  <Col xs="5">
                    <PlmFormItem label={I18n.t('history.USERNAME')}>
                      <Field
                        className="form-control"
                        component="input"
                        name="username"
                        type="text"
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('history.ID_ITEM')}>
                      <Field
                        className="form-control"
                        component="input"
                        name="idItem"
                        type="text"
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('history.TABLE')}>
                      <Field
                        className="form-control"
                        component="input"
                        name="table"
                        type="text"
                      />
                    </PlmFormItem>
                  </Col>
                  <Col xs="5">
                    <PlmFormItem label={I18n.t('history.MESSAGE')}>
                      <Field
                        className="form-control"
                        component="input"
                        name="message"
                        type="text"
                      />
                    </PlmFormItem>
                    <PlmFormItem label={I18n.t('history.MODIFICATION_TYPE.TITLE')}>
                      <Field
                        className="form-control"
                        component="select"
                        name="modificationType"
                        type="text"
                      >
                        <option value="any"> Tous</option>
                        <option value={ModificationType.CREATE}>{I18n.t('history.MODIFICATION_TYPE.CREATE')}</option>
                        <option value={ModificationType.UPDATE}>{I18n.t('history.MODIFICATION_TYPE.UPDATE')}</option>
                        <option value={ModificationType.DELETE}>{I18n.t('history.MODIFICATION_TYPE.DELETE')}</option>
                      </Field>
                    </PlmFormItem>
                  </Col>
                </Row>
              </div>
              <div className="panel-footer">
                <button
                  className="btn btn-info"
                  type="submit"
                >
                  <Translate value="actions.SEARCH" />
                </button>
              </div>
            </form>
          )}
        />
      </PlmPanel>
    );
  }
}

export default connect()(HistorySearch);
