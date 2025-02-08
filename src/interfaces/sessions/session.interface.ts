export interface ISession<R, T> {
  role: R;
  type: T;
  messageIds?: number[];
}
