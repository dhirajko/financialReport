import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { accountsReducer } from "./accounts";
import { accountReducer } from "./account";
import { trialBalanceReducer } from "./trialBalace";
import { profitLossReducer } from "./profitLoss";
import { balanceSheetReducer } from "./balaceSheet";
import { transactionsReducer } from "./transactions";
import { transactionReducer } from "./transaction";

const rootReducer = (state, action) => {
  const appReducer = history =>
    combineReducers({
      router: connectRouter(history),
      accounts: accountsReducer,
      account: accountReducer,
      transactions: transactionsReducer,
      transaction: transactionReducer,
      trialBalance: trialBalanceReducer,
      profitLoss: profitLossReducer,
      balanceSheet: balanceSheetReducer
    });

  if (action === "LOG_OUT_SUCCESS") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
