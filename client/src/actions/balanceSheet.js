import {
  FETCH_BALANCE_SHEET_ERROR,
  FETCH_BALANCE_SHEET_PENDING,
  FETCH_BALANCE_SHEET_SUCCESS,
  CLEAN_STATEMENT
} from "../constants/actionTypes";

export const cleanStatement = () => {
  return {
    type: CLEAN_STATEMENT
  };
};

export const balanceSheetFetchRequest = () => {
  return {
    type: FETCH_BALANCE_SHEET_PENDING
  };
};

export const balanceSheetFetchRequestSuccess = data => {
  return {
    type: FETCH_BALANCE_SHEET_SUCCESS,
    payload: data
  };
};

export const balanceSheetFetchRequestFailure = error => {
  return {
    type: FETCH_BALANCE_SHEET_ERROR,
    error: error
  };
};
