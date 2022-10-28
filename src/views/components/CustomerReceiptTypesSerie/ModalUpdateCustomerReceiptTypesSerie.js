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
    Row,
    Col,
} from "reactstrap";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

function ModalUpdateCustomerReceiptTypesSerie({modalUpdateRecord, setModalUpdateRecord, ip, autoCloseAlert, updateAddData, dataReceiptTypes, record}) {
        // register form
    const [idCustomer, setIdCustomer] = React.useState("");
    const [customer, setCustomer] = React.useState("");
    const [receiptType, setReceiptType] = useState("");
    const [serie, setSerie] = useState("");
    const [status, setStatus] = useState(true);

    const [serieState, setSerieState] = useState("");
    const [receiptTypeState, setReceiptTypeState] = useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setIdCustomer(record.idCustomer);
        setCustomer(record.customer);
        setReceiptType({
            value: record.idReceiptType, label: record.idReceiptType + " - " + record.receiptType
        });

        setSerie(record.serie);
        setSerieState("has-success");

        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else {
            setStatus(false);
        }
    },[record]);

    const handleModalClick = () => {
        setSerieState("");
        setError("");
        setErrorState("");
        setErrorMessage("");
        setModalUpdateRecord(!modalUpdateRecord);
    };

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var serie = document.getElementById("serie").value
        if (!verifyLength(serie, 1)) {
            setSerieState("has-danger");
        } else {
            setSerieState("has-success");
        }
        setSerie(serie);
    }
    
    const isValidated = () => {
        verifyInputs()
        if (
            serieState === "has-success"
        ) 
        {
            return true;
        } else {
            if (serieState !== "has-success") {
                setSerieState("has-danger");
            }
            return false;
        }
    };

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            updateRegister()
        }
    };

    function updateRegister(){
        const catRegister = {
            piIdCustomer: idCustomer,
            pvIdReceiptType: receiptType.value,
            pvSerie: serie,
            pbStatus: status,
            pvUser: user,
            pvIP: ip,
        };

        console.log(catRegister)

        fetch(`http://localhost:8091/api/customer-receipt-types-series/update/`, {
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
        <Modal isOpen={modalUpdateRecord} toggle={handleModalClick} size="lg" aria-labelledby="contained-modal-title-vcenter">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Actualizar Cliente - Tipo de Comprobante / Serie</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <Label for="exampleSelect">Cliente</Label>
                            <Input
                                name="customer"
                                type="text"
                                autoComplete="off"
                                value={customer}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${receiptTypeState}`}>
                            <Label for="exampleSelect">Tipo de Comprobante * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un País"
                                classNamePrefix="react-select"
                                value={receiptType}
                                onChange={(value) => {
                                    setReceiptType(value)
                                    setReceiptTypeState("has-success");
                                }}
                                options={dataReceiptTypes}
                            />
                            {receiptTypeState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un Tipo de Comprobante</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${serieState}`}>
                            <label>Serie *</label>
                            <Input
                                name="serie"
                                id="serie"
                                type="text"
                                autoComplete="off"
                                value={serie}
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setSerieState("has-danger");
                                    } else {
                                        setSerieState("has-success");
                                    }
                                    setSerie(e.target.value);
                                }}
                            />
                            {serieState === "has-danger" ? (
                                <label className="error">
                                    Este campo es requerido.
                                </label>
                            ) : null}
                        </FormGroup>
                        <Label for="exampleSelect">Estatus</Label>
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
                    </Col>
                    <Col className="mt-3" lg="10">
                        <div className="category form-category">
                        * Campos requeridos
                        </div>
                    </Col>  
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-text ${errorState}`}>
                            {errorState === "text-danger" ? (
                                <label className="form-text has-danger">
                                    {errorMessage}
                                </label>
                            ) : null}
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            </ModalBody>
            <ModalFooter>
                <div className="center-side">
                <Button className="buttons button-close btn-gtc" color="secondary" onClick={handleModalClick}>
                    Cerrar
                </Button>
                <Button className="buttons btn-gtc" color="primary" onClick={updateClick}>
                    Guardar cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalUpdateCustomerReceiptTypesSerie;