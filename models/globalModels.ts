/* Redux Dispatc Obj */
export type DispatchObject<T> = {
  ({ type, payload }: { type: string; payload: T }): any;
};
export type DispatchEmptyObject = {
  ({ type }: { type: string }): any;
};

/* Server Status Types */
export enum ServerStatus {
  "IDLE",
  "FETCH",
  "FETCHING",
  "FETCH_ERROR",
}
