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

function ModalUpdateTaxFee({abierto, toggleModalUpdateRecord, record, updateAddData, ip, autoCloseAlert}) {
    const [idTax, setIdTax] = React.useState("");
    const [tax, setTax] = React.useState("");
    const [idFactorType, setIdFactorType] = React.useState("");
    const [factorType, setFactorType] = React.useState("");
    const [fixed, setFixed] = React.useState(false);
    const [minimumValue, setMinimumValue] = React.useState(0);
    const [maximumValue, setMaximumValue] = React.useState(0);
    const [withholding, setWithholding] = React.useState(false);
    const [transfer, setTransfer] = React.useState(false);
    const [status, setStatus] = React.useState(true);

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setIdTax(record.idTax);
        setIdFactorType(record.idFactorType);
        setMinimumValue(record.minimumValue);
        setMaximumValue(record.maximumValue);
        setTax(record.tax);
        setFactorType(record.factorType);
        if(record.fixed === "Fijo")
        {
            setFixed(true);
        }
        else{
            setFixed(false);
        }
        if(record.withholding === "Si")
        {
            setWithholding(true);
        }
        else{
            setWithholding(false);
        }
        if(record.transfer === "Si")
        {
            setTransfer(true);
        }
        else{
            setTransfer(false);
        }
        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else{
            setStatus(false);
        }
    },[record]);

    const handleModalClick = () => {
        setError("")
        setErrorState("")
        setErrorMessage("")
        toggleModalUpdateRecord(!abierto);
    };   

    const updateClick = () => {
        //haremos el fetch a la base de datos para agregar el registro
        updateRegister();
    };

    function updateRegister(){
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            pSpCatalog: "spSAT_Cat_Rate_Fee_CRUD_Records",
            pvOptionCRUD: "C",
            pvIdTax: idTax,
            pvIdFactorType: idFactorType,
            pbFixed: fixed,
            pfMinimumValue: minimumValue,
            pfMaximumValue: maximumValue,
            pbWithholding: withholding,
            pbTransfer: transfer,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };

        console.log(catRegister)
    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/update-sat-tax-fee`, {
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
                        <label>Impuesto</label>
                        <Input
                            name="tax"
                            type="text"
                            value={idTax + " - " + tax} 
                            readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Tipo Factor</label>
                        <Input
                            name="factorType"
                            type="text"
                            value={idFactorType + " - " + factorType} 
                            readOnly
                        />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="checkbox" 
                                checked = {fixed}
                                readOnly
                            />{' '}
                            Fijo
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <label>Valor Mínimo *</label>
                        <Input
                            name="minimumValue"
                            type="text"
                            id="minimumvalue"
                            autoComplete="off"
                            value = {minimumValue}
                            readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Valor Máximo *</label>
                        <Input
                            name="maximumValue"
                            type="number"
                            autoComplete="off"
                            value ={maximumValue}
                            readOnly
                        />
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
                    <Button color="primary" onClick={updateClick}>
                        Guardar cambios
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalUpdateTaxFee;