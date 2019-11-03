import {

  FETCH_BALANCE_SHEET_ERROR,
  FETCH_BALANCE_SHEET_PENDING,
  FETCH_BALANCE_SHEET_SUCCESS,
 
} from "../constants/actionTypes";
const initialState = {
  pending: false,
  balanceSheet: {},
  error: null
};

export function balanceSheetReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_BALANCE_SHEET_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_BALANCE_SHEET_SUCCESS:
      return {
        ...state,
        pending: false,
        balanceSheet: action.payload
      };
    case FETCH_BALANCE_SHEET_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    default:
      return state;
  }
}
