// @flow

import { reduce } from '../../network/reduce';
import type { HistoryLog } from '../../types/historyTypes';

export type UserStateType = {
  historyLogs: HistoryLog[],
  searchHistoryLogs: HistoryLog[],
};

const initialState: UserStateType = {
  historyLogs: [],
  searchHistoryLogs: null,
};

export const HISTORY_LOGS = 'HISTORY_LOGS';
export const SEARCH_HISTORY_LOGS = 'SEARCH_HISTORY_LOGS';

const historyReducer = reduce(initialState, {
  [HISTORY_LOGS]: 'historyLogs',
  [SEARCH_HISTORY_LOGS]: 'searchHistoryLogs',
});

export default historyReducer;
