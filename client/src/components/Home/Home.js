import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";
import SimpleSlider from "./slider";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <MDBContainer className="text-center mt-5 pt-5">
          <MDBRow>
            <MDBCol
              md="6"
              className="d-flex justify-content-center offset-md-1 mb-3"
            >
              <SimpleSlider />
            </MDBCol>
            <MDBCol
              md="4"
              className="d-flex justify-content-center offset-md-1 mb-3"
            >
              <MDBCard style={{ width: "22rem" }}>
                <MDBCardBody>
                  <MDBCardTitle>For Demo</MDBCardTitle>
                  <MDBCardText>
                    <pre>
                      username: dhiraj@koirala.com <br/>
                      password :dhiraj@koirala
                    </pre>
                  </MDBCardText>
                  <MDBBtn href="/login">login</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" className="mt-3">
              <div class="row d-flex ">
                <div className="col-sm">
                  <img
                    src="http://api.ning.com/files/B39IGTQRALkhSMbjQQUo-aOefuwwLsGrNGfMB4h0aLNN-4OtY*eoFHwL-5VtNnoSdtVpY84xJaeV2nWfR2RHl5G786-q4ve0/TCNewHat192.png"
                    className="rounded-circle"
                    height="150px"
                    alt="HelPic"
                  ></img>
                  <br />
                  <h3>Accounts</h3>
                  <p>
                    This application record the transaction on various accounts
                    respectively on the basis of double entry book keeping
                    system. Each account changing balance can been seen in
                    graphical form.
                  </p>
                </div>
                <div class="col-sm">
                  {" "}
                  <img
                    src="http://api.ning.com/files/B39IGTQRALliaKqgChk9araXv05mYhYO7kWdDqeWlNA8ZPNiORJDteP-hn0A5GNuu35tmgz8M9C*npG3LdsoLiL7yW2TYhzf/Business.png"
                    className="rounded-circle"
                    alt="HelPic"
                    height="150px"
                  ></img>
                  <br />
                  <h3>Small Business </h3>
                  <p>
                    This application is espically suitable for small business
                    form or individual records.
                  </p>
                </div>
                <div class="col-sm">
                  {" "}
                  <img
                    src="http://api.ning.com/files/B39IGTQRALlkWU-8Z5ruh-ZVwv-mTT3aVWHwdTYX84IUgnAbPHwZYFYCLkdA0o4zrimjBPgKTtzS1NP*KSWHAMbf59MCH-rp/TurboCASHCloud2.png"
                    className="rounded-circle"
                    alt="HelPic"
                    height="150px"
                  ></img>
                  <br />
                  <h3>Reports</h3>
                  <p>
                    User can achieve their business financial report and
                    business status. Profit and Loss account provides operation
                    position and Balance sheet porvide business status.
                  </p>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default Home;
