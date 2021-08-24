import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Button,
    Modal, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Form,
    Input,
    Label,
} from "reactstrap";

function ModalUpdateUser({abierto, toggleModalUpdateRecord}) {
        // register form
    const [registerEmail, setregisterEmail] = React.useState("");
    const [registerFullName, setregisterFullName] = React.useState("");
    const [registerPassword, setregisterPassword] = React.useState("");
    const [registerRol, setregisterRol] = React.useState("");
    const [registerConfirmPassword, setregisterConfirmPassword] = React.useState(
        ""
    );
    const [registerEmailState, setregisterEmailState] = React.useState("");
    const [registerFullNameState, setregisterFullNameState] = React.useState("");
    const [registerPasswordState, setregisterPasswordState] = React.useState("");
    const [
        registerConfirmPasswordState,
        setregisterConfirmPasswordState,
    ] = React.useState("");

    const handleModalClick = () => {
        toggleModalUpdateRecord(!abierto);
    };

        // function that returns true if value is email, false otherwise
    const verifyEmail = (value) => {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value)) {
        return true;
        }
        return false;
    };
    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };
    // function that verifies if two strings are equal
    const compare = (string1, string2) => {
        if (string1 === string2) {
        return true;
        }
        return false;
    };
    // function that verifies if value contains only numbers
    const verifyNumber = (value) => {
        var numberRex = new RegExp("^[0-9]+$");
        if (numberRex.test(value)) {
        return true;
        }
        return false;
    };
    // verifies if value is a valid URL
    const verifyUrl = (value) => {
        try {
        new URL(value);
        return true;
        } catch (_) {
        return false;
        }
    };

    const registerClick = () => {
        //Función para agregar registro
        if (registerEmailState === "") {
        setregisterEmailState("has-danger");
        }
        if (registerFullNameState === "") {
        setregisterFullNameState("has-danger");
        }
        if (registerPasswordState === "" || registerConfirmPasswordState === "") {
        setregisterPasswordState("has-danger");
        setregisterConfirmPasswordState("has-danger");
        }
    };

    const updateClick = () => {
        //Función para editar registro
        if (registerEmailState === "") {
        setregisterEmailState("has-danger");
        }
        if (registerFullNameState === "") {
        setregisterFullNameState("has-danger");
        }
        if (registerPasswordState === "" || registerConfirmPasswordState === "") {
        setregisterPasswordState("has-danger");
        setregisterConfirmPasswordState("has-danger");
        }
    };

    const loginClick = () => {
        if (loginFullNameState === "") {
        setloginFullNameState("has-danger");
        }
        if (loginEmailState === "") {
        setloginEmailState("has-danger");
        }
        if (loginPasswordState === "") {
        setloginPasswordState("has-danger");
        }
    };

    const typeClick = () => {
        if (requiredState === "") {
        setrequiredState("has-danger");
        }
        if (emailState === "") {
        setemailState("has-danger");
        }
        if (numberState === "") {
        setnumberState("has-danger");
        }
        if (urlState === "") {
        seturlState("has-danger");
        }
        if (sourceState === "" || destinationState === "") {
        setsourceState("has-danger");
        setdestinationState("has-danger");
        }
    };

    const rangeClick = () => {
        if (minLengthState === "") {
        setminLengthState("has-danger");
        }
        if (maxLengthState === "") {
        setmaxLengthState("has-danger");
        }
        if (rangeState === "") {
        setrangeState("has-danger");
        }
        if (minState === "") {
        setminState("has-danger");
        }
        if (maxState === "") {
        setmaxState("has-danger");
        }
    };


    
    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Edit Record</h5>
        </div>
        <ModalBody>
        <Form id="RegisterValidation">
            <FormGroup className={`has-label ${registerEmailState}`}>
              <label>Id</label>
              <Input
                name="id"
                type="text"
                valuee="Hola" 
                readOnly
              />
            </FormGroup>
            <FormGroup className={`has-label ${registerFullNameState}`}>
                <label>Descripción corta *</label>
                <Input
                  name="fullname"
                  type="text"
                  onChange={(e) => {
                    if (!verifyLength(e.target.value, 1)) {
                      setregisterFullNameState("has-danger");
                    } else {
                      setregisterFullNameState("has-success");
                    }
                    setregisterFullName(e.target.value);
                  }}
                />
                {registerFullNameState === "has-danger" ? (
                  <label className="error">This field is required.</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${registerPasswordState}`}>
              <label>Descripción larga *</label>
              <Input
                id="registerPassword"
                name="password"
                type="password"
                autoComplete="off"
                onChange={(e) => {
                  if (!verifyLength(e.target.value, 1)) {
                    setregisterPasswordState("has-danger");
                  } else {
                    setregisterPasswordState("has-success");
                  }
                  setregisterPassword(e.target.value);
                }}
              />
              {registerPasswordState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </FormGroup>
            <FormGroup check>
              <Input type="checkbox" name="check" id="exampleCheck" checked/>
              <Label for="exampleCheck" check>Habilitado *</Label>
            </FormGroup>
            <div className="category form-category">
              * Required fields
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="center-side">
            <Button color="secondary" onClick={handleModalClick}>
                Close
            </Button>
            <Button color="primary">
                Save changes
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
}

export default ModalUpdateUser;