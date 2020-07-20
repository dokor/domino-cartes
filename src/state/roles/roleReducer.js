// @flow
import { reduce } from '../../network/reduce';
import type { Role } from '../../types/rolesTypes';

export type RoleStateType = {
  roleSelected: Role,
  roles: Role[],
};

const initialState: RoleStateType = {
  roleSelected: null,
  roles: [],
};

export const ROLE_SELECTED = 'ROLE_SELECTED';
export const ROLES = 'ROLES';

const roleReducer = reduce(initialState, {
  [ROLE_SELECTED]: 'roleSelected',
  [ROLES]: 'roles',
});

export default roleReducer;
