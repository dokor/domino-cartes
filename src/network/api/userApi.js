// @flow

import { RestClientAuthenticated } from '../network';
import type { User } from '../../types/usersTypes';

const userApi = {
  fetch: () => new RestClientAuthenticated('/admin/users', 'GET').execute(),
  save: (data: User) =>
    new RestClientAuthenticated('/admin/users', data.id ? 'PUT' : 'POST').jsonBody(data).execute(),
  delete: (dataId: $PropertyType<User, 'id'>) =>
    new RestClientAuthenticated(`/admin/users/${dataId}`, 'DELETE').execute(),
};

export default userApi;
