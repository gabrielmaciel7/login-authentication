import axios from "axios";

import { getToken } from "../helpers/account";

export const getApiUrl = (path) => {
  return `http://localhost:3001${path}`;
};

export const getHeaders = () => {
  const token = getToken();

  if (!token) return {};

  const tokenParts = token.split(".");
  const header = tokenParts[0];
  const payload = tokenParts[1];
  const signature = tokenParts[2];

  const data = JSON.parse(atob(payload));

  console.log(
    "*** helpers.api.getHeaders.tokenParts",
    header,
    payload,
    signature
  );
  console.log("*** helpers.api.getHeaders.data", data);

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
