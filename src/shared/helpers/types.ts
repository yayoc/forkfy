import { State as AuthState } from "shared/modules/auth";
import { State as SearchState } from "shared/modules/search";
import { State as EntityState } from "shared/modules/entity";
import { State as PlaylistState } from "shared/modules/playlist";

export interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}
export interface ActionWithoutPayload<T> {
  type: T;
}

export interface ReduxState {
  auth: AuthState;
  search: SearchState;
  entity: EntityState;
  playlist: PlaylistState;
}
