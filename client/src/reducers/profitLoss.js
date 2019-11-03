import {
  FETCH_PROFIT_LOSS_PENDING,
  FETCH_PROFIT_LOSS_SUCCESS,
  FETCH_PROFIT_LOSS_ERROR,
  
} from "../constants/actionTypes";
const initialState = {
  pending: false,
  profitLoss: {},
  error: null
};

export function profitLossReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFIT_LOSS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_PROFIT_LOSS_SUCCESS:
      return {
        ...state,
        pending: false,
        profitLoss: action.payload
      };
    case FETCH_PROFIT_LOSS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };

  

    default:
      return state;
  }
}
