import {
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_PENDING,
  FETCH_ACCOUNTS_SUCCESS
} from "../constants/actionTypes";

export const accountsFetchRequest = () => {
  return {
    type: FETCH_ACCOUNTS_PENDING
  };
};

export const accountsFetchRequestSuccess = data => {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: data
  };
};
export const accountsFetchRequestFailure = error => {
  return {
    type: FETCH_ACCOUNTS_ERROR,
    error: error
  };
};
