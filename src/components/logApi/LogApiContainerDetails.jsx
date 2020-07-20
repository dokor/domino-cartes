// @flow

import React from 'react';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/htmlembedded/htmlembedded';
import logApi from '../../network/api/LogApi';
import LogApiTileDetails from './LogApiTileDetails';
import { I18n } from 'react-redux-i18n';

type Props = {
  logId: String,
}
type State = {
  logDetailsRequest: Object,
  logDetailsResponse: Object,
}

class LogContainerDetails extends React.Component<Props, State> {

  state = {}

  componentDidMount() {
    logApi
      .fetchById(this.props.logId)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          logDetailsRequest: {
            ...responseJson,
            headerList: responseJson.headerRequest,
            body: responseJson.bodyRequest,
            isCompleteText: responseJson.isCompleteTextRequest

          }, logDetailsResponse: {
            ...responseJson,
            headerList: responseJson.headerResponse,
            body: responseJson.bodyResponse,
            isCompleteText: responseJson.isCompleteTextResponse
          }
        })
      });
  }

  render() {
    if (!this.state.logDetailsRequest && !this.state.logDetailsResponse) {
      return false;
    }
    if (this.state.logDetailsRequest.headerList.header.length === 0 && !this.state.logDetailsRequest.body &&
      this.state.logDetailsResponse.headerList.header.length === 0 && !this.state.logDetailsResponse.body) {
      return (<div className="empty-container">{I18n.t('apiLog.empty')}</div>);
    }
    return (
      <div>
        <LogApiTileDetails isRequest infos={this.state.logDetailsRequest} />
        <LogApiTileDetails infos={this.state.logDetailsResponse} />
      </div>
    )
  }
}

export default LogContainerDetails;
