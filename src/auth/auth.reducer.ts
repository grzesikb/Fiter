import {
  ACTIONS,
  ActionInterface,
  AuthStateInterface,
} from "../auth/auth.interface";
import { authActions } from "./auth.actions";

export const authReducer = (
  state: AuthStateInterface,
  action: ActionInterface
) => {
  const handler = authActions[action.type];
  return handler(state, action);
};
