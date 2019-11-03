import {
  FETCH_PROFIT_LOSS_PENDING,
  FETCH_PROFIT_LOSS_SUCCESS,
  FETCH_PROFIT_LOSS_ERROR,
  CLEAN_STATEMENT
} from "../constants/actionTypes";

export const cleanStatement = () => {
  return {
    type: CLEAN_STATEMENT
  };
};

export const profitLossFetchRequest = () => {
  return {
    type: FETCH_PROFIT_LOSS_PENDING
  };
};

export const profitLossFetchRequestSuccess = data => {
  return {
    type: FETCH_PROFIT_LOSS_SUCCESS,
    payload: data
  };
};

export const profitLossFetchRequestFailure = error => {
  return {
    type: FETCH_PROFIT_LOSS_ERROR,
    error: error
  };
};
