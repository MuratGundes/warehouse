export interface IRepository<T> {
  getById(id: any): Promise<T>;
  getAll(): Promise<Array<T>>;
}
