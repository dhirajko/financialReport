import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBCard, MDBBtn } from "mdbreact";
import Modal from "./transactionModal";

import moment from "moment";
import reload from "../../assets/reload.png";
import "../../App.css";

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOpen: false
    };
  }

  componentDidMount() {
    this.props.searchAccounts();
    this.props.searchTransactions();
  }
  render() {
    const transactions = this.props.transactions;
    console.log(this.props);

    return (
      <div id="apppage">
        <div className="dash-page">
          <MDBContainer center id="page-wrap">
            <div className="text-center">
              <span className="list-page-heading">Transactions</span>
            </div>
            {Object.keys(transactions).length === 0 ? (
              <MDBRow className="text-center">
                <MDBCol middle>
                  <MDBBtn
                    className="p-3 rounded-circle"
                    onClick={this.props.searchTransactions}
                  >
                    <img src={reload} alt="Not found" height="50"></img>
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            ) : (
              <div>
                {transactions.map((account, index) => {
                  return (
                    <MDBCard className="p-3 text-center  m-3" key={account._id}>
                      <MDBRow className="w-100 align-items-center ">
                        <MDBCol md="2" sm="2">
                          <span
                            className="font-effect-shadow-multiple"
                            style={{ fontSize: "15px" }}
                          >
                            {moment(account.date).format("DD-MM-YYYY")}
                          </span>
                        </MDBCol>
                        <MDBCol md="6" sm="6">
                          <MDBRow>
                            <MDBCol xs="12" md="12" className="">
                              <span className="account-balance-inventory m-4 ">
                                Debit A/c:{" "}
                              </span>
                              <span
                                className="text-uppercase font-weight-bolder font-effect-shadow-multiple"
                                style={{ fontSize: "1.5em" }}
                              >
                                {account.debitAccount.accountName}
                              </span>
                            </MDBCol>
                            <MDBCol xs="12" md="12">
                              <span className="account-balance-inventory m-4 ">
                                Credit A/c:{" "}
                              </span>
                              <span
                                className="text-uppercase font-weight-bolder font-effect-shadow-multiple"
                                style={{ fontSize: "1.5em" }}
                              >
                                {account.creditAccount.accountName}
                              </span>
                            </MDBCol>
                          </MDBRow>
                        </MDBCol>
                        <MDBCol md="2" sm="2" className="account-balance">
                          € {account.amount}
                        </MDBCol>
                        <MDBCol md="1" sm="1" className="m-1">
                          <div className="round-button">
                            <a className=" text-light" href={`/transactions/${account._id}`}>open</a>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  );
                })}
              </div>
            )}
          </MDBContainer>
          <span style={{ position: "fixed", right: 50, bottom: 50 }}>
            <Modal
              accounts={this.props.accounts}
              createTransaction={this.props.createTransaction}
            ></Modal>
          </span>
        </div>
      </div>
    );
  }
}
