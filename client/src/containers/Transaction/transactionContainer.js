import React, { Component } from "react";
import { connect } from "react-redux";
import Transaction from "../../components/Transaction/transaction";
import { bindActionCreators } from "redux";

import { fetchTransactionById } from "../../service/transactions";

class TransactionContainer extends Component {
  searchTransaction = id => {
    this.props.actions.fetchTransactionById(id);
  };
  render() {
    console.log(this.props);
    return (
      <Transaction
        searchTransaction={this.searchTransaction}
        transaction={this.props.transaction}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction.transaction
});
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchTransactionById
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionContainer);
