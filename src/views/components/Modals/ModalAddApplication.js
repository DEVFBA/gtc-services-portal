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
    Col,
    Row
} from "reactstrap";

var types = [
    { value: "Client", label: "Client"},
    { value: "Server", label: "Server"},
]

function ModalAddApplication({abierto, toggleModalAddRecord, dataSuites, updateAddData, ip, autoCloseAlert}) {
    const [aplicacion, setAplicacion] = React.useState("");
    const [version, setVersion] = React.useState("");
    const [suite, setSuite] = React.useState("");
    const [descripcionApp, setDescripcionApp] = React.useState("");
    const [descripcionTec, setDescripcionTec] = React.useState("");
    const [type, setType] = React.useState("");
    const [status, setStatus] = React.useState(true);

    const [aplicacionState, setaplicacionState] = React.useState("");
    const [versionState, setVersionState] = React.useState("");
    const [suiteState, setsuiteState] = React.useState("");
    const [descripcionappState, setdescripcionappState] = React.useState("");
    const [descripciontecState, setdescripciontecState] = React.useState("");
    const [typeState, settypeState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        //Regresamos todo a su estado inicial
        setAplicacion("");
        setVersion("");
        setSuite("");
        setDescripcionApp();
        setDescripcionTec(true);
        setType("")
        setaplicacionState("");
        setVersionState("");
        setsuiteState("");
        setdescripcionappState("");
        setdescripciontecState("");
        settypeState("");
        //Cerramos el modal
        toggleModalAddRecord(!abierto);
    };

   
    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };
    
    const isValidated = () => {
        if (
          aplicacionState === "has-success" &&
          versionState === "has-success" &&
          suiteState === "has-success" &&
          descripcionappState === "has-success" &&
          descripciontecState === "has-success" &&
          typeState === "has-success"
        ) {
          return true;
        } else {
          if (aplicacionState !== "has-success") {
            setaplicacionState("has-danger");
          }
          if (versionState !== "has-success") {
            setVersionState("has-danger");
          }
          if (suiteState !== "has-success") {
            setsuiteState("has-danger");
          }
          if (descripcionappState !== "has-success") {
            setdescripcionappState("has-danger");
          }
          if (descripciontecState !== "has-success") {
            setdescripciontecState("has-danger");
          }
          if (typeState !== "has-success") {
            settypeState("has-danger");
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


    function addRegister(){
        const catRegister = {
            pvOptionCRUD: "C",
            piIdSuite: suite.value,
            pvShortDesc: aplicacion,
            pvLongDesc: descripcionApp,
            pvVersion: version,
            pvTechnicalDescription: descripcionTec,
            pvType: type.value,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };
    
        fetch(`http://129.159.99.152/develop-api/api/cat-applications/create-application/`, {
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
                    autoCloseAlert(data[0].Code_Message_User)
                }
                else if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                    autoCloseAlert(data[0].Code_Message_User)
                }
                else{
                    setErrorState("has-success");
                    //Para actualizar la tabla en componente principal
                    updateAddData()
                    //Cerramos el modal
                    handleModalClick()
                    autoCloseAlert(data[0].Code_Message_User)
                }
            }
        });
    }

    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Añadir Módulo</h5>
            </div>
            <ModalBody>
                <Form id="RegisterValidation">
                    <Row className="justify-content-center">
                        <Col className="mt-3" lg="10">
                            <FormGroup className={`has-label ${aplicacionState}`}>
                                <label>Aplicación *</label>
                                <Input
                                    name="aplicacion"
                                    type="text"
                                    onChange={(e) => {
                                        if (!verifyLength(e.target.value, 1)) {
                                        setaplicacionState("has-danger");
                                        } else {
                                            setaplicacionState("has-success");
                                        }
                                        setAplicacion(e.target.value);
                                    }}
                                />
                                {aplicacionState === "has-danger" ? (
                                <label className="error">Este campo es requerido.</label>
                                ) : null}
                            </FormGroup>
                            <FormGroup className={`has-label ${versionState}`}>
                                <label>Versión *</label>
                                <Input
                                    name="version"
                                    type="text"
                                    onChange={(e) => {
                                        if (!verifyLength(e.target.value, 1)) {
                                        setVersionState("has-danger");
                                        } else {
                                            setVersionState("has-success");
                                        }
                                        setVersion(e.target.value);
                                    }}
                                />
                                {versionState === "has-danger" ? (
                                    <label className="error">Este campo es requerido.</label>
                                ) : null}
                            </FormGroup>
                            <FormGroup className={`has-label ${suiteState}`}>
                                <Label for="exampleSelect">Suite * </Label>
                                <Select
                                    name=""
                                    className="react-select"
                                    placeholder="Selecciona una suite"
                                    classNamePrefix="react-select"
                                    value={suite}
                                    onChange={(value) => {
                                        setSuite(value)
                                        setsuiteState("has-success");
                                    }}
                                    options={dataSuites}
                                />
                                {suiteState === "has-danger" ? (
                                    <label className="error">Selecciona una suite.</label>
                                ) : null}
                            </FormGroup>
                            <FormGroup className={`has-label ${descripcionappState}`}>
                                <label>Descripción de la aplicación *</label>
                                <Input
                                    name="descripcionApp"
                                    type="text"
                                    onChange={(e) => {
                                        if (!verifyLength(e.target.value, 1)) {
                                        setdescripcionappState("has-danger");
                                        } else {
                                            setdescripcionappState("has-success");
                                        }
                                        setDescripcionApp(e.target.value);
                                    }}
                                />
                                {descripcionappState === "has-danger" ? (
                                <label className="error">Este campo es requerido.</label>
                                ) : null}
                            </FormGroup>
                            <FormGroup className={`has-label ${descripciontecState}`} >
                                <label>Descripción tecnica de la aplicación *</label>
                                <Input
                                    name="descripcionTec"
                                    type="text"
                                    onChange={(e) => {
                                        if (!verifyLength(e.target.value, 1)) {
                                        setdescripciontecState("has-danger");
                                        } else {
                                            setdescripciontecState("has-success");
                                        }
                                        setDescripcionTec(e.target.value);
                                    }}
                                />
                                {descripciontecState === "has-danger" ? (
                                <label className="error">Este campo es requerido.</label>
                                ) : null}
                            </FormGroup>
                            <FormGroup className={`has-label ${typeState}`}>
                                <Label for="exampleSelect">Tipo de aplicación * </Label>
                                <Select
                                    name=""
                                    className="react-select"
                                    placeholder="Selecciona un tipo de aplicación"
                                    classNamePrefix="react-select"
                                    value={type}
                                    onChange={(value) => {
                                        setType(value)
                                        settypeState("has-success");
                                    }}
                                    options={types}
                                />
                                {typeState === "has-danger" ? (
                                    <label className="error">Selecciona un tipo de aplicación.</label>
                                ) : null}
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                <Input 
                                    type="checkbox" 
                                    checked = {status}
                                    onChange={(e) => {
                                        setStatus(e.target.checked)
                                    }}
                                />{' '}
                                Habilitado
                                <span className="form-check-sign">
                                    <span className="check"></span>
                                </span>
                                </Label>
                            </FormGroup>
                            <div className="category form-category">
                            * Campos requeridos
                            </div>
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
                    Cerrar
                </Button>
                <Button className="buttons" color="primary" onClick={registerClick}>
                   Guardar Cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddApplication;