import {
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_PENDING,
  CREATE_TRANSACTION_ERROR,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_PENDING,
  FETCH_TRANSACTION_ERROR
} from "../constants/actionTypes";
const initialState = {
  pending: false,
  transaction: {},
  error: null
};

export function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTION_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        pending: false,
        transaction: action.payload
      };
    case FETCH_TRANSACTION_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CREATE_TRANSACTION_PENDING:
      return {
        ...state,
        pending: true
      };
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        pending: false,
        transaction: action.payload
      };
    case CREATE_TRANSACTION_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}
