export interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}

export interface ActionWithoutPayload<T> {
  type: T;
}
