import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBCard } from "mdbreact";
import "../../App.css";

export default class TrialBalance extends Component {
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
    const { debit, credit, debitTotal, creditTotal } = this.props.data;
    const { changePadding } = this.state;
    return (
      <div id="apppage">
        <div className="dash-page">
          {this.props.tab === "1" ? (
            <MDBContainer id="page-wrap" className="text-center">
              <MDBCard
                className="w-85 text-center text-uppercase font-weight-bolder font-effect-shadow-multiple p-3"
                style={{ fontSize: "1.5em" }}
              >
                Trial Balance
              </MDBCard>

              <MDBRow className="mt-2 d-flex justify-content-around">
                <MDBCol sm="12" lg="6" className="p-2 ">
                  <span className="statement-heading">Debit</span>

                  {debit.map((account, index) => (
                    <MDBCard className="p-1  m-1" key={index}>
                      {" "}
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left text-uppercase">
                          {account.accountName}
                        </MDBCol>
                        <MDBCol md="4">{account.closingBalance}</MDBCol>
                      </MDBRow>
                    </MDBCard>
                  ))}
                </MDBCol>
                <MDBCol
                  sm="12"
                  lg="6"
                  className={changePadding ? "p-2 m-2" : "d-none "}
                >
                  <div>
                    <MDBCard className="p-1  m-1 statement-heading">
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left ">
                          <span className="">Total</span>
                        </MDBCol>
                        <MDBCol md="4">{creditTotal}</MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </div>
                </MDBCol>
                <MDBCol sm="12" lg="6" className="p-2 ">
                  <span className="statement-heading">Credit</span>

                  <div>
                    {credit.map((account, index) => (
                      <MDBCard className="p-1  m-1" key={index}>
                        {" "}
                        <MDBRow className="m-2">
                          <MDBCol md="8" className="text-left text-uppercase">
                            {account.accountName}
                          </MDBCol>
                          <MDBCol md="4">{account.closingBalance}</MDBCol>
                        </MDBRow>
                      </MDBCard>
                    ))}
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-2 text-center">
                <MDBCol sm="12" lg="6" className="p-2">
                  <div>
                    <MDBCard className="p-1  m-1 statement-heading">
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left">
                          Total
                        </MDBCol>
                        <MDBCol md="4">{debitTotal}</MDBCol>
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
                    <MDBCard className="p-1  m-1 statement-heading">
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left">
                          Total
                        </MDBCol>
                        <MDBCol md="4">{creditTotal}</MDBCol>
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
