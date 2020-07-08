import { apiPost } from "../helpers/api";

export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const SIGN_OUT = "SIGN_OUT";

export const signIn = (data) => {
  const payload = apiPost("/auth/sign-in", data);

  return { type: SIGN_IN, payload };
};

export const signUp = (data) => {
  const payload = apiPost("/auth/sign-up", data);

  return { type: SIGN_UP, payload };
};

export const signOut = (data) => {
  return { type: SIGN_OUT, payload: {} };
};