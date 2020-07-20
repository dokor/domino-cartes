// @flow

import { I18n } from 'react-redux-i18n';
import type { WsError } from './servicesTypes';

function toMessage(wsError: WsError) {
  const args = {};
  wsError.statusArguments.forEach((value, key) => {
    const label = I18n.t(value);
    if (label !== null) {
      args[`field${key}`] = label;
    }
  });
  return args;
}

export default toMessage;
