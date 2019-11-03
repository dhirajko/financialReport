import {
  transactionCreateRequest,
  transactionCreateRequestFailure,
  transactionCreateRequestSuccess,
  transactionFetchRequest,
  transactionFetchRequestFailure,
  transactionFetchRequestSuccess
} from "../actions/transaction";
import {
  transactionsFetchRequestSuccess,
  transactionsFetchRequestFailure,
  transactionsFetchRequest
} from "../actions/transactions";
import { store, fetch, destroy } from "../utils/httpUtil";
import Toast from "../components/Common/Toast/Toast";

export const fetchTransactions = () => {
  return dispatch => {
    dispatch(transactionsFetchRequest());
    return fetch("api/transactions")
      .then(response => {
        dispatch(transactionsFetchRequestSuccess(response.data.data));
      })
      .catch(error => {
        Toast("warning", error.response.data.data);
        dispatch(transactionsFetchRequestFailure(error));
      });
  };
};

export const fetchTransactionById = id => {
  return dispatch => {
    dispatch(transactionFetchRequest());
    return fetch(`api/transactions/${id}`)
      .then(response => {
        console.log(response.data.data);

        dispatch(transactionFetchRequestSuccess(response.data.data));
      })
      .catch(error => {
        console.log("errrttttttttttttttttttttttttttt");

        Toast("warning", error.response.data.data);
        dispatch(transactionFetchRequestFailure(error));
      });
  };
};

export const createTransaction = formData => {
  return dispatch => {
    dispatch(transactionCreateRequest());
    return store("api/transactions", formData)
      .then(response => {
        if (response.data.status_code == 201) {
          Toast("success", "created successfully");
          dispatch(transactionCreateRequestSuccess(response.data.data));
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          Toast("info", response.data.data);
          dispatch(transactionCreateRequestFailure(response.data.data));
        }
      })
      .catch(error => {
        Toast("warning", error.response.data.data);
        dispatch(transactionCreateRequestFailure(error));
      });
  };
};
