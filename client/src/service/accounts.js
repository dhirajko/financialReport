import {
  accountsFetchRequest,
  accountsFetchRequestFailure,
  accountsFetchRequestSuccess
} from "../actions/accounts";
import {
  cleanAccount,
  accountCreateRequest,
  accountCreateRequestFailure,
  accountCreateRequestSuccess,
  accountFetchRequest,
  accountFetchRequestFailure,
  accountFetchRequestSuccess
} from "../actions/account";
import { store, fetch } from "../utils/httpUtil";
import Toast from "../components/Common/Toast/Toast";

export const fetchAccounts = () => {
  return dispatch => {
    dispatch(accountsFetchRequest());

    return fetch("api/accounts")
      .then(response => {
        dispatch(accountsFetchRequestSuccess(response.data.data));
      })
      .catch(error => {
        Toast("warning", error.response.data.data);
        dispatch(accountsFetchRequestFailure());
      });
  };
};

export const fetchAccountsById = id => {
  return dispatch => {
    dispatch(accountFetchRequest());
    return fetch(`api/accounts/${id}`)
      .then(response => {
        dispatch(accountFetchRequestSuccess(response.data.data));
      })
      .catch(error => {
        Toast("warning", error.response.data.data);
        dispatch(accountFetchRequestFailure());
      });
  };
};

export const createAccounts = formData => {
  return dispatch => {
    dispatch(cleanAccount());
    dispatch(accountCreateRequest());
    return store("api/accounts", formData)
      .then(response => {
        Toast("success", "account created successfully");
        dispatch(accountCreateRequestSuccess(response.data.data));
      })
      .catch(error => {
        Toast("warning", error.response.data.data);
        dispatch(accountCreateRequestFailure(error));
      });
  };
};
