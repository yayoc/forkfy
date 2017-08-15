import { State as AuthState } from "client/modules/auth";

export interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}
export interface ActionWithoutPayload<T> {
  type: T;
}

export interface ReduxState {
  auth: AuthState;
}
