import { apiPost } from "../../helpers/api";

export const SIGN_IN = "SIGN_IN";

export const signIn = (data) => {
  // fazer requisição na api
  const payload = apiPost("/auth/sign-in", data);

  return { type: SIGN_IN, payload };
};
