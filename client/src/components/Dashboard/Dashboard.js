import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";
import history from "../../utils/history";
import start from "../../assets/start.png";
import statement from "../../assets/statement.png";
import account from "../../assets/account.png";
import transaction from "../../assets/transaction.png";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div id="apppage">
        <div className="dash-page">
          <MDBContainer id="page-wrap">
            <MDBRow className="text-center mb-3">
              <MDBCol
                sm="12"
                md="6"
                className="d-flex align-items-stretch mb-2"
              >
                <MDBCard>
                  <MDBCardBody className="">
                    <img src={start} alt="no imgae" width="25%"></img>

                    <MDBCardTitle>Easy Start </MDBCardTitle>
                    <MDBCardText>
                      Your book keeping system is a click step away from you.
                      Start to organize your transaction now.
                    </MDBCardText>
                    <MDBBtn href="/jump-start">Open</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol
                sm="12"
                md="6"
                className="d-flex align-items-stretch mb-2"
              >
                <MDBCard>
                  <MDBCardBody>
                    <img src={statement} alt="no imgae" width="25%"></img>
                    <MDBCardTitle>Your Financial Status </MDBCardTitle>
                    <MDBCardText>
                      Your book keeping system is a click step away from you.
                      Start to organize your transaction now.
                    </MDBCardText>
                    <MDBBtn href="/statement">Open</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow className="text-center mb-3">
              <MDBCol
                sm="12"
                md="6"
                className="d-flex align-items-stretch mb-2"
              >
                <MDBCard>
                  <MDBCardBody>
                    <img src={account} alt="no imgae" width="25%"></img>
                    <MDBCardTitle>Accounts </MDBCardTitle>
                    <MDBCardText>
                      Your book keeping system is a click step away from you.
                      Start to organize your transaction now.
                    </MDBCardText>
                    <MDBBtn
                      onClick={() => {
                        this.props.searchAccounts();
                        history.push("/accounts");
                      }}
                    >
                      Open
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol
                sm="12"
                md="6"
                className="d-flex align-items-stretch mb-2"
              >
                <MDBCard>
                  <MDBCardBody>
                    <img src={transaction} alt="no imgae" width="25%"></img>
                    <MDBCardTitle>Transactions </MDBCardTitle>
                    <MDBCardText>
                      Your book keeping system is a click step away from you.
                      Start to organize your transaction now.
                    </MDBCardText>
                    <MDBBtn
                      onClick={() => {
                        this.props.searchTransactions();
                        this.props.searchAccounts();
                        history.push("/transactions");
                      }}
                    >
                      Open
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
