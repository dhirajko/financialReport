import {
  CLEAN_TRANSACTION,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_PENDING,
  CREATE_TRANSACTION_ERROR,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_PENDING,
  FETCH_TRANSACTION_ERROR
} from "../constants/actionTypes";
export const transactionFetchRequest = () => {
  return {
    type: FETCH_TRANSACTION_PENDING
  };
};

export const transactionFetchRequestSuccess = data => {
  return {
    type: FETCH_TRANSACTION_SUCCESS,
    payload: data
  };
};

export const transactionFetchRequestFailure = error => {
  return {
    type: FETCH_TRANSACTION_ERROR,
    error: error
  };
};

export const transactionCreateRequest = () => {
  return {
    type: CREATE_TRANSACTION_PENDING
  };
};

export const transactionCreateRequestSuccess = data => {
  return {
    type: CREATE_TRANSACTION_SUCCESS,
    payload: data
  };
};

export const transactionCreateRequestFailure = error => {
  return {
    type: CREATE_TRANSACTION_ERROR,
    error: error
  };
};

export const cleantransaction = () => {
  return {
    type: CLEAN_TRANSACTION
  };
};
