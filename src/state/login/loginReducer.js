// @flow
import { reduce } from '../../network/reduce';
import { isUserLoggedOn } from '../../services/sessionService';
import type { LoginStateType } from '../../types/loginTypes';
import { IS_CONNECTED } from './loginConst';

const initialState: LoginStateType = {
  isConnected: isUserLoggedOn(),
};

const loginReducer = reduce(initialState, {
  [IS_CONNECTED]: 'isConnected',
});

export default loginReducer;
