import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav } from "mdbreact";
import TrialBalance from "./trialBalance";
import ProfitLoss from "./profitLoss";
import Balancesheet from "./Balancesheet";

class Statement extends Component {
  state = {
    activeItem: "",
    data: {}
  };

  toggle = tab => async e => {
    if (this.state.activeItem !== tab) {
      let data = {};
      if (tab === "1") {
        data = await this.props.searchTB();
      } else if (tab === "2") {
        data = await this.props.searchPL();
      } else if (tab === "3") {
        data = await this.props.searchBS();
      }
      this.setState({
        activeItem: tab,
        data: data
      });
    }
  };

  render() {
    return (
      <MDBContainer>
        <MDBNav tabs>
          <ul className="nav nav-pills mb-5">
            <li className="nav-item">
              <a
                className={
                  this.state.activeItem === "1"
                    ? " btn btn-secondary "
                    : "m-1 nav-link active"
                }
                onClick={this.toggle("1")}
              >
                Trial Balance
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  this.state.activeItem === "2"
                    ? " btn btn-secondary "
                    : "m-1 nav-link active"
                }
                onClick={this.toggle("2")}
              >
                Profit and Loss
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  this.state.activeItem === "3"
                    ? " btn btn-secondary "
                    : "m-1 nav-link active"
                }
                onClick={this.toggle("3")}
              >
                Balance Sheet
              </a>
            </li>
          </ul>
        </MDBNav>
        <MDBTabContent className="card" activeItem={this.state.activeItem}>
          <MDBTabPane tabId="1" role="tabpanel">
            <TrialBalance tab={this.state.activeItem} data={this.state.data} />
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <ProfitLoss tab={this.state.activeItem} data={this.state.data} />
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            <Balancesheet tab={this.state.activeItem} data={this.state.data} />
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}
export default Statement;
