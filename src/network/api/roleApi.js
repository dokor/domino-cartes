// @flow

import { RestClientAuthenticated } from '../network';
import type { Role } from '../../types/rolesTypes';

const roleApi = {
  fetch: () =>
    new RestClientAuthenticated('/admin/roles', 'GET').execute(),
  save: (role: Role) =>
    new RestClientAuthenticated('/admin/roles', 'POST').jsonBody(role).execute(),
  delete: (roleId: $PropertyType<Role, 'id'>) =>
    new RestClientAuthenticated(`/admin/roles/${roleId}`, 'DELETE').execute(),
};

export default roleApi;
