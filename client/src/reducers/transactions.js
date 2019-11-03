import {
  FETCH_TRANSACTIONS_ERROR,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_PENDING
} from "../constants/actionTypes";
const initialState = {
  pending: false,
  transactions: [],
  error: null
};

export function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        transactions: action.payload
      };
    case FETCH_TRANSACTIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}
