import axios from "axios";

import { BASE_URL } from "./APIUrls";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const setAuthToken = token => {
  if (token) {
    //applying token
    axiosInstance.defaults.headers.common["Authorization"] = token;
  } else {
    //deleting the token from header
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
