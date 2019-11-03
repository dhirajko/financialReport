import {
  FETCH_ACCOUNT_PENDING,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_ERROR,
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_PENDING,
  CREATE_ACCOUNT_SUCCESS,
  CLEAN_ACCOUNT
} from "../constants/actionTypes";

export const accountFetchRequest = () => {
  return {
    type: FETCH_ACCOUNT_PENDING
  };
};

export const accountFetchRequestSuccess = data => {
  return {
    type: FETCH_ACCOUNT_SUCCESS,
    payload: data
  };
};

export const accountFetchRequestFailure = error => {
  return {
    type: FETCH_ACCOUNT_ERROR,
    error: error
  };
};

export const accountCreateRequest = () => {
  return {
    type: CREATE_ACCOUNT_PENDING
  };
};

export const accountCreateRequestSuccess = data => {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    payload: data
  };
};

export const accountCreateRequestFailure = error => {
  return {
    type: CREATE_ACCOUNT_ERROR,
    error: error
  };
};

export const cleanAccount = () => {
  return {
    type: CLEAN_ACCOUNT
  };
};
