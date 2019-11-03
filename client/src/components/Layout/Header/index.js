import React, { Component } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse
} from "mdbreact";

import { AuthConsumer } from "./AuthContext";

class AppHeader extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <React.Fragment>
        <header style={{ marginBottom: "100px" }}>
          <AuthConsumer>
            {({ isAuthenticated, logout}) => (
              <div>
                {isAuthenticated ? (
                  <MDBNavbar
                    color="unique-color-dark"
                    fixed="top"
                    dark
                    expand="md"
                    scrolling
                  >
                    <MDBNavbarBrand>
                      <Link to="/">
                        <strong className="white-text text-uppercase">Home</strong>
                      </Link>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse
                      id="navbarCollapse3"
                      isOpen={this.state.isOpen}
                      navbar
                    >
                      <MDBNavbarNav left>
                        <MDBNavItem>
                          <NavLink
                            className="nav-link waves-effect waves-light text-uppercase"
                            to="/dashboard"
                          >
                            Dashboard
                          </NavLink>
                        </MDBNavItem>
                      </MDBNavbarNav>
                      <MDBNavbarNav right>
                        <React.Fragment>
                          <NavLink
                            className="nav-link waves-effect waves-light text-uppercase"
                            to="/login"
                            onClick={() => logout()}
                          >
                            Logout
                          </NavLink>
                        </React.Fragment>
                      </MDBNavbarNav>
                    </MDBCollapse>
                  </MDBNavbar>
                ) : (
                  <MDBNavbar
                    color="unique-color-dark"
                    fixed="top"
                    dark
                    expand="md"
                    scrolling
                  >
                    <MDBNavbarBrand>
                      <Link to="/">
                        <strong className="white-text text-uppercase">Home</strong>
                      </Link>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse
                      id="navbarCollapse3"
                      isOpen={this.state.isOpen}
                      navbar
                    >
                      <MDBNavbarNav left>
                        {/* <MDBNavItem>
                          <NavLink
                            className="nav-link waves-effect waves-light"
                            to="#!"
                          >
                            Home
                          </NavLink>
                        </MDBNavItem> */}
                      </MDBNavbarNav>
                      <MDBNavbarNav right>
                        <React.Fragment>
                          <Link to={`/signup`} className="btn btn-sm btn-info">
                            Sign up{" "}
                            <span className="d-none d-md-inline">for Free</span>
                          </Link>
                          <NavLink
                            className="nav-link waves-effect waves-light"
                            to="/login"
                          >
                            Login
                          </NavLink>
                        </React.Fragment>
                      </MDBNavbarNav>
                    </MDBCollapse>
                  </MDBNavbar>
                )}
              </div>
            )}
          </AuthConsumer>
        </header>
      </React.Fragment>
    );
  }
}

export default withRouter(AppHeader);
