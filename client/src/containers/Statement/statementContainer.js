import React, { Component } from "react";
import Statement from "../../components/Statement/statement";
import {
  fetchBalanceSheet,
  fetchPofitLoss,
  fetchTrialBalance
} from "../../service/statements";

class StatementContainer extends Component {
  render() {
    return (
      <Statement {...this.props} 
      searchBS={fetchBalanceSheet}
      searchTB={fetchTrialBalance}
      searchPL={fetchPofitLoss}
      />
    );
  }
}

export default StatementContainer;
