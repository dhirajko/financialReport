import {
  FETCH_TRIAL_BALANCE_ERROR,
  FETCH_TRIAL_BALANCE_PENDING,
  FETCH_TRIAL_BALANCE_SUCCESS,
  CLEAN_STATEMENT
} from "../constants/actionTypes";

export const cleanStatement = () => {
  return {
    type: CLEAN_STATEMENT
  };
};
export const trialBalanceFetchRequest = () => {
  return {
    type: FETCH_TRIAL_BALANCE_PENDING
  };
};

export const trialBalanceFetchRequestSuccess = data => {
  return {
    type: FETCH_TRIAL_BALANCE_SUCCESS,
    payload: data
  };
};

export const trialBalanceFetchRequestFailure = error => {
  return {
    type: FETCH_TRIAL_BALANCE_ERROR,
    error: error
  };
};
