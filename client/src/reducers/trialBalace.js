import {
  FETCH_TRIAL_BALANCE_ERROR,
  FETCH_TRIAL_BALANCE_PENDING,
  FETCH_TRIAL_BALANCE_SUCCESS
} from "../constants/actionTypes";
const initialState = {
  pending: false,
  trialBalance: {},
  error: null
};

export function trialBalanceReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRIAL_BALANCE_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_TRIAL_BALANCE_SUCCESS:
      return {
        ...state,
        pending: false,
        trialBalance: action.payload
      };
    case FETCH_TRIAL_BALANCE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    default:
      return state;
  }
}
