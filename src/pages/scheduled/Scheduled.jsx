// @flow

import React from 'react';
import { Translate } from 'react-redux-i18n';
import ScheduledList from '../../components/scheduled/ScheduledList';
import ThreadsStat from '../../components/scheduled/ThreadsStat';
import scheduledApi from '../../network/api/scheduledApi';
import { notifySuccess } from '../../network/notification';

type Props = {
  dispatch: Function,
};

type State = {
  jobs: [],
  threadStats: Object,
};

class Scheduled extends React.Component<Props, State> {
  state = {
    jobs: [],
    threadStats: {
      activeThreads: 0,
      inactiveThreads: 0,
      minThreads: 0,
      maxThreads: 0,
      largestPoolSize: 0,
    },
  };

  interval = 0;

  componentWillMount() {
    this.getTasksAndThread();
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getTasksAndThread();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = 0;
  }

  getTasksAndThread = () => {
    scheduledApi.getTasksAndThread()
      .then(response => response.json())
      .then((response) => {
        this.setState({
          jobs: response.jobs,
          threadStats: response.threadStats,
        });
      });
  };

  executeTask = (name: String) => {
    scheduledApi.executeScheduledJob(name)
      .then(() => notifySuccess(this.props.dispatch));
    this.getTasksAndThread();
  };

  render() {
    return (
      <div>
        <h1 className="content-title">
          <Translate value="scheduled.TITLE" />
        </h1>
        <div className="content">
          <ScheduledList
            jobs={this.state.jobs}
            functionExecute={this.executeTask}
          />
          <div className="thread-stats">
            <ThreadsStat
              threadStats={this.state.threadStats}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Scheduled;
