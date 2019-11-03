import React from "react";
import { withRouter } from "react-router-dom";
import history from "../../../utils/history";
import "./sidebar.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const sidebarOpen = this.props.sidebar;

    return (
      <nav className={`sidenav ${sidebarOpen ? "active" : ""}`}>
        <ul>
          <li onClick={this.props.onSetSidebarOpen}>
            <a>
              {sidebarOpen ? (
                <i className="fa fa-times pl-1"></i>
              ) : (
                <i className="fa fa-bars pl-1"></i>
              )}
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                history.push("/dashboard");
              }}
              className={
                this.props.location.pathname === "/dashboard"
                  ? "sidebar-link"
                  : "sidebar-link-inactive"
              }
            >
              <i className="fa fa-home"></i>{" "}
              <span style={!sidebarOpen ? { display: "none" } : {}}>
                Dashboard
              </span>
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                this.props.searchAccounts();
                history.push("/accounts");
              }}
              className={
                this.props.location.pathname === "/accounts"
                  ? "sidebar-link"
                  : "sidebar-link-inactive"
              }
            >
              <i className="fas fa-chart-bar"></i>{" "}
              <span style={!sidebarOpen ? { display: "none" } : {}}>
                Accounts
              </span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                this.props.searchTransactions();
                history.push("/transactions");
              }}
              className={
                this.props.location.pathname === "/"
                  ? "sidebar-link"
                  : "sidebar-link-inactive"
              }
            >
              <i className="fas fa-hand-holding-usd"></i>{" "}
              <span style={!sidebarOpen ? { display: "none" } : {}}>
                transactions
              </span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Sidebar);
