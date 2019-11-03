import Toast from "../components/Common/Toast/Toast";
import axios from "axios";
import { API_URL, JWT_TOKEN } from "../constants/appConfig";
import { getLocalStorage } from "../utils/storageUtil";

export const fetchTrialBalance = () => {
  return axios
    .get(
      API_URL + "api/statement/trialbalance",

      {
        headers: {
          Accept: "application/json",
          "x-auth-token": getLocalStorage(JWT_TOKEN)
        }
      }
    )
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      Toast("warning", error.response.data.data);
    });
};

export const fetchPofitLoss = () => {
  return axios
    .get(
      API_URL + "api/statement/placcount",

      {
        headers: {
          Accept: "application/json",
          "x-auth-token": getLocalStorage(JWT_TOKEN)
        }
      }
    )
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      Toast("warning", error.response.data.data);
    });
};

export const fetchBalanceSheet = () => {
  return axios
    .get(
      API_URL + "api/statement/balancesheet",

      {
        headers: {
          Accept: "application/json",
          "x-auth-token": getLocalStorage(JWT_TOKEN)
        }
      }
    )
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      Toast("warning", error.response.data.data);
    });
};
