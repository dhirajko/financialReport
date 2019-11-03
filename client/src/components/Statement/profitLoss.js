import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBCard } from "mdbreact";
import "../../App.css";

export default class ProfitLoss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOpen: false,
      changePadding: true
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentChangePadding = window.innerWidth < 992;
    if (currentChangePadding !== this.state.changePadding) {
      this.setState({ changePadding: currentChangePadding });
    }
  }
  componentDidUpdate() {
    this.componentDidMount();
  }
  render() {
    const {
      creditTotal,
      debitTotal,
      expenses,
      incomes,
      status,
      amount
    } = this.props.data;
    const { changePadding } = this.state;
    return (
      <div id="apppage">
        <div className="dash-page">
          {this.props.tab === "2" ? (
            <MDBContainer id="page-wrap" className="text-center">
              <MDBCard
                className="w-85 text-center text-uppercase font-weight-bolder font-effect-shadow-multiple p-3"
                style={{ fontSize: "1.5em" }}
              >
                Profit Loss Account
              </MDBCard>

              <MDBRow className="mt-2 d-flex justify-content-around">
                <MDBCol sm="12" lg="6" className="p-2">
                  <span className="statement-heading">Expenses</span>

                  {expenses.map(account => (
                    <MDBCard className="p-1  m-1">
                      {" "}
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left">
                          {(account.accountName).toUpperCase()}
                        </MDBCol>
                        <MDBCol md="4">{account.closingBalance}</MDBCol>
                      </MDBRow>
                    </MDBCard>
                  ))}
                  {status === "LOSS" ? (
                    <MDBCard className="p-1  m-1 statement-heading">
                      {" "}
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left">
                          <span>Loss</span>
                        </MDBCol>
                        <MDBCol md="4">{amount}</MDBCol>
                      </MDBRow>
                    </MDBCard>
                  ) : (
                    ""
                  )}
                </MDBCol>
                <MDBCol
                  sm="12"
                  lg="6"
                  className={
                    changePadding ? "p-2 m-2 statement-heading" : "d-none "
                  }
                >
                  <div>
                    <MDBCard className="p-1  m-1">
                      <MDBRow className="m-2  statement-heading">
                        <MDBCol md="8" className="text-left">
                          TOTAL
                        </MDBCol>
                        <MDBCol md="4" >{creditTotal}</MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </div>
                </MDBCol>
                <MDBCol sm="12" lg="6" className="p-2 ">
                  <span className="statement-heading ">Incomes</span>
                  {incomes.length < 1 ? (
                    <MDBCard className="p-1 m-1">
                      {" "}
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left">
                          Income
                        </MDBCol>
                        <MDBCol md="4">0</MDBCol>
                      </MDBRow>
                    </MDBCard>
                  ) : (
                    incomes.map(account => (
                      <MDBCard className="p-1 m-1">
                        {" "}
                        <MDBRow className="m-2">
                          <MDBCol md="8" className="text-left">
                            {account.accountName.toUpperCase()}
                          </MDBCol>
                          <MDBCol md="4">{account.closingBalance}</MDBCol>
                        </MDBRow>
                      </MDBCard>
                    ))
                  )}
                  {status === "PROFIT" ? (
                    <MDBCard className="p-1  m-1">
                      {" "}
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left statement-heading">
                          <span>PROFIT</span>
                        </MDBCol>
                        <MDBCol md="4" className="statement-heading">{amount}</MDBCol>
                      </MDBRow>
                    </MDBCard>
                  ) : (
                    ""
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-2 text-center statement-heading">
                <MDBCol sm="12" lg="6" className="p-2">
                  <div>
                    <MDBCard className="p-1  m-1">
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left">
                          Total
                        </MDBCol>
                        <MDBCol md="4">
                          {debitTotal > creditTotal ? debitTotal : creditTotal}
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </div>
                </MDBCol>
                <MDBCol
                  sm="12"
                  lg="6"
                  className={changePadding ? "d-none" : "p-2"}
                >
                  <div>
                    <MDBCard className="p-1  m-1 statement-heading ">
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left">
                          Total
                        </MDBCol>
                        <MDBCol md="4">
                          {debitTotal > creditTotal ? debitTotal : creditTotal}
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
