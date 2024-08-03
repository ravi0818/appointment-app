export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  role: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IRegisterResponse {
  message: string;
}
