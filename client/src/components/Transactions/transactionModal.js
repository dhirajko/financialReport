import React, { Component } from "react";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import moment from "moment";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField, FormikSelectField } from "formik-material-fields";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";

const validationSchema = Yup.object().shape({
  date: Yup.date().required(),
  debitAccount: Yup.string().required(),
  creditAccount: Yup.string().required(),
  amount: Yup.number()
    .min(0)
    .required(),
  descreption: Yup.string().required()
});

class Modal extends Component {
  state = {
    modal: false,
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
      modal: !this.state.modal
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

  createOptions = () => {
    let inital = [{ label: "select credit account", value: "" }];
    this.props.accounts.map(account => {
      inital.push({
        label: account.accountName.toUpperCase(),
        value: account._id
      });
    });
    return inital;
  };

  render() {
    return (
      <MDBContainer>
        <button onClick={this.toggle} className="btn-circle-lg">
          {" "}
          +
        </button>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader
            toggle={this.toggle}
            onClick={() => {
              console.log(this.state);
            }}
          >
            {" "}
            Create Transaction
          </MDBModalHeader>
          <MDBModalBody>
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
                    label="Debit Account"
                    margin="normal"
                    options={this.createOptions()}
                    onChange={this.handleCurrentChange}
                    onClick={e => {
                      if (e.target.value === "") {
                        alert("ok");
                      }
                    }}
                    fullWidth
                    native
                  />
                  <FormikSelectField
                    name="creditAccount"
                    label="Credit Account"
                    margin="normal"
                    onChange={this.handleCurrentChange}
                    onClick={e => {
                      if (e.target.value === "") {
                        alert("ok");
                      }
                    }}
                    options={this.createOptions()}
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
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>
                      Close
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      onClick={() => {
                        this.props.createTransaction(this.state.data);
                        this.toggle();
                      }}
                      disabled={
                        this.state.data.date === "" ||
                        this.state.data.descreption === "" ||
                        this.state.data.amount === 0 ||
                        this.state.data.debitAccount === "" ||
                        this.state.data.creditAccount === "" ||
                        this.state.data.debitAccount ===
                          this.state.data.creditAccount
                          ? true
                          : false
                      }
                    >
                      Save changes
                    </MDBBtn>
                  </MDBModalFooter>
                </Form>
              )}
            </Formik>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default Modal;
