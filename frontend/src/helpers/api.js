import axios from "axios";

import { getToken, getRefreshToken } from "../helpers/account";

export const getApiUrl = (path) => {
  return `http://localhost:3001${path}`;
};

export const getHeaders = () => {
  const token = getToken();

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const apiGet = (path) => {
  const url = getApiUrl(path);

  const options = {
    headers: getHeaders(),
  };

  return axios.get(url, options);
};

export const apiPost = (path, data = {}) => {
  const url = getApiUrl(path);
  const options = {
    headers: getHeaders(),
  };

  return axios.post(url, data, options);
};

export const apiRefreshToken = () => {
  const url = getApiUrl("/auth/refresh");
  const refreshToken = getRefreshToken();
  const options = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  if (!refreshToken) return;

  return axios.post(url, {}, options);
};
