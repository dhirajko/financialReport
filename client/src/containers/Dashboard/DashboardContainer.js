import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dashboard from "../../components/Dashboard/Dashboard";
import { fetchAccounts } from "../../service/accounts";
import { fetchTransactions } from "../../service/transactions";

class DashboardContainer extends Component {
  searchAllAccounts = () => {
    this.props.actions.fetchAccounts();
  };

  searchAllTransactions = () => {
    this.props.actions.fetchTransactions();
  };

  render() {
    return (
      <Dashboard
        {...this.props}
        searchAccounts={this.searchAllAccounts}
        searchTransactions={this.searchAllTransactions}
      />
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ fetchAccounts, fetchTransactions }, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
