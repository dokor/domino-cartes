// @flow
import type { Role } from './rolesTypes';

export type User = {
  +id: string,
  +idRole: string,
  +firstName: string,
  +lastName: string,
  +userName: string,
  +email: string,
  +creationDate: string,
};

export type UsersWithRoles = {
  +users: User[],
  +roles: Role[],
};

export type Criteria = {
  +userName?: string,
  +email?: string,
  +firstName?: string,
  +lastName?: string,
};
