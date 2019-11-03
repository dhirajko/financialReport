import {
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_PENDING,
  CREATE_ACCOUNT_SUCCESS,
  CLEAN_ACCOUNT,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_ERROR,
  FETCH_ACCOUNT_PENDING
} from "../constants/actionTypes";
const initialState = {
  pending: false,
  account: {},
  error: null
};

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        pending: false,
        account: action.payload
      };
    case FETCH_ACCOUNT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CREATE_ACCOUNT_PENDING:
      return {
        ...state,
        pending: true
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        pending: false,
        account: action.payload
      };
    case CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case CLEAN_ACCOUNT:
      return {
        ...state,
        pending: false,
        error: null,
        account: {}
      };
    default:
      return state;
  }
}
