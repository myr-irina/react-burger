export interface TResponse<T> extends Response {
  json(): Promise<T>;
}

export type FormData = {
  password: string;
  token: string;
};

export type UserData = {
  email: string;
  password: string;
  name: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
