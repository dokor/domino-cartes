// @flow

import { RestClientAuthenticated } from '../network';

const logApi = {
  fetchAll: () =>
    new RestClientAuthenticated('/admin/logs', 'GET').execute(),
  fetchById: (id: String) =>
    new RestClientAuthenticated(`/admin/logs/${id}`, 'GET').execute(),
  fetchFullBody: (id: String, isRequest: Boolean) =>
    new RestClientAuthenticated(`/admin/logs/${id}/${isRequest}`, 'GET').execute(),
};

export default logApi;
