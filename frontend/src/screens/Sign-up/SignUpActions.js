import { apiPost } from "../../helpers/api";

export const SIGN_UP = "SIGN_UP";

export const signUp = (data) => {
  // fazer requisição na api
  const payload = apiPost("/auth/sign-up", data);

  return { type: SIGN_UP, payload };
};
