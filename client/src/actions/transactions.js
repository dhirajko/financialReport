import {
  FETCH_TRANSACTIONS_ERROR,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_PENDING,
  CLEAN_TRANSACTIONS
} from "../constants/actionTypes";

export const transactionsFetchRequest = () => {
  return {
    type: FETCH_TRANSACTIONS_PENDING
  };
};

export const transactionsFetchRequestSuccess = data => {
  return {
    type: FETCH_TRANSACTIONS_SUCCESS,
    payload: data
  };
};

export const transactionsFetchRequestFailure = error => {
  return {
    type: FETCH_TRANSACTIONS_ERROR,
    error: error
  };
};

export const cleanTransactions = error => {
  return {
    type: CLEAN_TRANSACTIONS
  };
};
