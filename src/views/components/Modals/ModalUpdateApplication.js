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

function ModalUpdateApplication({abierto, toggleModalUpdateRecord, dataSuites, updateAddData, record, ip}) {
    const [idAplicacion, setIdAplicacion] = React.useState("");
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
        setaplicacionState("");
        setVersionState("");
        setsuiteState("");
        setdescripcionappState("");
        setdescripciontecState("");
        settypeState("");
        setError("")
        setErrorState("")
        setErrorMessage("")
        //Cerramos el modal
        toggleModalUpdateRecord(!abierto);
    };

    useEffect(() => {
        setIdAplicacion(record.idAplicacion);
        setAplicacion(record.appName);
        setVersion(record.version);
        setSuite({
            value: record.suiteId,
            label: record.suite
        })
        setDescripcionApp(record.longDescription);
        setDescripcionTec(record.technicalDescription);
        setType({
            value: record.type,
            label: record.type
        });
        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else{
            setStatus(false);
        }
    },[record]);

   
    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var aplicacion = document.getElementById("aplicacion").value
        var version = document.getElementById("version").value
        var descripcionApp = document.getElementById("descripcionApp").value
        var descripcionTec = document.getElementById("descripcionTec").value

        if (!verifyLength(aplicacion, 1)) {
            setaplicacionState("has-danger");
        } else {
            setaplicacionState("has-success");
        }
        setAplicacion(aplicacion);

        if (!verifyLength(version, 1)) {
            setVersionState("has-danger");
        } else {
            setVersionState("has-success");
        }
        setVersion(version);

        if (!verifyLength(descripcionApp, 1)) {
            setdescripcionappState("has-danger");
        } else {
            setdescripcionappState("has-success");
        }
        setDescripcionApp(descripcionApp);

        if (!verifyLength(descripcionTec, 1)) {
            setdescripciontecState("has-danger");
        } else {
            setdescripciontecState("has-success");
        }
        setDescripcionTec(descripcionTec);
    }
    
    const isValidated = () => {
        verifyInputs();
        if (
          aplicacionState !== "has-danger" &&
          versionState !== "has-danger" &&
          suiteState !== "has-danger" &&
          descripcionappState !== "has-danger" &&
          descripciontecState !== "has-danger" &&
          typeState !== "has-danger" 
        ) {
          return true;
        } else {
          return false;
        }
    };

    const registerClick = () => {
        
        if(isValidated()===true)
        {
           //haremos el fetch a la base de datos para agregar el registro
           updateRegister()
        }
        else{
            console.log("no entre")
        }
    };


    function updateRegister(){
        const catRegister = {
            pvOptionCRUD: "U",
            piIdApplication: idAplicacion,
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
    
        fetch(`http://129.159.99.152/develop-api/api/cat-applications/update-application/`, {
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

    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Actualizar Aplicación o Servicio</h5>
            </div>
            <ModalBody>
                <Form id="RegisterValidation">
                    <Row className="justify-content-center">
                        <Col className="mt-3" lg="10">
                            <FormGroup>
                                <label>Id Aplicación</label>
                                <Input
                                    name="email"
                                    type="email"
                                    value = {idAplicacion}
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup className={`has-label ${aplicacionState}`}>
                                <label>Aplicación *</label>
                                <Input
                                    name="aplicacion"
                                    type="text"
                                    id = "aplicacion"
                                    value = {aplicacion}
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
                                    value = {version}
                                    id = "version"
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
                                    id = "descripcionApp"
                                    value = {descripcionApp}
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
                                    id = "descripcionTec"
                                    value = {descripcionTec}
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
                                    placeholder="Selecciona una suite"
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

export default ModalUpdateApplication;