import React, { Component } from "react";
import { connect } from "react-redux";
import Account from "../../components/Account/account";
import { bindActionCreators } from "redux";

import { fetchAccountsById } from "../../service/accounts";

class AccountContainer extends Component {
  searchAccount = id => {
    this.props.actions.fetchAccountsById(id);
  };
  render() {
    return (
      <Account
        searchAccount={this.searchAccount}
        account={this.props.account}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  account: state.account.account
});
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchAccountsById
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountContainer);
