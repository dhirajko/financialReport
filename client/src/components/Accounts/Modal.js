import React, { Component } from "react";
import history from "../../utils/history";
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
import {
  FormikTextField,
  FormikSelectField,
  FormikRadioGroupField
} from "formik-material-fields";
import {list}from "../../constants/Tags"
import "../../App.css";

const validationSchema = Yup.object().shape({
  accountName: Yup.string().required(),
  tag: Yup.string().required(),
  alias: Yup.string(),
  inventoryAffects: Yup.string().required(),
  descreption: Yup.string()
});

class Modal extends Component {
  state = {
    modal: false,
    data: {
      accountName: "",
      tag: "",
      alias: "",
      inventoryAffects: "",
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

  createOptions = type => {
    let inital = [{ label: "SELECT ACCOUNT TYPE", value: "" }];
    type.map(account => {
      inital.push({
        label: account.toUpperCase(),
        value: account
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
          <MDBModalHeader toggle={this.toggle}>Create account</MDBModalHeader>
          <MDBModalBody>
            <Formik validationSchema={validationSchema}>
              {({ isValid }) => (
                <Form autoComplete="off">
                  <FormikTextField
                    name="accountName"
                    label="Account name"
                    margin="normal"
                    onChange={e => this.handleChange(e)}
                    fullWidth
                  />
                  <FormikTextField
                    name="alias"
                    label="Alias"
                    margin="normal"
                    onChange={e => this.handleChange(e)}
                    fullWidth
                  />

                  <FormikSelectField
                    name="tag"
                    label="Tag"
                    margin="normal"
                    onChange={e => this.handleCurrentChange(e)}
                    options={this.createOptions(list)}
                    onClick={e => {
                      if (e.target.value === "") {
                        alert("ok");
                      }
                    }}
                    fullWidth
                    native
                  />
                  <FormikRadioGroupField
                    name="inventoryAffects"
                    label="Inventory Affected"
                    margin="normal"
                    onChange={e => this.handleRadioChange(e)}
                    options={[
                      { label: "No", value: "false" },
                      { label: "Yes", value: "true" }
                    ]}
                    row="all"
                  />
                  <FormikTextField
                    name="descreption"
                    label="Descreption"
                    margin="normal"
                    onChange={e => this.handleChange(e)}
                    fullWidth
                  />
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={(this.toggle)}>
                      Close
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      onClick={() => {
                        this.props.createAccount(this.state.data);
                        history.push("/account");
                      }}
                      disabled={
                        this.state.data.accountName === "" ||
                        this.state.data.tag === "" ||
                        this.state.data.alias === "" ||
                        this.state.data.inventoryAffects === "" ||
                        this.state.data.descreption === ""
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
