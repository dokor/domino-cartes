// @flow

import { I18n } from 'react-redux-i18n';
import { addNotification as notify } from 'reapop';
import toMessage from '../services/i18nService';
import { errorObject } from './handleError';


export function notifySuccess(reduxDispatch: Function) {
  return (response: Object) => {
    reduxDispatch(notify({
      message: 'Les modifications ont bien été prises en compte',
      status: 'success',
    }));
    return response;
  };
}

export function notifyError(reduxDispatch: Function) {
  return (error: Function) => {
    let errorResponse = error;
    if (typeof error.then !== 'function') {
      console.log(error);
      errorResponse = Promise.resolve(errorObject);
    }

    return (errorResponse: Object).then((errorJson) => {
      reduxDispatch(notify({
        message: I18n.t(`wsError.${errorJson.errorCode}`, toMessage(errorJson)),
        status: 'error',
      }));
      if (errorJson.errorCode === 'AUTHENTICATION_EXPIRED') {
        sessionStorage.clear();
      }
    });
  };
}
