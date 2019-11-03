import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Alert } from "react-bootstrap";
import { MDBContainer, MDBBtn } from "mdbreact";
import { AuthConsumer, withContext } from "./../Layout/Header/AuthContext";
import { isEmpty } from "../../utils/commonUtil";

class LoginPage extends Component {
  state = {
    errorMessage: ""
  };

  render() {
    const errorMessage = this.state.errorMessage;
    return (
      <AuthConsumer>
        {({ loginError }) => (
          <MDBContainer className="mt-5 pt-5 d-flex justify-content-center align-items-center">
            <div className="col-6">
              <h3 className="text-center mb-5">Sign In</h3>

              <Formik
                initialValues={{ email: "", password: "" }}
                validate={values => {
                  let errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (!values.password) {
                    errors.password = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={values => {
                  this.props
                    .login(values)
                    .then(response => {
                      this.props.history.push("/dashboard");
                    })
                    .catch(error => {
                      console.log(error);

                      this.setState({ errorMessage: error });
                    });
                }}
              >
                {({ isSubmitting }) => (
                  <div>
                    <Form>
                      {!isEmpty(errorMessage) && (
                        <Alert variant="danger">
                          {errorMessage && (
                            <div className="text-center ">
                              <h5>Login Failed. Please Try Again</h5>
                            </div>
                          )}
                        </Alert>
                      )}
                      <div className="md-form form-group">
                        <i data-test="fa" className="fa fa-envelope prefix"></i>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Type your email"
                          id="email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ fontSize: "12px", color: "red" }}
                        />
                      </div>
                      <div className="md-form form-group">
                        <i data-test="fa" className="fa fa-lock prefix"></i>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Type your password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{ fontSize: "12px", color: "red" }}
                        />
                        <MDBBtn type="submit">Login</MDBBtn>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </MDBContainer>
        )}
      </AuthConsumer>
    );
  }
}

export default withContext(LoginPage);
