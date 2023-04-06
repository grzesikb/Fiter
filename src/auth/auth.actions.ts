import { ActionInterface, AuthStateInterface } from "../auth/auth.interface";

export const authActions = {
  loadUser: (state: AuthStateInterface, action: ActionInterface) => {
    return { ...state, user: action.payload };
  },
  removeUser: (state: AuthStateInterface, action: ActionInterface) => {
    return { ...state, user: action.payload };
  },
};
