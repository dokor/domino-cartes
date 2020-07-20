// @flow

import { RestClientAuthenticated } from '../network';

const logsApi = {
  getLoggers: () => new RestClientAuthenticated('/admin/system/logs', 'GET').execute(),
  updateLogger: (name: String, level: String) => new RestClientAuthenticated(`/admin/system/logs/${level}/${name}`, 'PUT').execute(),
};

export default logsApi;
