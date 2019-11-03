import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MDBJumbotron,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBCardBody,
  MDBCardText,
  MDBBtn
} from "mdbreact";
import moment from "moment";

class Transaction extends Component {
  constructor(props) {
    super(props);
  }
componentDidMount() {
  this.props.searchTransaction(this.props.match.params.id);
}
  render() {
    const { transaction } = this.props;
    console.log(transaction, "r")

    return (
      <MDBContainer className="mt-5 text-center">
        {Object.keys(transaction).length === 0 ? (
          <Link to="/transactions" className="">
            <MDBBtn>Back</MDBBtn>
          </Link>
        ) : (
          <MDBRow center>
            <MDBCol>
              <MDBJumbotron className="text-center">
                <MDBCardTitle className="card-title h4 pb-2">
                  <strong>Transaction Details</strong>
                </MDBCardTitle>
                <MDBCardBody>
                  <MDBRow className="w-100 align-items-center transaction-card-body p-4">
                    <MDBCol md="2" sm="2">
                      <span
                        className="font-effect-shadow-multiple account-balance-inventory"
                        style={{ fontSize: "15px" }}
                      >
                        {moment().format("DD-MM-YYYY")}
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
                            {transaction.debitAccount.accountName}
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
                            {transaction.creditAccount.accountName}
                          </span>
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                    <MDBCol
                      md="2"
                      sm="2"
                      className="account-balance account-balance-values"
                    >
                      € {transaction.amount}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
                <MDBCardText className=" text-left m-2">
                  Descreption :{" "}
                  <strong className="transaction-description ">
                    {transaction.descreption}
                  </strong>
                </MDBCardText>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        )}
      </MDBContainer>
    );
  }
}

export default Transaction;
