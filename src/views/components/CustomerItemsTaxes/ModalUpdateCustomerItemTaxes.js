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

function ModalUpdateCustomerItemTaxes({modalUpdateRecord, setModalUpdateRecord, ip, autoCloseAlert, updateAddData, dataFactorTypes, dataTaxes, record}) {
    const [idItemTaxes, setIdItemTaxes] = React.useState("");
    const [customer, setCustomer] = React.useState("");
    const [idCustomer, setIdCustomer] = React.useState("");
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
        setIdItemTaxes(record.idItemTaxes);
        setIdCustomer(record.idCustomer);
        setCustomer(record.customer);
        setFactorType({
            value: record.idFactorType, label: record.idFactorType + " - " + record.factorType
        });
        setIdItem(record.idItem);
        setTax({
            value: record.idTax, label: record.idTax + " - " + record.tax
        });
        
        if(record.taxType === "T")
        {
            setTaxType({
                value: record.taxType, label: record.taxType + " - " + "Traslado"
            });
        }
        else {
            setTaxType({
                value: record.taxType, label: record.taxType + " - " + "Retención"
            });
        } 
        setValue(record.taxValue);
        setValueState("has-success");
        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else {
            setStatus(false);
        }
    },[record]);

    const handleModalClick = () => {
        setIdItemState("");
        setFactorTypeState("");
        setTaxState("");
        setTaxTypeState("");
        setValue("");
        setError("")
        setErrorState("")
        setErrorMessage("")
        setModalUpdateRecord(!modalUpdateRecord);
    };

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var valor = document.getElementById("valor").value

        if (valor === "") {
            setValueState("has-danger");
        } else {
            setValueState("has-success");
        }
        setValue(valor);
    }
    
    const isValidated = () => {
        verifyInputs()
        if (
            valueState === "has-success"
        ) 
        {
            return true;
        } else {
            if (valueState !== "has-success") {
                setValueState("has-danger");
            }
            return false;
        }
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
            piIdItemTaxes: idItemTaxes,
            piIdCustomer: idCustomer,
            pvIdItem: idItem,
            pvIdFactorType: factorType.value,
            pvIdTax: tax.value,
            pvTaxType: taxType.value,
            pvTaxValue: value,
            pbStatus: status,
            pvUser: user,
            pvIP: ip,
        };

        console.log(catRegister)

        fetch(`${process.env.REACT_APP_API_URI}customer-items-taxes/update/`, {
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
                    handleModalClick() 
                }
                else if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                    autoCloseAlert(data[0].Code_Message_User);
                    handleModalClick();
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
                <h5 className="modal-title">Actualizar Cliente - Artículo Impuestos</h5>
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
                        <FormGroup>
                            <Label for="exampleSelect">Número de Item</Label>
                            <Input
                                name="iditem"
                                type="text"
                                autoComplete="off"
                                value={idItem}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${factorTypeState}`}>
                            <Label for="exampleSelect">Tipo de Factor * </Label>
                            <Select
                                name="factortype"
                                className="react-select"
                                placeholder="Selecciona un Tipo de Factor"
                                classNamePrefix="react-select"
                                value={factorType}
                                onChange={(value) => {
                                    setFactorType(value)
                                    setFactorTypeState("has-success");
                                }}
                                options={dataFactorTypes}
                            />
                            {factorTypeState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un Tipo de Factor.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${taxState}`}>
                            <Label for="exampleSelect">Impuesto * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un Impuesto"
                                classNamePrefix="react-select"
                                value = {tax}
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
                            <Label for="exampleSelect">Tipo de Impuesto * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un Tipo de Impuesto"
                                classNamePrefix="react-select"
                                value={taxType}
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
                        <FormGroup className={`has-label ${valueState}`}>
                            <Label for="exampleSelect">Valor * </Label>
                            <Input
                                id="valor"
                                name="value"
                                type="number"
                                autoComplete="off"
                                value={value}
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

export default ModalUpdateCustomerItemTaxes;