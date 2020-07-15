import { apiGet, apiPost, apiRefreshToken } from "../helpers/api";

export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const SIGN_OUT = "SIGN_OUT";
export const INIT_ACCOUNT = "INIT_ACCOUNT";
export const USERS_LIST = "USERS_LIST";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const signIn = async (data) => {
  let messageError = null;
  const payload = await apiPost("/auth/sign-in", data).catch((error) => {
    messageError =
      error.response.data.message || error.response.data.metadata.error;
  });

  return { type: SIGN_IN, payload, messageError };
};

export const signUp = async (data) => {
  let messageError = null;
  const payload = await apiPost("/auth/sign-up", data).catch((error) => {
    messageError =
      error.response.data.message || error.response.data.metadata.error;
  });

  return { type: SIGN_UP, payload, messageError };
};

export const signOut = (data) => {
  return { type: SIGN_OUT, payload: {} };
};

export const initAccount = () => {
  return { type: INIT_ACCOUNT, payload: {} };
};

export const usersList = (data) => {
  const payload = apiGet("/users-list");

  return { type: USERS_LIST, payload };
};

export const getFreshToken = () => {
  const payload = apiRefreshToken();

  return { type: REFRESH_TOKEN, payload };
};
