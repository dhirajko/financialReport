import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Sidebar from "../../components/Common/Sidebar/sidebar";
import { fetchAccounts } from "../../service/accounts";
import { fetchTransactions } from "../../service/transactions";

class SideBarContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      show: false
    };
  }

  searchAllAccounts = () => {
    this.props.actions.fetchAccounts();
  };

  searchAllTransactions = () => {
    this.props.actions.fetchTransactions();
  };

  render() {
    return (
      <Sidebar
        sidebar={this.props.show}
        onSetSidebarOpen={this.props.toggle}
        searchAccounts={this.searchAllAccounts}
        searchTransactions={this.searchAllTransactions}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ fetchAccounts, fetchTransactions }, dispatch)
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SideBarContainer);
