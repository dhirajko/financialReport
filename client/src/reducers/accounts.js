import {
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_PENDING,
  FETCH_ACCOUNTS_SUCCESS
} from "../constants/actionTypes";
const initialState = {
  pending: false,
  accounts: [],
  error: null
};

export function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        pending: false,
        accounts: action.payload
      };
    case FETCH_ACCOUNTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}
