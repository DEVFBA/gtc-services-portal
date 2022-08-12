import React, { useState } from "react";

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

import Select from "react-select";

function ModalAddTaxFee({modalAddRecord, setModalAddRecord, updateAddData, ip, autoCloseAlert, dataTaxes, dataFactorTypes}) {

    const [tax, setTax] = React.useState("");
    const [factorType, setFactorType] = React.useState("");
    const [fixed, setFixed] = React.useState(false);
    const [minimumValue, setMinimumValue] = React.useState(0);
    const [maximumValue, setMaximumValue] = React.useState(0);
    const [withholding, setWithholding] = React.useState(false);
    const [transfer, setTransfer] = React.useState(false);
    const [status, setStatus] = React.useState(true);
    
    const [taxState, setTaxState] = React.useState("");
    const [factorTypeState, setFactorTypeState] = React.useState("");
    const [minimumValueState, setMinimumValueState] = React.useState();
    const [maximumValueState, setMaximumValueState] = React.useState();

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    
    const handleModalClick = () => {
        setTax("")
        setFactorType("")
        setFixed(false)
        setMinimumValue(0)
        setMaximumValue(0)
        setWithholding(false)
        setTransfer(false)
        setStatus(false)
        setTaxState("")
        setFactorTypeState("")
        setMinimumValueState("")
        setMaximumValueState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        setModalAddRecord(!modalAddRecord);
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
            taxState === "has-success" &&
            factorTypeState === "has-success" &&
            minimumValueState === "has-success" &&
            maximumValueState === "has-success"
        ) {
          return true;
        } else {
            if (taxState !== "has-success") {
                setTaxState("has-danger");
            }
            if (factorTypeState !== "has-success") {
                setFactorTypeState("has-danger");
            }
            if (minimumValueState !== "has-success") {
                setMinimumValueState("has-danger");
            }
            if (maximumValueState !== "has-success") {
                setMaximumValueState("has-danger");
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
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            pSpCatalog: "spSAT_Cat_Rate_Fee_CRUD_Records",
            pvOptionCRUD: "C",
            pvIdTax: tax,
            pvIdFactorType: factorType,
            pbFixed: fixed,
            pfMinimumValue: minimumValue,
            pfMaximumValue: maximumValue,
            pbWithholding: withholding,
            pbTransfer: transfer,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };
    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/create-sat-tax-fee`, {
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
                if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                    autoCloseAlert(data[0].Code_Message_User)
                }
                if(data[0].Code_Type === "Warning")
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
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Agregar Registro</h5>
            </div>
            <ModalBody>
                <Form id="RegisterValidation">
                    <FormGroup className={`has-label ${taxState}`}>
                        {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                        <label>Impuesto *</label>
                        <Select 
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder = "Selecciona un impuesto"
                            options = {dataTaxes}
                            onChange={(e) => {
                                setTax(e.value);
                                setTaxState("has-success");
                            }}
                        />
                        {taxState === "has-danger" ? (
                            <label className="error">Este campo es requerido.</label>
                        ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${factorTypeState}`}>
                        {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                        <label>Tipo Factor *</label>
                        <Select 
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder = "Selecciona un factor impuesto"
                            options = {dataFactorTypes}
                            onChange={(e) => {
                                setFactorType(e.value);
                                setFactorTypeState("has-success");
                            }}
                        />
                        {factorTypeState === "has-danger" ? (
                            <label className="error">Este campo es requerido.</label>
                        ) : null}
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="checkbox" 
                                checked = {fixed}
                                onChange={(e) => {
                                    setFixed(e.target.checked)
                                }}
                            />{' '}
                                Fijo
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </Label>
                    </FormGroup>
                    <FormGroup className={`has-label ${minimumValueState}`}>
                        <label>Valor Mínimo *</label>
                        <Input
                            name="minimumValue"
                            type="number"
                            autoComplete="off"
                            min={0}
                            step={0.1}
                            onChange={(e) => {
                                if(e.target.value!=="")
                                {
                                    setMinimumValue(e.target.value)
                                    setMinimumValueState("has-success")
                                }
                                else {
                                    setMinimumValue(e.target.value)
                                    setMinimumValueState("has-danger")
                                }
                            }}
                        />
                        {minimumValueState === "has-danger" ? (
                            <label className="error">Este campo es requerido.</label>
                        ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${maximumValueState}`}>
                        <label>Valor Máximo *</label>
                        <Input
                            name="maximumValue"
                            type="number"
                            autoComplete="off"
                            min={0}
                            step={0.1}
                            onChange={(e) => {
                                if(e.target.value !== "" && e.target.value > minimumValue)
                                {
                                    setMaximumValue(e.target.value)
                                    setMaximumValueState("has-success")
                                }
                                else {
                                    setMaximumValue(e.target.value)
                                    setMaximumValueState("has-danger")
                                }
                            }}
                        />
                        {maximumValueState === "has-danger" ? (
                            <label className="error">Este campo es requerido - El valor debe ser mayor al Mínimo.</label>
                        ) : null}
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="checkbox" 
                                checked = {withholding}
                                onChange={(e) => {
                                    setWithholding(e.target.checked)
                                }}
                            />{' '}
                                Retención
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="checkbox" 
                                checked = {transfer}
                                onChange={(e) => {
                                    setTransfer(e.target.checked)
                                }}
                            />{' '}
                                Traslado
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </Label>
                    </FormGroup>
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
                    <div className="category form-category">
                        * Campos requeridos
                    </div>
                    <FormGroup className={`has-label ${errorState}`}>
                        {errorState === "has-danger" ? (
                                <label className="error">{errorMessage}</label>
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
                    <Button color="primary" onClick={registerClick}>
                        Guardar cambios
                    </Button>
                </div>
            </ModalFooter>
      </Modal>
    );
}

export default ModalAddTaxFee;