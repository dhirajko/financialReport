import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBCard } from "mdbreact";
//import account from "../../mocks/account";
import Chart from "./chart";
import moment from "moment";
import "../../App.css";

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOpen: false
    };
  }

  componentDidMount() {
    this.props.searchAccount(this.props.match.params.id);
  }

  chartDateData = account => {
    return account.closingBalanceHistory.map(data =>
      moment(data.date).format("LL")
    );
  };
  chartBalanceData = account => {
    return account.closingBalanceHistory.map(data => data.balance);
  };

  render() {
    const { account } = this.props;
    return (
      <div id="apppage">
        {Object.keys(account).length === 0 ? (
          "Select the account"
        ) : (
          <div className="dash-page">
            <MDBContainer id="page-wrap">
              <MDBCard
                className="text-center text-uppercase font-weight-bolder font-effect-shadow-multiple p-3"
                style={{ fontSize: "1.5em" }}
              >
                {account.accountName}
              </MDBCard>
              <MDBRow className="container mt-5">
                <MDBCol sm="12" lg="6" className="m-2 p-2">
                  <MDBRow className="m-4">
                    <MDBCol className="col-5 d-flex  align-items-center">
                      <span className="m-2  account-balance-key float-left">
                        Closing Balance
                      </span>
                    </MDBCol>
                    <MDBCol className="col-1 account-balance-values text-center d-flex align-items-center">
                      :
                    </MDBCol>
                    <MDBCol className="col-5 d-flex align-items-center">
                      <span className="m-2 p-2 account-balance-values ">
                        € {account.closingBalance}
                      </span>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="m-4">
                    <MDBCol className="col-5 d-flex  align-items-center">
                      <span className="m-2  account-balance-key float-left">
                        Tag
                      </span>
                    </MDBCol>
                    <MDBCol className="col-1 account-balance-values text-center d-flex align-items-center">
                      :
                    </MDBCol>
                    <MDBCol className="col-5 d-flex align-items-center">
                      <span className="m-2 p-2 account-balance-values account-tag">
                        {account.tag}
                      </span>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="m-4">
                    <MDBCol className="col-5 d-flex  align-items-center">
                      <span className="m-2  account-balance-key float-left">
                        Inventory Affected
                      </span>
                    </MDBCol>
                    <MDBCol className="col-1 account-balance-values text-center d-flex align-items-center">
                      :
                    </MDBCol>
                    <MDBCol className="col-5 d-flex align-items-center">
                      <span className="m-2 p-2 account-balance-values account-balance-inventory">
                        {account.inventoryAffects.toString()}
                      </span>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="m-4">
                    <MDBCol className="col-5 d-flex  align-items-center">
                      <span className="m-2  account-balance-key float-left">
                        Descreption
                      </span>
                    </MDBCol>
                    <MDBCol className="col-1 account-balance-values text-center d-flex align-items-center">
                      :
                    </MDBCol>
                    <MDBCol className="col-5 d-flex align-items-center">
                      <span className="m-2 p-2 account-balance-values account-balance-description ">
                        {account.descreption}
                      </span>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol sm="12" lg="5">
                  <Chart
                    date={this.chartDateData(account)}
                    balance={this.chartBalanceData(account)}
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        )}
      </div>
    );
  }
}
