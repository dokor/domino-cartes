// @flow

import { store } from '../../network/reduce';
import userApi from '../../network/api/userApi';
import { notifyError } from '../../network/notification';
import { USERS_WITH_ROLES } from './userReducer';

export const fetchUsers = () => (dispatch: Function) => userApi
  .fetch()
  .then(response => response.json())
  .then((responseJson) => {
    dispatch(store(USERS_WITH_ROLES, responseJson));
  })
  .catch(dispatch(notifyError));
