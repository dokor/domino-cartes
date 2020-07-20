// @flow

import { RestClientAuthenticated } from '../network';

const scheduledApi = {
  getTasksAndThread: () => new RestClientAuthenticated('/admin/system/scheduler', 'GET').execute(),
  executeScheduledJob: (name: String) => new RestClientAuthenticated(`/admin/system/scheduler/${name}`, 'POST').execute(),
};

export default scheduledApi;
