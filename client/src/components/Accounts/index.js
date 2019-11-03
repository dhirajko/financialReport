import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBCard, MDBBtn } from "mdbreact";
import reload from "../../assets/reload.png";
import Modal from "./Modal";
import "../../App.css";

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOpen: false
    };
  }

  render() {
    const accounts = this.props.accounts;
    return (
      <div id="apppage">
        <div className="dash-page">
          <MDBContainer id="page-wrap">
            <div className="text-center">
              <span className="list-page-heading">Accounts</span>
            </div>

            {Object.keys(accounts).length === 0 ? (
              <MDBRow className="text-center">
                <MDBCol middle>
                  <MDBBtn
                    className="p-3 rounded-circle"
                    onClick={this.props.fetchAccounts}
                  >
                    <img src={reload} alt="image not found" height="50"></img>
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            ) : (
              <div>
                {accounts.map((account, index) => {
                  return (
                    <MDBCard className="p-3 text-center  m-3" key={account._id}>
                      <MDBRow className="w-100 align-items-center ">
                        <MDBCol md="2" sm="2">
                          <span
                            className="font-effect-shadow-multiple"
                            style={{ fontSize: "30px" }}
                          >
                            {index + 1}
                          </span>
                        </MDBCol>
                        <MDBCol md="6" sm="6">
                          <span
                            className="text-uppercase font-weight-bolder font-effect-shadow-multiple"
                            style={{ fontSize: "1.5em" }}
                          >
                            {account.accountName}
                          </span>
                          <br />
                          Tag :{" "}
                          <span className="badge badge-pill badge-primary p-2 mt-3">
                            {account.tag}
                          </span>
                        </MDBCol>
                        <MDBCol md="2" sm="2" className="account-balance">
                          € {account.closingBalance}
                        </MDBCol>
                        <MDBCol md="1" sm="1" className="m-1">
                          <div className="round-button">
                            <a  className=" text-light" href={`/accounts/${account._id}`}>open</a>
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
            <Modal createAccount={this.props.createAccount}></Modal>
          </span>
        </div>
      </div>
    );
  }
}
