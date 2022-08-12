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

function ModalAddCustomerItemTaxes({modalAddRecord, setModalAddRecord, ip, autoCloseAlert, updateAddData, dataFactorTypes, dataTaxes, dataCustomerItems, customerE}) {
        
    const [customer, setCustomer] = React.useState("");
    const [idItem, setIdItem] = useState("");
    const [factorType, setFactorType] = useState("");
    const [tax, setTax] = useState("");
    const [taxType, setTaxType] = useState("");
    const [value, setValue] = useState("");
    const [status, setStatus] = useState(true)

    const [idItemState, setIdItemState] = useState("");
    const [factorTypeState, setFactorTypeState] = useState("");
    const [taxState, setTaxState] = useState("");
    const [taxTypeState, setTaxTypeState] = useState("");
    const [valueState, setValueState] = useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setCustomer(customerE);
    },[customerE]);

    const handleModalClick = () => {
        setIdItemState("");
        setFactorTypeState("");
        setTaxState("");
        setTaxTypeState("");
        setValueState("");
       
        setError("");
        setErrorState("");
        setErrorMessage("");
        setModalAddRecord(!modalAddRecord);
    };
    
    const isValidated = () => {
        if (idItemState === "has-success" &&
            factorTypeState === "has-success" &&
            taxState === "has-success" &&
            taxTypeState === "has-success" &&
            valueState === "has-success") 
        {
            return true;
        } else {
            if (idItemState !== "has-success") {
                setIdItemState("has-danger");
            }
            if (factorTypeState !== "has-success") {
                setFactorTypeState("has-danger");
            }
            if (taxState !== "has-success") {
                setTaxState("has-danger");
            }
            if (taxTypeState !== "has-success") {
                setTaxTypeState("has-danger");
            }
            if (valueState !== "has-success") {
                setValueState("has-danger");
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
        else {
            console.log("no entre")
        }
    };

    function updateRegister(){
        const catRegister = {
            piIdCustomer: customer.value,
            pvIdItem: idItem.value,
            pvIdFactorType: factorType.value,
            pvIdTax: tax.value,
            pvTaxType: taxType.value,
            pvTaxValue: value,
            pbStatus: status,
            pvUser: user,
            pvIP: ip,
        };

        console.log(catRegister)

        fetch(`${process.env.REACT_APP_API_URI}customer-items-taxes/insert/`, {
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
                    
                    //Borramos el valor de las variables porque se quedan pegados cuando se insertan varios consecutivamente
                    setIdItem("");
                    setFactorType("");
                    setTax("");
                    setTaxType("");
                    setValue("");
                    setStatus(true);

                    autoCloseAlert(data[0].Code_Message_User)
                    handleModalClick() 
                }
                else if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")

                    //Borramos el valor de las variables porque se quedan pegados cuando se insertan varios consecutivamente
                    setIdItem("");
                    setFactorType("");
                    setTax("");
                    setTaxType("");
                    setValue("");
                    setStatus(true);

                    autoCloseAlert(data[0].Code_Message_User);
                    handleModalClick();
                }
                else{
                    setErrorState("has-success");
                    //Para actualizar la tabla en componente principal
                    updateAddData()

                    //Borramos el valor de las variables porque se quedan pegados cuando se insertan varios consecutivamente
                    setIdItem("");
                    setFactorType("");
                    setTax("");
                    setTaxType("");
                    setValue("");
                    setStatus(true);

                    //Cerramos el modal
                    handleModalClick() 
                    autoCloseAlert(data[0].Code_Message_User)
                }
            }
        });
    }

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg" aria-labelledby="contained-modal-title-vcenter">
           <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Agregar Cliente - Artículo Impuesto</h5>
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
                                value={customer.label}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`has-label ${idItemState}`}>
                            <Label for="exampleSelect">Número de Item * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un Número de Item"
                                classNamePrefix="react-select"
                                onChange={(value) => {
                                    setIdItem(value)
                                    setIdItemState("has-success");
                                }}
                                options={dataCustomerItems}
                            />
                            {idItemState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un Número de Item</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${factorTypeState}`}>
                            <Label for="exampleSelect">Tipo de Factor *</Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un Tipo de Factor"
                                classNamePrefix="react-select"
                                onChange={(value) => {
                                    setFactorType(value)
                                    setFactorTypeState("has-success");
                                }}
                                options={dataFactorTypes}
                            />
                            {factorTypeState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un Tipo de Factor</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${taxState}`}>
                            <Label for="exampleSelect">Impuesto *</Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un Impuesto"
                                classNamePrefix="react-select"
                                onChange={(value) => {
                                    setTax(value)
                                    setTaxState("has-success");
                                }}
                                options={dataTaxes}
                            />
                            {taxState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un Impuesto</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${taxTypeState}`}>
                            <Label for="exampleSelect">Tipo de Impuesto *</Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un Tipo de Impuesto"
                                classNamePrefix="react-select"
                                onChange={(value) => {
                                    setTaxType(value)
                                    setTaxTypeState("has-success");
                                }}
                                options={[
                                    {value: "T", label: "T - Traslado"},
                                    {value: "R", label: "R - Retención"},
                                ]}
                            />
                            {taxTypeState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un Tipo de Impuesto</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${valueState}`}>
                            <Label for="exampleSelect">Valor *</Label>
                            <Input
                                name="value"
                                type="number"
                                autoComplete="off"
                                min = "0"
                                max = "1"
                                onChange={(e) => {
                                    if(e.target.value === "" || e.target.value < 0)
                                    {
                                        setValueState("has-danger")
                                    }
                                    else {
                                        setValueState("has-success")
                                    }
                                    setValue(e.target.value);
                                }}
                            />
                            {valueState === "has-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
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

export default ModalAddCustomerItemTaxes;