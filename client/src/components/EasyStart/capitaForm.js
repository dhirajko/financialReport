import React, { Component } from "react";
import { MDBContainer, MDBBtn } from "mdbreact";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField, FormikRadioGroupField } from "formik-material-fields";
import { API_URL, JWT_TOKEN } from "../../constants/appConfig";
import { getLocalStorage } from "../../utils/storageUtil";
import axios from "axios";
import Toast from "../Common/Toast/Toast";
import "../../App.css";

const validationSchema = Yup.object().shape({
  accountName: Yup.string().required(),
  amount: Yup.number()
    .min(0)
    .required()
});

class CapitalForm extends Component {
  state = {
    debitTag: "",
    creditTag: "",
    debitAccountName: "",
    creditAccountName: "",
    amount: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <MDBContainer>
        <Formik validationSchema={validationSchema}>
          {({ isValid }) => (
            <Form autoComplete="off">
              <FormikRadioGroupField
                name="debit"
                label="Introduce : "
                margin="normal"
                onChange={e => {
                  if (e === "cash") {
                    this.setState({
                      debitTag: "cash in hand",
                      debitAccountName: "Cash"
                    });
                  } else if (e === "bank account") {
                    this.setState({
                      debitTag: "bank account"
                    });
                  }
                }}
                options={[
                  { label: "cash", value: "cash" },
                  { label: "Bank Balance", value: "bank account" }
                ]}
                row
                fullWidth
              />
              {this.state.debitTag === "bank account" ? (
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Bank Name"
                  onChange={e => {
                    this.setState({
                      debitAccountName: e.target.value
                    });
                  }}
                />
              ) : (
                ""
              )}
              <FormikRadioGroupField
                name="source"
                label="SOURCE"
                margin="normal"
                options={[
                  { label: "Capital", value: "capital account" },
                  { label: "Loan", value: "loan (liability)" }
                ]}
                onChange={e => {
                  if (e === "capital account") {
                    this.setState({
                      creditTag: "capital account",
                      creditAccountName: "Capital"
                    });
                  } else if (e === "loan (liability)") {
                    this.setState({
                      creditTag: "loan (liability)",
                      creditAccountName: "Loan"
                    });
                  }
                }}
                row
                fullWidth
              />

              <FormikTextField
                name="amount"
                label="amount"
                margin="normal"
                type="number"
                onChange={e => this.handleChange(e)}
                fullWidth
              />

              <MDBBtn
                color="primary"
                disabled={
                  this.state.debitAccountName === "" ||
                  this.state.amount <= 0 ||
                  this.state.creditAccountName === "" ||
                  this.state.debitTag === "" ||
                  this.state.creditTag === ""
                    ? true
                    : false
                }
                onClick={() => {
                  axios
                    .post(
                      API_URL + "api/transactions/directTransaction",
                      {
                        amount: this.state.amount,
                        creditAccountName: this.state.creditAccountName,
                        creditTag: this.state.creditTag,
                        debitAccountName: this.state.debitAccountName,
                        debitTag: this.state.debitTag,
                        debitInventoryAffects: false,
                        creditInventoryAffects: false,
                        descreption: `Introducing ${this.state.debitAccountName} as ${this.state.creditAccountName}`
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          "x-auth-token": getLocalStorage(JWT_TOKEN)
                        }
                      }
                    )
                    .then(res => {
                      Toast("success", "Add Balance Success");
                      setTimeout(() => {
                        window.location.reload(true);
                      }, 500);
                    });
                }}
              >
                Save changes
              </MDBBtn>
            </Form>
          )}
        </Formik>
      </MDBContainer>
    );
  }
}

export default CapitalForm;
