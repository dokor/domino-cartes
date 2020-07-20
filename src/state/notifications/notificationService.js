// @flow

import { I18n } from 'react-redux-i18n';
import { addNotification as notify, removeNotifications } from 'reapop';
import { store } from '../../network/reduce';
import { TOGGLE_CONFIRMATION } from './notificationReducer';

export function toggleConfirmationWithModal(isActive: boolean) {
  return (dispatch: Function) => {
    dispatch(store(TOGGLE_CONFIRMATION, isActive));
    dispatch(removeNotifications());
  };
}

export function displayModal(
  title: string,
  message: string,
  onSuccess: Function,
  onRefuse: Function = () => {},
) {
  return (dispatch: Function) => {
    dispatch(store(TOGGLE_CONFIRMATION, true));
    dispatch(notify({
      title,
      message,
      status: 'warning',
      dismissible: false,
      dismissAfter: 0,
      position: 'tc',
      buttons: [
        {
          name: I18n.t('message.YES'),
          primary: true,
          onClick: () => {
            dispatch(store(TOGGLE_CONFIRMATION, false));
            onSuccess();
          },
        },
        {
          name: I18n.t('message.NO'),
          primary: false,
          onClick: () => {
            dispatch(store(TOGGLE_CONFIRMATION, false));
            dispatch(removeNotifications());
            onRefuse();
          },
        },
      ],
    }));
  };
}
