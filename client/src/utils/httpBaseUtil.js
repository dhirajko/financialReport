import axios from "axios";
import { push } from "connected-react-router";

import { API_URL, JWT_TOKEN } from "../constants/appConfig";
import { http404Error, http500Error } from "../actions/httpErrorAction";
import configureStore from "../store/configureStore";
import { getLocalStorage } from "./storageUtil";

const store = configureStore();

export const httpBase = () => {
  const api = axios.create({
    baseURL: `${API_URL}`,
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getLocalStorage(JWT_TOKEN)
    },
    responseType: "application/json"
  });

  api.interceptors.response.use(
    response => {
      // if (response.headers && response.headers['x-xsrf-token']) {
      //   setLocalStorage(JWT_TOKEN, response.headers['x-xsrf-token']);
      // }
      return response;
    },
    error => {
      if (401 === error.response.status) {
        store.dispatch(push("/"));
      }
      if (404 === error.response.status) {
        store.dispatch(http404Error());
        store.dispatch(push("/404"));
      }
      if (500 === error.response.status) {
        store.dispatch(http500Error());
        store.dispatch(push("/500"));
      }
      console.log("TODO");
      return Promise.reject(error);
    }
  );

  return api;
};
