export interface IResponse<T = any> {
  message: string;
  data: T;
}

export interface IErrorResponse {
  data: {
    message: string;
    error: string;
  };
}
