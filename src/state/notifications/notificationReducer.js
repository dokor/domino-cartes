// @flow

import { reduce } from '../../network/reduce';

export const TOGGLE_CONFIRMATION = 'TOGGLE_CONFIRMATION';

type notificationStateType = {
  isConfirmationNotification: boolean,
};

const initialState: notificationStateType = {
  isConfirmationNotification: false,
};

const customNotificationReducer = reduce(initialState, {
  [TOGGLE_CONFIRMATION]: 'isConfirmationNotification',
});

export default customNotificationReducer;
