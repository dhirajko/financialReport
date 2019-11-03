import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Accounts from "../../components/Accounts";
import {
  fetchAccounts,
  fetchAccountsById,
  createAccounts
} from "../../service/accounts";

class AccountsContainer extends Component {
  fetchAccount = id => {
    this.props.actions.fetchAccountsById(id);
  };

  createAccount = data => {
    this.props.actions.createAccounts(data);
  };

  fetchAccounts = () => {
    this.props.actions.fetchAccounts();
  };

  render() {
    return (
      <Accounts
        {...this.props}
        accounts={this.props.accounts}
        fetchAccount={this.fetchAccount}
        createAccount={this.createAccount}
        fetchAccounts={this.fetchAccounts}
      />
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { fetchAccountsById, createAccounts, fetchAccounts },
      dispatch
    )
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsContainer);
