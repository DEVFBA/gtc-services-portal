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

function ModalAddUser({modalAddRecord, setModalAddRecord, dataRoles, dataCustomers, updateAddData, validDays}) {
        // register form
    const [registerEmail, setregisterEmail] = React.useState("");
    const [registerFullName, setregisterFullName] = React.useState("");
    const [registerPassword, setregisterPassword] = React.useState("");
    const [registerRol, setregisterRol] = React.useState("");
    const [registerCustomer, setregisterCustomer] = React.useState();
    const [registerStatus, setregisterStatus] = useState(true);
    const [registerConfirmPassword, setregisterConfirmPassword] = React.useState("");

    const [registerEmailState, setregisterEmailState] = React.useState("");
    const [registerFullNameState, setregisterFullNameState] = React.useState("");
    const [registerPasswordState, setregisterPasswordState] = React.useState("");
    const [registerConfirmPasswordState, setregisterConfirmPasswordState] = React.useState("");
    const [registerRolState, setregisterRolState] = React.useState("");
    const [registerCustomerState, setregisterCustomerState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        //Regresamos todo a su estado inicial
        setregisterEmail("");
        setregisterFullName("");
        setregisterPassword("");
        setregisterRol("");
        setregisterCustomer();
        setregisterStatus(true);
        setregisterConfirmPassword("");
        setregisterEmailState("");
        setregisterFullNameState("");
        setregisterPasswordState("");
        setregisterConfirmPasswordState("");
        setregisterRolState("");
        setregisterCustomerState();
        setErrorState("")

        //Cerramos el modal
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
            registerCustomerState === "has-success" &&
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
          if (registerCustomerState !== "has-success") {
            setregisterCustomerState("has-danger");
          }
          return false;
        }
      };

    const registerClick = () => {
        
        if(isValidated()===true)
        {
           //haremos el fetch a la base de datos para agregar el registro
           addRegister()
        }
        else{
            console.log("no entre")
        }
    };

    /* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
    function sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    function addRegister(){

        var d = new Date();
        var finalDate = sumarDias(d, validDays);
        var date = finalDate.getDate();
        var month = finalDate.getMonth() + 1
        var year = finalDate.getFullYear()

        var finalDate2 = "" + year + "" + month + "" + date;
        
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            pvOptionCRUD: "C",
            piIdCustomer: registerCustomer.value,
            pvIdUser: registerEmail,
            pvIdRole: registerRol.value,
            pvPassword: registerPassword,
            pvName: registerFullName,
            pbTempPassword: true,
            pvFinalEffectiveDate: finalDate2,
            pbStatus: registerStatus,
            pvUser: user,
        };
    
        fetch(`http://129.159.99.152/develop-api/api/security-users/create-user/`, {
            method: "POST",
            body: JSON.stringify(catRegister),
            headers: {
                "access-token": token,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                setError(
                    <p>Hubo un error al realizar tu solicitud</p>
                );
            }
            else{
                if(data[0].Code_Type === "Warning")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                }
                else if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                }
                else{
                    setErrorState("has-success");
                    //Para actualizar la tabla en componente principal
                    updateAddData()
                    //Cerramos el modal
                    handleModalClick()
                }
            }
        });
    }

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
                    autoComplete="off"
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
                    autoComplete="off"
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
                        options={dataRoles}
                    />
                    {registerRolState === "has-danger" ? (
                        <label className="error">Selecciona un rol.</label>
                    ) : null}
                </FormGroup>
                <FormGroup className={`has-label ${registerRolState}`}>
                    <Label for="exampleSelect">Customer * </Label>
                    <Select
                        name=""
                        className="react-select"
                        placeholder="Selecciona un customer"
                        classNamePrefix="react-select"
                        value={registerCustomer}
                        onChange={(value) => {
                            setregisterCustomer(value)
                            setregisterCustomerState("has-success");
                        }}
                        options={dataCustomers}
                    />
                    {registerCustomerState === "has-danger" ? (
                        <label className="error">Selecciona un customer.</label>
                    ) : null}
                </FormGroup>
                <FormGroup check>
                    <Label check>
                    <Input 
                        type="checkbox" 
                        checked = {registerStatus}
                        onChange={(e) => {
                            setregisterStatus(e.target.checked)
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

            <FormGroup className={`has-label ${errorState}`}>
                {errorState === "has-danger" ? (
                        <label className="error">{errorMessage}</label>
                ) : null}
            </FormGroup>
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