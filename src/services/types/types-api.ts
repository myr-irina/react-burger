export type TUser = {
  email: string;
  name: string;
};

export type TUserRegister = {
  email: string;
  password: string;
  name: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TUserUpdate = {
  email?: string;
  password?: string;
  name?: string;
};

export interface TResponse<T> extends Response {
  json(): Promise<T>;
}

export type TFormData = {
  password: string;
  token: string;
};
