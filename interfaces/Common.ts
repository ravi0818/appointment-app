export interface IResponse<T = any> {
  status: string;
  message: string;
  data: T;
  error: string | null;
}
