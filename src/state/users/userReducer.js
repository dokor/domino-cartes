// @flow
import type { User, UsersWithRoles } from '../../types/usersTypes';
import { reduce } from '../../network/reduce';

export type UserStateType = {
  usersWithRoles: UsersWithRoles,
  searchResultsUser: User[],
};

const initialState: UserStateType = {
  usersWithRoles: { users: [], roles: [] },
  searchResultsUser: null,
};

export const USERS_WITH_ROLES = 'USERS_WITH_ROLES';
export const SEARCH_RESULTS_USER = 'SEARCH_RESULTS_USER';

const userReducer = reduce(initialState, {
  [USERS_WITH_ROLES]: 'usersWithRoles',
  [SEARCH_RESULTS_USER]: 'searchResultsUser',
});

export default userReducer;
