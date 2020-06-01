import { LOGIN_USER, LOGOUT_USER } from '.';

export const login = (info: any) => ({
  type: LOGIN_USER,
  info,
});

export const logout = () => ({
  type: LOGOUT_USER,
});
