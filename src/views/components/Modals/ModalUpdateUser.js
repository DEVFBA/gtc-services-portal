import React, { useState, useEffect } from "react";

//Importar módulo para encriptar contraseña
import { sha256, sha224 } from 'js-sha256';

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// core components
import UploadUserImage from "components/CustomUpload/UploadUserImage.js";

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
    Row,
    Col,
} from "reactstrap";

function ModalUpdateUser({abierto, toggleModalUpdateRecord, record, dataRoles, dataCustomers, updateAddData, validDays, pathImage}) {
        // register form
    const [updateEmail, setupdateEmail] = React.useState("");
    const [updateFullName, setupdateFullName] = React.useState("");
    const [updatePassword, setupdatePassword] = React.useState("");
    const [updateChangePassword, setupdateChangePassword] = useState(false);
    const [updateTemporal, setupdateTemporal] = useState(false);
    const [updateRol, setupdateRol] = React.useState({});
    const [updateCustomer, setupdateCustomer] = React.useState("");
    const [updateImage, setupdateImage] = React.useState("");
    const [updateStatus, setupdateStatus] = useState();
    const [updateConfirmPassword, setupdateConfirmPassword] = React.useState("");
    const [updateFinalEffectiveDate, setupdateFinalEffectiveDate] = useState();

    const [updateEmailState, setupdateEmailState] = React.useState("");
    const [updateFullNameState, setupdateFullNameState] = React.useState("");
    const [updatePasswordState, setupdatePasswordState] = React.useState("");
    const [updateConfirmPasswordState, setupdateConfirmPasswordState] = React.useState("");
    const [updateRolState, setupdateRolState] = React.useState("");
    const [updateCustomerState, setupdateCustomerState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
      toggleModalUpdateRecord(!abierto);
    };

    useEffect(() => {
        setupdateEmail(record.email);
        setupdateFullName(record.name)
        setupdateRol({
            value: record.idRole,
            label: record.rol
        })
        setupdateCustomer({
            value: record.idCustomer,
            label: record.customer
        })
        if(record.status === "Habilitado")
        {
            setupdateStatus(true);
        }
        else{
            setupdateStatus(false);
        }
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

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var fullname = document.getElementById("fullname").value

        if (!verifyLength(fullname, 1)) {
            setupdateFullNameState("has-danger");
        } else {
            setupdateFullNameState("has-success");
        }
        setupdateFullName(fullname);

        if(updateChangePassword === true)
        {
            var password = document.getElementById("password").value
            var passwordConfirmation = document.getElementById("passwordConfirmation").value
            if (!verifyLength(password, 1)) {
                setupdatePasswordState("has-danger");
            } else {
                setupdatePasswordState("has-success");
            }
            setupdatePassword(password);
    
            if (!verifyLength(passwordConfirmation, 1)) {
                setupdateConfirmPasswordState("has-danger");
            } else {
                setupdateConfirmPasswordState("has-success");
            }
            setupdateConfirmPassword(passwordConfirmation)
        }   
    }
    
    const isValidated = () => {

        verifyInputs()
        if (
            updateFullNameState !== "has-danger"
        ) {
          if(updateChangePassword === true)
          {
            if(
              updatePasswordState !== "has-danger" &&
              updateConfirmPasswordState !== "has-danger"
            )
            {
              return true;
            }
            else{
              return false;
            }
          }
          else{
            return true;
          }
        } else {
          return false;
        }
      };

    const updateClick = () => {
        if(isValidated()===true)
        {
            //haremos el fetch a la base de datos para actualizar el registro
            //El password deberá encriptarse en SHA256
            //console.log(sha256(registerPassword));
            updateRegister()
            //Cerramos el modal
            //handleModalClick()
        }
    };

    function updateRegister(){
        var finalDate2=""

        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        if(updateChangePassword === true)
        {
            var d = new Date();
            var finalDate = sumarDias(d, validDays);
            var date = finalDate.getDate();
            var month = finalDate.getMonth() + 1
            var year = finalDate.getFullYear()

            finalDate2 = "" + year + "" + month + "" + date;

            const catRegister = {
                pvOptionCRUD: "U",
                piIdCustomer: updateCustomer.value,
                pvIdUser: updateEmail,
                pvIdRole: updateRol.value,
                pvPassword: updatePassword,
                pbTempPassword: updateTemporal,
                pvProfilePicPath: updateImage,
                pvName: updateFullName,
                pbStatus: updateStatus,
                pvFinalEffectiveDate: finalDate2,
                pvUser: user,
                pathImage : pathImage
            };
        
            fetch(`http://localhost:9000/api/security-users/update-user/`, {
                method: "PUT",
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
        else{
            const catRegister = {
                pvOptionCRUD: "U",
                piIdCustomer: updateCustomer.value,
                pvIdUser: updateEmail,
                pvIdRole: updateRol.value,
                pvProfilePicPath: updateImage,
                pvName: updateFullName,
                pbStatus: updateStatus,
                pvFinalEffectiveDate: finalDate2,
                pvUser: user,
                pathImage : pathImage
            };
        
            fetch(`http://localhost:9000/api/security-users/update-user-wp/`, {
                method: "PUT",
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
    }

    /* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
    function sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Actualizar Usuario</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <label>Id Usuario / Email</label>
                            <Input
                                name="email"
                                type="email"
                                value = {updateEmail}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`has-label ${updateFullNameState}`}>
                            <label>Nombre Usuario *</label>
                            <Input
                            name="fullname"
                            id="fullname"
                            type="text"
                            value = {updateFullName}
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
                            Cambiar Password
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            </Label>
                            {updateChangePassword === true ? (
                            <>
                                <FormGroup className={`has-label ${updatePasswordState}`}>
                                <label>Password *</label>
                                <Input
                                    id="password"
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
                                <label>Confirmar Password *</label>
                                <Input
                                    equalto="#password"
                                    id="passwordConfirmation"
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
                                    checked = {updateTemporal}
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
                                    console.log(value)
                                    setupdateRol(value)
                                    setupdateRolState("has-success");
                                }}
                                options={dataRoles}
                            />
                            {updateRolState === "has-danger" ? (
                                <label className="error">Selecciona un rol.</label>
                            ) : null}
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                            <UploadUserImage registerImage = {updateImage} setregisterImage={setupdateImage}/>
                    </Col>
                    <Col sm="6">
                        <FormGroup className={`has-label ${updateCustomerState}`}>
                            <Label for="exampleSelect">Cliente * </Label>
                            <Select
                                name=""
                                className="react-select"
                                defaultValue = {updateCustomer}
                                classNamePrefix="react-select"
                                value={updateCustomer}
                                onChange={(value) => {
                                    setupdateCustomer(value)
                                    setupdateCustomerState("has-success");
                                }}
                                options={dataCustomers}
                            />
                            {updateCustomerState === "has-danger" ? (
                                <label className="error">Selecciona un cliente.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox"
                                checked = {updateStatus} 
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
                    </Col>
                    <Col className="mt-3" lg="10">
                        <div className="category form-category">
                        * Campos requeridos
                        </div>
                    </Col>  
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`has-label ${errorState}`}>
                            {errorState === "has-danger" ? (
                                <label className="error">
                                    {errorMessage}
                                </label>
                            ) : null}
                        </FormGroup>
                    </Col>    
                    {error}
                </Row>
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