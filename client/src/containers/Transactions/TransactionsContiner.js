import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Transactions from "../../components/Transactions/transactions";
import {
  fetchTransactionById,
  createTransaction,
  fetchTransactions
} from "../../service/transactions";
import { fetchAccounts } from "../../service/accounts";

class TransactionsContainer extends Component {
  searchTransaction = id => {
    this.props.actions.fetchTransactionById(id);
  };
  searchAllTransaction = () => {
    this.props.actions.fetchTransactions();
  };
  searchAccounts = () => {
    this.props.actions.fetchAccounts();
  };

  createTransaction = data => {
    this.props.actions.createTransaction(data);
  };
  render() {
    return (
      <Transactions
        {...this.props}
        transactions={this.props.transactions}
        accounts={this.props.accounts}
        searchTransactions={this.searchAllTransaction}
        searchTransaction={this.searchTransaction}
        searchAccounts={this.searchAccounts}
        createTransaction={this.createTransaction}
      />
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
  accounts: state.accounts.accounts
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchTransactions,
        fetchTransactionById,
        createTransaction,
        fetchAccounts
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsContainer);
