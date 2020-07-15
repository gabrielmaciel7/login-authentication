import {
  getAccount,
  setAccount,
  setToken,
  setRefreshToken,
  removeAccount,
  removeToken,
  removeRefreshToken,
} from "../helpers/account";

import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  INIT_ACCOUNT,
  USERS_LIST,
  REFRESH_TOKEN,
} from "../actions/AccountActions";

const initialState = {
  account: null,
  accounts: [],
  messageError: null,
};

export default function (state = initialState, action) {
  const { type, payload, messageError } = action;

  switch (type) {
    case SIGN_IN:
    case SIGN_UP:
      const response = payload ? payload.data : null;
      const account = response ? response.data : null;
      const metadata = response ? response.metadata : null;

      const token = metadata ? metadata.token : null;
      const refreshToken = metadata ? metadata.refreshToken : null;

      if (account) setAccount(account);
      if (token) setToken(token);
      if (refreshToken) setRefreshToken(refreshToken);

      return { ...state, account, messageError };

    case SIGN_OUT: {
      removeAccount();
      removeToken();
      removeRefreshToken();

      return { ...state, account: null };
    }

    case INIT_ACCOUNT: {
      const account = getAccount();

      return { ...state, account };
    }

    case USERS_LIST: {
      const response = payload ? payload.data : null;
      const users = response ? response.data : null;

      return { ...state, users };
    }

    case REFRESH_TOKEN: {
      const response = payload ? payload.data : null;
      const metadata = response ? response.metadata : null;

      const token = metadata ? metadata.token : null;

      if (token) setToken(token);

      return state;
    }

    default:
      return state;
  }
}
