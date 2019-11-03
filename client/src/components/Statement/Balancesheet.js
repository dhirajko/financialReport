import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBCard } from "mdbreact";
import "../../App.css";


export default class BalanceSheet extends Component {
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
      capital,
      capitalTotal,
      liability,
      liabilityTotal,
      pl,
      currentAssets,
      currentAssetsTotal,
      fixedAssets,
      fixedAssetsTotal
    } = this.props.data;

    const { changePadding } = this.state;
    return (
      <div id="apppage">
        <div className="dash-page">
          {this.props.tab === "3" ? (
            <MDBContainer id="page-wrap" className="text-center">
              <MDBCard
                className="w-85 text-center text-uppercase font-weight-bolder font-effect-shadow-multiple p-3"
                style={{ fontSize: "1.5em" }}
              >
                Balance Sheet
              </MDBCard>

              <MDBRow className="mt-2 d-flex justify-content-around">
                <MDBCol sm="12" lg="6" className="p-2">
                  <span className="statement-heading">
                    Capital and Liability
                  </span>
                  {capital.map((account, index) => (
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
                  <MDBCard className="p-1  m-1">
                    <MDBRow className="m-2">
                      <MDBCol md="8" className="text-left">
                        {pl.status}
                      </MDBCol>
                      <MDBCol md="4">{pl.amount}</MDBCol>
                    </MDBRow>
                  </MDBCard>
                  {liability.map((account, index) => (
                    <MDBCard className="p-1  m-1" key={index}>
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left text-uppercase">
                          {account.accountName}
                        </MDBCol>
                        <MDBCol md="4">{account.closingBalance}</MDBCol>
                      </MDBRow>
                    </MDBCard>
                  ))}
                </MDBCol>
                <MDBCol sm="12" lg="6" className="p-2 ">
                  <span className="statement-heading">Assets</span>

                  <div>
                    {fixedAssets.map((account, index) => (
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

                    {currentAssets.map((account, index) => (
                      <MDBCard className="p-1  m-1" key={index}>
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
                          <span className="">Total</span>
                        </MDBCol>
                        <MDBCol md="4">
                          {capitalTotal + liabilityTotal + pl.amount >
                          currentAssetsTotal + fixedAssetsTotal
                            ? capitalTotal + liabilityTotal + pl.amount
                            : currentAssetsTotal + fixedAssetsTotal}
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
                    <MDBCard className="p-1  m-1 statement-heading">
                      <MDBRow className="m-2">
                        <MDBCol md="8" className="text-left">
                          Total
                        </MDBCol>
                        <MDBCol md="4">
                          {capitalTotal + liabilityTotal + pl.amount >
                          currentAssetsTotal + fixedAssetsTotal
                            ? capitalTotal + liabilityTotal + pl.amount
                            : currentAssetsTotal + fixedAssetsTotal}
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
