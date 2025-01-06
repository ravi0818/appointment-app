export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  pushToken?: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IRegisterResponse {
  message: string;
}

export interface IUser {
  email: string;
  role: string;
  pushToken: string;
}
export interface IAuthState {
  token: string | null;
  user: IUser | null;
}
