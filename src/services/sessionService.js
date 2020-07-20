// @flow
// eslint-disable no-console
import { Store } from 'redux';
import { errorObject, toJsonError, unwrap } from '../network/handleError';
import { HttpClient } from '../network/network';
import { store as storeFunction } from '../network/reduce';
import type {
  AdminSession,
  AdminSessionObject,
  AdminUser,
  Credentials,
  CredentialsWithOtp,
  DisconnectedReason,
} from '../types/loginTypes';
import { IS_CONNECTED } from '../state/login/loginConst';
import { reloadLanguage } from './language';

export const SESSION_CURRENT_USER = 'currentUser';
const IDLE_TIME_DETECTION_CHECK_THRESHOLD = 15 * 1000;
const PAGE_CHANGE_EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

let adminSession: ?AdminSession = null;
let adminSessionObject: ?AdminSessionObject = null;
let currentUserObject: ?AdminUser = null;
let idleTime: number = 0;
let refreshTokenTask = null;
let idleTimeDetectionTask = null;
let reduxStore = null;

function resetIdleTimeDetection() {
  idleTime = 0;
}

function resetRefreshToken() {
  if (refreshTokenTask !== null) {
    clearInterval(refreshTokenTask);
    refreshTokenTask = null;
  }
}

// réinitilise les états à leur valeur initiale
function resetState() {
  resetRefreshToken();
  if (idleTimeDetectionTask !== null) {
    clearInterval(idleTimeDetectionTask);
    idleTimeDetectionTask = null;
  }
  resetIdleTimeDetection();
  // eslint-disable-next-line no-restricted-syntax
  for (const eventName of PAGE_CHANGE_EVENTS) {
    document.removeEventListener(eventName, resetIdleTimeDetection, true);
  }
  adminSession = null;
  currentUserObject = null;
  localStorage.removeItem(SESSION_CURRENT_USER);
}

export function userDisconnected(reason: DisconnectedReason) {
  console.log(`User has been disconnected, reason = ${reason}`);
  // TODO propager un évènement pour dire que l'utilisateur a été déconnecté
  resetState();
  if (reduxStore) {
    reduxStore.dispatch(storeFunction(IS_CONNECTED, false));
  }
}

function refreshSessionToken() {
  if (adminSession) {
    new HttpClient('/admin/session', 'PUT')
      .headers({ Authorization: `Bearer ${currentUserSessionToken()}` })
      .body(adminSession.webSessionToken)
      .execute()
      .catch(toJsonError)
      .then(response => response.json())
      .then((adminSessionObjects) => {
        adminSession = adminSessionObjects;
        resetRefreshToken();
        refreshTokenTask = setInterval(refreshSessionToken, adminSession.refreshDurationInMillis);
        localStorage.setItem(SESSION_CURRENT_USER, JSON.stringify(adminSessionObjects));
      })
      .catch((error) => {
        let errorResponse = error;
        if (typeof error.errorCode !== 'undefined') {
          // eslint-disable-next-line
          errorResponse = Promise.resolve(error);
        } else if (typeof error.then !== 'function') {
          console.log(error);
          // eslint-disable-next-line
          errorResponse = Promise.resolve(errorObject);
        }

        (errorResponse: Object).then((errorJson) => {
          if (errorJson.errorCode === 'ALREADY_EXPIRED_SESSION_TOKEN') {
            userDisconnected('expired');
          } else {
            console.log('Cannot refresh user token', errorJson);
          }
        });
      });
  } else {
    console.log('refreshSessionToken called whereas the adminSession is null');
  }
}

function idleTimeDetectionCheck() {
  if (adminSession) {
    idleTime += IDLE_TIME_DETECTION_CHECK_THRESHOLD;
    if (idleTime > adminSession.inactiveDurationInMillis) {
      userDisconnected('idle');
    }
  } else {
    console.log('idleTimeDetectionCheck called whereas the adminSession is null');
  }
}

function parseUserFromJwtToken(jwtToken: string) {
  return JSON.parse(decodeURIComponent(escape(atob(jwtToken.split('.')[1]))));
}

function registerCurrentUser(adminSessionString: string) {
  resetState();
  adminSession = JSON.parse(adminSessionString);
  currentUserObject = {
    ...parseUserFromJwtToken(adminSession.webSessionToken),
  };

  adminSessionObject = {
    webSessionToken: adminSession.webSessionToken,
    refreshDurationInMillis: adminSession.refreshDurationInMillis,
    inactiveDurationInMillis: adminSession.inactiveDurationInMillis,
  };

  refreshTokenTask = setInterval(refreshSessionToken, adminSession.refreshDurationInMillis);
  // check every minute if the user is active or not
  idleTimeDetectionTask = setInterval(idleTimeDetectionCheck, IDLE_TIME_DETECTION_CHECK_THRESHOLD);

  // eslint-disable-next-line no-restricted-syntax
  for (const eventName of PAGE_CHANGE_EVENTS) {
    document.addEventListener(eventName, resetIdleTimeDetection, true);
  }

  return currentUserObject;
}

export function initializeSessionService(store: Store) {
  reduxStore = store;
}

export function currentUser() {
  if (currentUserObject) {
    return currentUserObject;
  }
  const currentUserSessionString = localStorage.getItem(SESSION_CURRENT_USER);
  if (currentUserSessionString) {
    try {
      registerCurrentUser(unwrap(currentUserSessionString));
      // force la mise à jour du token si on refresh
      refreshSessionToken();
    } catch (e) {
      console.log('Error deserializing the session => clearing local storage session', e);
      logout();
    }
  }
  return currentUserObject;
}

export function isUserLoggedOn() {
  return currentUser() !== null;
}

export function currentUserSessionToken() {
  return currentUser() && adminSession ? adminSession.webSessionToken : '';
}

export function logout() {
  resetState();
  if (reduxStore) {
    reduxStore.dispatch(storeFunction(IS_CONNECTED, false));
  }
}

export function login(credentials: CredentialsWithOtp) {
  return new HttpClient('/admin/session', 'POST')
    .jsonBody(credentials)
    .execute()
    .catch(toJsonError)
    .then(response => response.text().then((responseText) => {
      const registeredCurrentUser = registerCurrentUser(responseText);
      localStorage.setItem(SESSION_CURRENT_USER, responseText);
      if (reduxStore) {
        reduxStore.dispatch(storeFunction(IS_CONNECTED, true));
      }
      reloadLanguage();
      return registeredCurrentUser;
    }));
}

export function otpRequest(credentials: Credentials) {
  return new HttpClient('/eprm-session/otp-request', 'POST')
    .jsonBody(credentials)
    .execute()
    .catch(toJsonError)
    .then(response => response.json());
}
