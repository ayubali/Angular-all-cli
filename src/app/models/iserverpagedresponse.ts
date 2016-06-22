interface IServerPagedResponse<T> {
  items: T[];
  total: number;
}
