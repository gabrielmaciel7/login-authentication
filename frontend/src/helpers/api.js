import axios from "axios";

import { getToken } from "../helpers/account";
import { secondsToReadableTime } from "../helpers/datetime";
import { getTokenExpire } from "../helpers/jwt";

export const getApiUrl = (path) => {
  return `http://localhost:3001${path}`;
};

export const getHeaders = () => {
  const token = getToken();

  if (!token) return {};

  const expires = getTokenExpire(token);
  const secondsToExpire = expires - Date.now() / 1000;
  const readableTime = secondsToReadableTime(secondsToExpire);

  console.log("*** helpers.api.getHeaders.readableTime", readableTime);

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
