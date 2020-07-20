// @flow

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import type { Criteria, HistoryLog } from '../../types/historyTypes';
import { store } from '../../network/reduce';
import { SEARCH_RESULTS_USER } from '../../state/users/userReducer';
import search from '../../state/search';
import { fetchUsers } from '../../state/users/userService';
import HistoryList from '../../components/history/HistoryList';
import HistorySearch from '../../components/history/HistorySearch';
import historyApi from '../../network/api/historyApi';
import { HISTORY_LOGS, SEARCH_HISTORY_LOGS } from '../../state/history/historyReducer';
import { notifyError } from '../../network/notification';

type Props = {
  historyLogs: HistoryLog[],
  searchHistoryLogs: ?HistoryLog[],
  dispatch: Function,
};

class History extends React.Component<Props> {
  componentDidMount() {
    historyApi
      .fetch()
      .then(response => response.json())
      .then((responseJson) => {
        this.props.dispatch(store(HISTORY_LOGS, responseJson));
      })
      .catch(this.props.dispatch(notifyError));
  }

  searchHistory = (criteria: Criteria) => {
    this.props.dispatch(store(
      SEARCH_HISTORY_LOGS,
      search(criteria, this.props.historyLogs),
    ));
  };

  render() {
    return (
      <div>
        <h1 className="content-title">
          <Translate value="history.TITLE" />
        </h1>
        <div className="content">
          <Row className="row">
            <Col xs="12">
              <HistorySearch historyLogs={this.props.historyLogs} search={this.searchHistory} />
            </Col>
            <Col xs="12">
              <HistoryList
                historyLogs={
                  this.props.searchHistoryLogs
                    ? this.props.searchHistoryLogs
                    : this.props.historyLogs
                }
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  historyLogs: state.history.historyLogs,
  searchHistoryLogs: state.history.searchHistoryLogs,
}))(History));
