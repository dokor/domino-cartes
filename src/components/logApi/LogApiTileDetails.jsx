// @flow

import React from 'react';
import { I18n } from 'react-redux-i18n';
import CodeMirror from 'react-codemirror';
import format from 'xml-formatter';
import pretty from 'pretty';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/htmlembedded/htmlembedded';
import type { Header } from '../../types/LogApiTypes';
import logApi from '../../network/api/LogApi';

type Props = {
  isRequest?: boolean,
  infos: {
    headerList: Header,
    body: string,
    isCompleteText: boolean,
    logId: string,
    method: string,
  },
}

const parseJson = (val) => {
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
};

const FORMAT_TYPE = {
  XML: 'xml', HTML: 'htmlembedded', JS: 'javascript', MD: 'markdown',
};

const pickFunction = (val, type) => ({
  [FORMAT_TYPE.XML]: () => format(val),
  [FORMAT_TYPE.HTML]: () => pretty(val),
  default: () => val,
  [FORMAT_TYPE.JS]: () => JSON.stringify(parseJson(val), null, 4),
  [FORMAT_TYPE.MD]: () => val,
}[type || 'default']);

const textDownload = (filename: string, text: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

class LogApiTileDetails extends React.Component<Props, void> {

  getFullResponse = () => {
    logApi
      .fetchFullBody(this.props.infos.id, this.props.isRequest)
      .then(res => res.json())
      .then(json => textDownload(`${this.props.infos.api}.json`, JSON.stringify(json)))
      .catch(console.log)
  }

  render() {
    return (
      <div className="log-container-details">
        <div
          className={`title title--${this.props.infos.method}`}>{this.props.isRequest ? I18n.t('apiLog.request') : I18n.t('apiLog.response')}</div>
        <div className="subtitle">
          <div className="api-header-title"> {I18n.t('apiLog.header')}</div>
          {this.props.infos.headerList.header.length > 0 && this.props.infos.headerList.header
            .map(headerInfo => (
              <div className="api-header" key={headerInfo.id}>
                <div className="header-key">{headerInfo.key}</div>
                <div> {headerInfo.value}</div>
              </div>
            ))
          }
          {this.props.infos.headerList.header.length <= 0 &&
          <div className="empty-body"> {I18n.t('apiLog.emptyHeader')} </div>
          }
        </div>
        <div className="subtitle">
          <div className="api-header-title"> {I18n.t('apiLog.body')}</div>
          {!this.props.infos.body &&
          <div className="empty-body"> {I18n.t('apiLog.emptyBody')} </div>
          }

          {this.props.infos.body && this.props.infos.isCompleteText &&
          <a onClick={this.getFullResponse} className="download"> {I18n.t('apiLog.download')} </a>
          }

          {this.props.infos.body && !this.props.infos.headerList.mode &&
          <div className="bloc-body"> {this.props.infos.body}  </div>
          }
          {this.props.infos.body && this.props.infos.headerList.mode &&
          <div className="bloc-body">
            {this.props.infos.headerList.mode &&
            <CodeMirror
              value={pickFunction(this.props.infos.body, this.props.infos.headerList.mode)()}
              options={{
                readOnly: true,
                mode: this.props.infos.headerList.mode,
              }}
            />
            }

          </div>
          }
        </div>
      </div>

    );
  }
}

export default LogApiTileDetails;
