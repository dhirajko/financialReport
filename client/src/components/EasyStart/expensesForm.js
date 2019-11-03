import React, { Component } from "react";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import moment from "moment";
import {
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBModalFooter,
  MDBModal,
  MDBModalBody,
  MDBModalHeader
} from "mdbreact";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField, FormikSelectField } from "formik-material-fields";
import { expenses, currentAssets } from "../../constants/Tags";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";

const validationSchema = Yup.object().shape({
  date: Yup.date().required(),
  debitAccount: Yup.string().required("*"),
  creditAccount: Yup.string().required("*"),
  amount: Yup.number()
    .min(0)
    .required("*"),
  descreption: Yup.string().required("*")
});

class Expenses extends Component {
  state = {
    selectOption: e => this.createAccountListOption(e),
    modal: false,
    createAccountName: "",
    creatAccountAlias: "",
    createAccounttag: "",
    createAccountInventoryAffect: "",
    data: {
      date: new Date(),
      debitAccount: "",
      creditAccount: "",
      amount: 0,
      descreption: ""
    }
  };

  toggle = () => {
    this.setState({
      createAccountName: "",
      creatAccountAlias: "",
      createAccounttag: "",
      modal: !this.state.modal
    });
  };

  handleNormalStateChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };
  handleRadioChange = e => {
    this.setState({
      data: { ...this.state.data, inventoryAffects: e }
    });
  };

  handleCurrentChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.currentTarget.value }
    });
  };

  createExpenses = () => {
    let inital = [
      { label: "", value: "" },
      { label: "CREATE EXPENSES", value: "*" }
    ];

    this.props.accounts.map(account => {
      if (expenses.includes(account.tag)) {
        inital.push({
          label: account.accountName.toUpperCase(),
          value: account._id
        });
      }
    });
    return inital;
  };

  createCurrentAssets = () => {
    let inital = [
      { label: "", value: "" },
      { label: "CREATE CURRENT ASSETS", value: "*" }
    ];
    this.props.accounts.map(account => {
      if (currentAssets.includes(account.tag)) {
        inital.push({
          label: account.accountName.toUpperCase(),
          value: account._id
        });
      }
    });
    return inital;
  };

  createAccountListOption = array => {
    return (
      <>
        <label className="m-1">Tag :</label>
        <select
          className="form-control w-75"
          onChange={e => {
            this.setState({ createAccounttag: e.target.value });
          }}
          onClick={e => {
            this.setState({ createAccounttag: e.target.value });
          }}
        >
          <option value=""></option>
          {array.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </>
    );
  };

  render() {
    return (
      <MDBContainer>
        <Formik
          initialValues={this.state}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values));
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validationSchema}
        >
          {({ isValid }) => (
            <Form autoComplete="off">
              <DatePickerInput
                onChange={date => {
                  this.setState({
                    data: {
                      ...this.state.data,
                      date: moment(date).format("YYYY-MM-DD")
                    }
                  });
                }}
                maxDate={new Date()}
                minDate={moment("01-01-2017")}
                value={moment(this.state.data.date)}
                className="my-custom-datepicker-component"
                //
              />

              <FormikSelectField
                name="debitAccount"
                label="Expenses heading : "
                margin="normal"
                options={this.createExpenses()}
                onChange={this.handleCurrentChange}
                onClick={e => {
                  if (e.target.value === "*") {
                    this.setState({
                      selectOption: this.createAccountListOption(expenses),
                      modal: true
                    });
                  }
                }}
                fullWidth
                native
              />
              <FormikSelectField
                name="creditAccount"
                label="Paid By : "
                margin="normal"
                onChange={this.handleCurrentChange}
                onClick={e => {
                  if (e.target.value === "*") {
                    this.setState({
                      selectOption: this.createAccountListOption(currentAssets),
                      modal: true
                    });
                  }
                }}
                options={this.createCurrentAssets()}
                fullWidth
                native
              />
              <FormikTextField
                name="amount"
                label="amount"
                margin="normal"
                type="number"
                onChange={e => this.handleChange(e)}
                fullWidth
              />
              <FormikTextField
                name="descreption"
                label="Descreption"
                margin="normal"
                onChange={e => this.handleChange(e)}
                fullWidth
              />
              <MDBRow center className="w-100">
                <MDBBtn
                  color="primary"
                  onClick={() => this.props.createTransaction(this.state.data)}
                  disabled={
                    this.state.data.date === "" ||
                    this.state.data.descreption === "" ||
                    this.state.data.amount === 0 ||
                    this.state.data.debitAccount === "" ||
                    this.state.data.debitAccount === "*" ||
                    this.state.data.creditAccount === "" ||
                    this.state.data.creditAccount === "*" ||
                    this.state.data.debitAccount ===
                      this.state.data.creditAccount
                      ? true
                      : false
                  }
                >
                  Save changes
                </MDBBtn>
              </MDBRow>
            </Form>
          )}
        </Formik>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Create Account</MDBModalHeader>
          <MDBModalBody>
            <label>Account Name</label>
            <input
              name="createAccountName"
              type="text"
              className="form-control"
              onChange={this.handleNormalStateChange}
            />
            <label>alias</label>
            <input
              name="creatAccountAlias"
              type="text"
              className="form-control"
              onChange={this.handleNormalStateChange}
            />
            <label>inventory Affected?</label>
            <select
              className="form-control"
              onchange={e => {
                console.log(e.target);
              }}
              onClick={e => {
                this.setState({ createAccountInventoryAffect: e.target.value });
              }}
            >
              <option disabled selected></option>
              <option name="" value="true">
                TRUE
              </option>
              <option value="false">FALSE</option>
            </select>

            {this.state.selectOption}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>
              Close
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={() => {
                this.props.createAccount({
                  accountName: this.state.createAccountName,
                  tag: this.state.createAccounttag,
                  alias: this.state.creatAccountAlias,
                  inventoryAffects: this.state.createAccountInventoryAffect
                });
                this.props.updateList();
                this.toggle();
              }}
              disabled={
                this.state.creatAccountAlias === "" ||
                this.state.createAccounttag === "" ||
                this.state.createAccountName === "" ||
                this.state.createAccountInventoryAffect === ""
                  ? true
                  : false
              }
            >
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default Expenses;
