export const SIGN_IN = "SIGN_IN";

export const signIn = (data) => {
  // fazer requisição na api
  return { type: SIGN_IN, payload: data };
};
