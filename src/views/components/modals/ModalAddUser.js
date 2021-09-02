import React, { useState, useEffect } from "react";

//Importar módulo para encriptar contraseña
import { sha256, sha224 } from 'js-sha256';

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

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

function ModalAddUser({modalAddRecord, setModalAddRecord, updateTable, setUpdateTable}) {
        // register form
    const [registerEmail, setregisterEmail] = React.useState("");
    const [registerFullName, setregisterFullName] = React.useState("");
    const [registerPassword, setregisterPassword] = React.useState("");
    const [registerRol, setregisterRol] = React.useState("");
    const [registerStatus, setregisterStatus] = useState(false);
    const [registerConfirmPassword, setregisterConfirmPassword] = React.useState("");

    const [registerEmailState, setregisterEmailState] = React.useState("");
    const [registerFullNameState, setregisterFullNameState] = React.useState("");
    const [registerPasswordState, setregisterPasswordState] = React.useState("");
    const [registerConfirmPasswordState, setregisterConfirmPasswordState] = React.useState("");
    const [registerRolState, setregisterRolState] = React.useState("");

    const handleModalClick = () => {
        setModalAddRecord(!modalAddRecord);
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

    const verifyPassword = (value) => {
        var passwordRex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,50}$/;
        if (passwordRex.test(value)) {
        return true;
        }
        return false;
    };
    
    const isValidated = () => {
        if (
            registerEmailState === "has-success" &&
            registerFullNameState === "has-success" &&
            registerPasswordState === "has-success" &&
            registerRolState === "has-success" &&
            registerConfirmPasswordState === "has-success"
        ) {
          return true;
        } else {
          if (registerEmailState !== "has-success") {
            setregisterEmailState("has-danger");
          }
          if (registerFullNameState !== "has-success") {
            setregisterFullNameState("has-danger");
          }
          if (registerPasswordState !== "has-success") {
            setregisterPasswordState("has-danger");
          }
          if (registerConfirmPasswordState !== "has-success") {
            setregisterConfirmPasswordState("has-danger");
          }
          if (registerRolState !== "has-success") {
            setregisterRolState("has-danger");
          }
          return false;
        }
      };

    const registerClick = () => {
        if(isValidated()===true)
        {
            //haremos el fetch a la base de datos para agregar el registro
            //El password deberá encriptarse en SHA256
            //console.log(sha256(registerPassword));

            //Para actualizar la tabla en componente principal
            setUpdateTable(updateTable+1)
            //Cerramos el modal
            handleModalClick()
        }
        else{
            console.log("no entre")
        }
    };

    

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Add new record</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <FormGroup className={`has-label ${registerEmailState}`}>
                <label>Email Address *</label>
                <Input
                    name="email"
                    type="email"
                    onChange={(e) => {
                    if (!verifyEmail(e.target.value)) {
                        setregisterEmailState("has-danger");
                    } else {
                        setregisterEmailState("has-success");
                    }
                    setregisterEmail(e.target.value);
                    }}
                />
                {registerEmailState === "has-danger" ? (
                    <label className="error">
                    Please enter a valid email address.
                    </label>
                ) : null}
                </FormGroup>
                <FormGroup className={`has-label ${registerFullNameState}`}>
                    <label>Full Name *</label>
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
                <label>Password *</label>
                <Input
                    id="registerPassword"
                    name="password"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => {
                    if (!verifyPassword(e.target.value)) {
                        setregisterPasswordState("has-danger");
                    } else {
                        setregisterPasswordState("has-success");
                    }
                    setregisterPassword(e.target.value);
                    }}
                />
                {registerPasswordState === "has-danger" ? (
                    <label className="error">La contraseña debe tener una longitud mínima de 10 caracteres, al menos un número, una letra mayúscula y minúscula, y un caracter especial.</label>
                ) : null}
                </FormGroup>
                <FormGroup className={`has-label ${registerConfirmPasswordState}`}>
                    <label>Confirm Password *</label>
                    <Input
                        equalto="#registerPassword"
                        id="registerPasswordConfirmation"
                        name="password_confirmation"
                        type="password"
                        autoComplete="off"
                        onChange={(e) => {
                        if (!compare(e.target.value, registerPassword)) {
                            setregisterConfirmPasswordState("has-danger");
                            //setregisterPasswordState("has-danger");
                        } else {
                            setregisterConfirmPasswordState("has-success");
                            //setregisterPasswordState("has-success");
                        }
                        setregisterConfirmPassword(e.target.value);
                        }}
                    />
                {registerConfirmPasswordState === "has-danger" ? (
                    <label className="error">La contraseña no coincide.</label>
                ) : null}
                </FormGroup>
                <FormGroup className={`has-label ${registerRolState}`}>
                <Label for="exampleSelect">Rol * </Label>
                <Select
                    name=""
                    className="react-select"
                    placeholder="Selecciona un rol"
                    classNamePrefix="react-select"
                    value={registerRol}
                    onChange={(value) => {
                        setregisterRol(value)
                        setregisterRolState("has-success");
                    }}
                    options={[
                        { value: "Administrador", label: " Administrador "},
                        { value: "Soporte", label: " Soporte " },
                        { value: "Cliente", label: " Cliente " },
                        { value: "Servicio", label: " Servicio " }
                    ]}
                />
                {registerRolState === "has-danger" ? (
                    <label className="error">Selecciona un rol.</label>
                ) : null}
                </FormGroup>
                <FormGroup check>
                    <Label check>
                    <Input 
                        type="checkbox" 
                        onChange={(e) => {
                            setregisterStatus(e.target.checked)
                            console.log(registerStatus)
                        }}
                    />{' '}
                    Habilitado *
                    <span className="form-check-sign">
                        <span className="check"></span>
                    </span>
                    </Label>
                </FormGroup>
                <div className="category form-category">
                * Required fields
                </div>
            </Form>
            </ModalBody>
            <ModalFooter>
                <div className="center-side">
                <Button className="buttons" color="secondary" onClick={handleModalClick}>
                    Close
                </Button>
                <Button className="buttons" color="primary" onClick={registerClick}>
                    Save changes
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddUser;