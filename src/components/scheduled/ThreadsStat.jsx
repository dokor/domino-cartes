// @flow

import React from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import PlmPanel from '../panel/PlmPanel';

type Props = {
  threadStats: Object;
}

class ThreadsStat extends React.Component<Props> {
  render() {
    return (
      <PlmPanel title={I18n.t('scheduled.threads.TITLE')}>
        <div className="panel-body">
          <div>
            <div><Translate value="scheduled.threads.ACTIVE" />
              <span className="thread-active"> {this.props.threadStats.activeThreads} </span>
            </div>
          </div>
          <div>
            <div><Translate value="scheduled.threads.INACTIVE" />
              <span className="thread-inactive"> {this.props.threadStats.inactiveThreads} </span>
            </div>
          </div>
          <div>
            <div><Translate value="scheduled.threads.MIN" />
              <span className=""> {this.props.threadStats.minThreads} </span>
            </div>
          </div>
          <div>
            <div><Translate value="scheduled.threads.MAX" />
              <span className=""> {this.props.threadStats.maxThreads} </span>
            </div>
          </div>
          <div>
            <div><Translate value="scheduled.threads.LARGEST_POOL" />
              <span className=""> {this.props.threadStats.largestPoolSize} </span>
            </div>
          </div>
        </div>
      </PlmPanel>
    );
  }
}

export default ThreadsStat;

