import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EasyStart from "../../components/EasyStart/easyStart";
import { fetchAccounts, createAccounts } from "../../service/accounts";
import { createTransaction } from "../../service/transactions";

class EasyStartContainer extends Component {
  searchAllAccounts = () => {
    this.props.actions.fetchAccounts();
  };

  createTransaction = data => {
    this.props.actions.createTransaction(data);
  };

  createAccount = data => {
    this.props.actions.createAccounts(data);
  };

  render() {
    return (
      <EasyStart
        {...this.props}
        searchAccounts={this.searchAllAccounts}
        createAccount={this.createAccount}
        createTransaction={this.createTransaction}
      />
    );
  }
}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { fetchAccounts, createAccounts, createTransaction },
      dispatch
    )
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EasyStartContainer);
