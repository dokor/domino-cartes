// @flow
import { currentUser } from './sessionService';

function hasPermission(permission: string) {
  const user = currentUser();
  if (user) {
    return user.permissions.includes(permission);
  }
  return false;
}

export default hasPermission;
