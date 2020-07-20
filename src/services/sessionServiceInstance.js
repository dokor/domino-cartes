// @flow

import type { AdminUser } from '../types/loginTypes';
import { currentUser, logout } from './sessionService';

export interface SessionService {
  currentUser(): ?AdminUser;

  logout(): void;
}

class SessionServiceWeb implements SessionService {
  currentUser = () => currentUser();
  logout = () => logout();
}

let sessionService = new SessionServiceWeb();

export function changeSessionService(newSessionService: SessionService) {
  sessionService = newSessionService;
}

export function currentSessionService(): SessionService {
  return sessionService;
}



