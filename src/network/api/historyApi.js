// @flow

import { RestClientAuthenticated } from '../network';

const historyApi = {
  fetch: () => new RestClientAuthenticated('/admin/history/tables', 'GET').execute(),
};

export default historyApi;
