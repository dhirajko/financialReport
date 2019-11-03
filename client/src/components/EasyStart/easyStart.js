import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCollapse,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";
import CapitalForm from "./capitaForm";
import Expenses from "./expensesForm";
import Income from "./incomeForm";

export default class EasyStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: ""
    };
  }

  componentDidMount() {
    this.props.searchAccounts();
  }

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  };

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  updateAcccountList = () => {
    this.componentDidMount();
  };

  render() {
    const accounts = this.props.accounts;

    return (
      <div id="apppage">
        <div className="dash-page">
          <MDBContainer id="page-wrap">
            <MDBCard className="w-100 mb-1">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="10">
                    <MDBCardTitle
                      className="text-center"
                      style={{ fontSize: "15px" }}
                      className="text-center text-uppercase align-bottom"
                    >
                      Introduce Balance to business
                    </MDBCardTitle>
                    <MDBCardText>
                      <MDBCollapse id="1" isOpen={this.state.collapseID} className="px-4">
                        <CapitalForm close={this.toggleCollapse} />
                      </MDBCollapse>
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol className=" text-center">
                    {this.state.collapseID == "1" ? (
                      <i
                        color="primary"
                        onClick={this.toggleCollapse("")}
                        style={{
                          fontSize: 30,
                          position: "absolute",
                          bottom: 3
                        }}
                        className="fas fa-chevron-up "
                      ></i>
                    ) : (
                      <i
                        color="primary"
                        onClick={this.toggleCollapse("1")}
                        className="fas fa-chevron-down "
                        style={{ fontSize: 30 }}
                      ></i>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="w-100 mb-1">
              <MDBCardBody className="">
                <MDBRow>
                  <MDBCol md="10">
                    <MDBCardTitle
                      className="text-center"
                      style={{ fontSize: "15px" }}
                      className="text-center text-uppercase align-bottom"
                    >
                      Add expenses
                    </MDBCardTitle>
                    <MDBCardText>
                      <MDBCollapse id="2" isOpen={this.state.collapseID} className="px-4">
                        <Expenses
                          accounts={accounts}
                          searchAccounts={this.props.searchAccounts}
                          createAccount={this.props.createAccount}
                          createTransaction={this.props.createTransaction}
                          updateList={this.updateAcccountList}
                        />
                      </MDBCollapse>
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol className=" text-center">
                    {this.state.collapseID == "2" ? (
                      <i
                        color="primary"
                        onClick={this.toggleCollapse("")}
                        style={{
                          fontSize: 30,
                          position: "absolute",
                          bottom: 3
                        }}
                        className="fas fa-chevron-up "
                      ></i>
                    ) : (
                      <i
                        color="primary"
                        onClick={this.toggleCollapse("2")}
                        className="fas fa-chevron-down "
                        style={{ fontSize: 30 }}
                      ></i>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="w-100">
              <MDBCardBody className="">
                <MDBRow>
                  <MDBCol md="10">
                    <MDBCardTitle
                      className="text-center"
                      style={{ fontSize: "15px" }}
                      className="text-center text-uppercase align-bottom"
                    >
                      Add Income
                    </MDBCardTitle>
                    <MDBCardText>
                      <MDBCollapse id="3" isOpen={this.state.collapseID} className="px-4">
                        <Income
                          accounts={accounts}
                          searchAccounts={this.props.searchAccounts}
                          createAccount={this.props.createAccount}
                          createTransaction={this.props.createTransaction}
                          updateList={this.updateAcccountList}
                        />
                      </MDBCollapse>
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol className=" text-center">
                    {this.state.collapseID == "3" ? (
                      <i
                        color="primary"
                        onClick={this.toggleCollapse("")}
                        style={{
                          fontSize: 30,
                          position: "absolute",
                          bottom: 3
                        }}
                        className="fas fa-chevron-up "
                      ></i>
                    ) : (
                      <i
                        color="primary"
                        onClick={this.toggleCollapse("3")}
                        className="fas fa-chevron-down "
                        style={{ fontSize: 30 }}
                      ></i>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
