import React, { useState, useEffect } from "react";
import axios from 'axios'

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

function ModalUpdateGeneralParameter({abierto, toggleModalUpdateRecord, record, updateAddData, ip, autoCloseAlert}) {
        // update form
    const [idParameter, setIdParameter] = React.useState("");
    const [idGrouper, setIdGrouper] = React.useState("");
    const [longDesc, setLongDesc] = React.useState("");
    const [dataType, setDataType] = React.useState("");
    const [value, setValue] = React.useState("");
    const [status, setStatus] = React.useState();
    
    const [valueState, setValueState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setIdParameter(record.idParameter)
        setIdGrouper(record.idGrouper);
        setLongDesc(record.longDesc)
        setDataType(record.dataType)
        setValue(record.value)
        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else{
            setStatus(false);
        }
    },[record]);

    const handleModalClick = () => {
        setValueState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        toggleModalUpdateRecord(!abierto);
    };

     // function that verifies if a string has a given length or not
     const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var valueV = document.getElementById("value").value

        if(dataType === "String" || dataType === "Number")
        {
            if (!verifyLength(valueV, 1)) {
                setValueState("has-danger");
            } else {
                setValueState("has-success");
            }
            setValue(valueV);
        }
        else
        {
            setValueState("has-success")
        }
    }

    const isValidated = () => {
        
        verifyInputs()
        if (
            valueState !== "has-danger"
        ) {
          return true;
        } else {
            return false;
        }
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            //haremos el fetch a la base de datos para agregar el registro
            updateRegister()
        }
    };

    function updateRegister(){
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            piIdParameter : idParameter,
            pvIdGrouper: idGrouper,
            pvLongDesc: longDesc,
            pvValue: value,
            pvUser: user,
            pvIP: ip
        };
    
        fetch(`${process.env.REACT_APP_API_URI}general-parameters/update`, {
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
        <h5 className="modal-title">Editar Registro</h5>
        </div>
        <ModalBody>
        <Form id="RegisterValidation">
            <FormGroup>
              <label>Agrupador</label>
              <Input
                name="id"
                type="text"
                value={idGrouper} 
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <label>Parámetro</label>
              <Input
                name="id"
                type="text"
                value={longDesc} 
                readOnly
              />
            </FormGroup>
            {dataType === "String" ? (
                <FormGroup className={`has-label ${valueState}`}>
                    <label>Valor *</label>
                    <Input
                        name="value"
                        type="text"
                        id = "value"
                        value={value}
                        autoComplete="off"
                        onChange={(e) => {
                            if (!verifyLength(e.target.value, 1)) {
                                setValueState("has-danger");
                            } else {
                                setValueState("has-success");
                            }
                            setValue(e.target.value);
                        }}
                    />
                    {valueState === "has-danger" ? (
                        <label className="error">Este campo es requerido.</label>
                    ) : null}
                </FormGroup>
            ): null}
            {dataType === "Number" ? (
                <FormGroup className={`has-label ${valueState}`}>
                    <label>Valor *</label>
                    <Input
                        name="value"
                        type="number"
                        id = "value"
                        value={value}
                        autoComplete="off"
                        onChange={(e) => {
                            if (!verifyLength(e.target.value, 1)) {
                                setValueState("has-danger");
                            } else {
                                setValueState("has-success");
                            }
                            setValue(e.target.value);
                        }}
                    />
                    {valueState === "has-danger" ? (
                        <label className="error">Este campo es requerido.</label>
                    ) : null}
                </FormGroup>
            ): null}
            {dataType === "Boolean" ? (
                <>
                 <label>Valor *</label>
                 <FormGroup check>
                    <Label check>
                    <Input 
                        type="checkbox" 
                        checked = {value}
                        onChange={(e) => {
                            setValue(e.target.checked)
                        }}
                    />{' '}
                    Habilitado
                    <span className="form-check-sign">
                        <span className="check"></span>
                    </span>
                    </Label>
                </FormGroup>
                </>
            ): null}
            <label>Estatus</label>
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
            <FormGroup className={`has-label ${errorState}`}>
                {errorState === "has-danger" ? (
                        <label className="error">
                            {errorMessage}
                        </label>
                ) : null}
            </FormGroup>
          </Form>
          {error}
        </ModalBody>
        <ModalFooter>
          <div className="center-side">
            <Button color="secondary" onClick={handleModalClick}>
                Cerrar
            </Button>
            <Button color="primary" onClick={updateClick}>
                Guardar Cambios
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
}

export default ModalUpdateGeneralParameter;