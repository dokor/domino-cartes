import { combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'reapop';
import { i18nReducer } from 'react-redux-i18n';
import loginReducer from './login/loginReducer';
import roleReducer from './roles/roleReducer';
import userReducer from './users/userReducer';
import historyReducer from './history/historyReducer';
import customNotificationReducer from './notifications/notificationReducer';

export default combineReducers({
  login: loginReducer,
  role: roleReducer,
  user: userReducer,
  history: historyReducer,
  i18n: i18nReducer,
  notifications: notificationsReducer(),
  customNotification: customNotificationReducer,
});
