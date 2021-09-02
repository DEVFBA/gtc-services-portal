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

function ModalUpdateUser({abierto, toggleModalUpdateRecord, record}) {
        // register form
    const [updateEmail, setupdateEmail] = React.useState("");
    const [updateFullName, setupdateFullName] = React.useState("");
    const [updatePassword, setupdatePassword] = React.useState("");
    const [updateChangePassword, setupdateChangePassword] = useState();
    const [updateTemporal, setupdateTemporal] = useState();
    const [updateRol, setupdateRol] = React.useState("");
    const [updateStatus, setupdateStatus] = useState(false);
    const [updateConfirmPassword, setupdateConfirmPassword] = React.useState("");

    const [updateEmailState, setupdateEmailState] = React.useState("");
    const [updateFullNameState, setupdateFullNameState] = React.useState("");
    const [updatePasswordState, setupdatePasswordState] = React.useState("");
    const [updateConfirmPasswordState, setupdateConfirmPasswordState] = React.useState("");
    const [updateRolState, setupdateRolState] = React.useState("");

    const handleModalClick = () => {
      toggleModalUpdateRecord(!abierto);
    };

    useEffect(() => {
        //se tienen que jalar los datos de la base de datos...
        setupdateFullName(record.name);
        setupdateRol(record.rol)
        console.log(record.rol)
    },[record]);


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
            updateFullNameState === "has-success" &&
            updateRolState === "has-success"
        ) {
          if(updateChangePassword === true)
          {
            if(
              updatePasswordState === "has-success" &&
              updateConfirmPasswordState === "has-success"
            )
            {
              return true;
            }
            else{
              if (updatePasswordState !== "has-success") {
                setupdatePasswordState("has-danger");
              }
              if (updateConfirmPasswordState !== "has-success") {
                setupdateConfirmPasswordState("has-danger");
              }
              return false;
            }
          }
          else{
            return true;
          }
        } else {
          if (updateFullNameState !== "has-success") {
            setupdateFullNameState("has-danger");
          }
          if (updateRolState !== "has-success") {
            setupdateRolState("has-danger");
          }
          return false;
        }
      };

    const updateClick = () => {
        if(isValidated()===true)
        {
            //haremos el fetch a la base de datos para actualizar el registro
            //El password deberá encriptarse en SHA256
            //console.log(sha256(registerPassword));

            //Para actualizar la tabla en componente principal
            setUpdateTable(updateTable+1)
            //Cerramos el modal
            handleModalClick()
        }
    };

    

    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Update User {record.name} </h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <FormGroup>
                <label>Id Usuario</label>
                <Input
                    name="email"
                    type="email"
                    placeholder = {updateEmail}
                    readOnly
                />
                </FormGroup>
                <FormGroup className={`has-label ${updateFullNameState}`}>
                    <label>Full Name *</label>
                    <Input
                    name="fullname"
                    type="text"
                    placeholder = {updateFullName}
                    onChange={(e) => {
                        if (!verifyLength(e.target.value, 1)) {
                        setupdateFullNameState("has-danger");
                        } else {
                        setupdateFullNameState("has-success");
                        }
                        setupdateFullName(e.target.value);
                    }}
                    />
                    {updateFullNameState === "has-danger" ? (
                    <label className="error">This field is required.</label>
                    ) : null}
                </FormGroup>
                <FormGroup check>
                    <Label check>
                    <Input 
                        type="checkbox" 
                        onChange={(e) => {
                            setupdateChangePassword(e.target.checked)
                        }}
                    />{' '}
                    Change Password
                    <span className="form-check-sign">
                        <span className="check"></span>
                    </span>
                    </Label>
                    {updateChangePassword === true ? (
                      <>
                        <FormGroup className={`has-label ${updatePasswordState}`}>
                          <label>Password *</label>
                          <Input
                              id="registerPassword"
                              name="password"
                              type="password"
                              autoComplete="off"
                              onChange={(e) => {
                              if (!verifyPassword(e.target.value)) {
                                  setupdatePasswordState("has-danger");
                              } else {
                                  setupdatePasswordState("has-success");
                              }
                              setupdatePassword(e.target.value);
                              }}
                          />
                          {updatePasswordState === "has-danger" ? (
                              <label className="error">La contraseña debe tener una longitud mínima de 10 caracteres, al menos un número, una letra mayúscula y minúscula, y un caracter especial.</label>
                          ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${updateConfirmPasswordState}`}>
                          <label>Confirm Password *</label>
                          <Input
                              equalto="#registerPassword"
                              id="registerPasswordConfirmation"
                              name="password_confirmation"
                              type="password"
                              autoComplete="off"
                              onChange={(e) => {
                              if (!compare(e.target.value, updatePassword)) {
                                  setupdateConfirmPasswordState("has-danger");
                                  //setregisterPasswordState("has-danger");
                              } else {
                                  setupdateConfirmPasswordState("has-success");
                                  //setregisterPasswordState("has-success");
                              }
                              setupdateConfirmPassword(e.target.value);
                              }}
                          />
                          {updateConfirmPasswordState === "has-danger" ? (
                              <label className="error">La contraseña no coincide.</label>
                          ) : null}
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                          <Input 
                              type="checkbox" 
                              onChange={(e) => {
                                  setupdateTemporal(e.target.checked)
                              }}
                          />{' '}
                          Password Temporal
                          <span className="form-check-sign">
                              <span className="check"></span>
                          </span>
                          </Label>
                        </FormGroup>
                      </>
                    ) : null}
                </FormGroup>
                <FormGroup className={`has-label ${updateRolState}`}>
                <Label for="exampleSelect">Rol * </Label>
                <Select
                    name=""
                    className="react-select"
                    defaultValue = {updateRol}
                    classNamePrefix="react-select"
                    value={updateRol}
                    onChange={(value) => {
                        setupdateRol(value)
                        setupdateRolState("has-success");
                    }}
                    options={[
                        { value: "Administrador", label: " Administrador "},
                        { value: "Soporte", label: " Soporte " },
                        { value: "Cliente", label: " Cliente " },
                        { value: "Servicio", label: " Servicio " }
                    ]}
                />
                {updateRolState === "has-danger" ? (
                    <label className="error">Selecciona un rol.</label>
                ) : null}
                </FormGroup>
                <FormGroup check>
                    <Label check>
                    <Input 
                        type="checkbox" 
                        onChange={(e) => {
                            setupdateStatus(e.target.checked)
                        }}
                    />{' '}
                    Habilitado
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
                <Button className="buttons" color="primary" onClick={updateClick}>
                    Save changes
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalUpdateUser;