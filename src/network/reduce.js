// @flow

import type { initialStateType } from '../state/example/exampleReducer';

type ActionType = {
  type: string,
  value: any
}

export const reduce = (initialState: any, actionMap: any) =>
  (state: initialStateType = initialState, action: ActionType) => {
    if (actionMap[action.type]) {
      return {
        ...state,
        [actionMap[action.type]]: action.value,
      };
    }
    return {
      ...state
    }
  };
export const store = (action: string, value: any) =>
  (dispatch: Function) => {
    dispatch({
      type: action,
      value,
    });
  };
