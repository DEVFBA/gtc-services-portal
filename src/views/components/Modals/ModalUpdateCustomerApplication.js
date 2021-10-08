import React, { useState, useEffect } from "react";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

import moment from 'moment';

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

function ModalUpdateCustomerApplication({modalUpdateRecord, setModalUpdateRecord, record, updateAddData, ip}) {
    
    const [updateCustomer, setupdateCustomer] = React.useState("");
    const [updateApplication, setupdateApplication] = React.useState("");
    const [updateValidity, setupdateValidity] = React.useState();
    const [updateValidDate, setupdateValidDate] = React.useState(null);

    const [updateCustomerState, setupdateCustomerState] = React.useState("");
    const [updateApplicationState, setupdateApplicationState] = React.useState("");
    const [updateValidDateState, setupdateValidDateState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setupdateCustomer(record.idCus)
        setupdateApplication({
            value: record.idApp,
            label: record.application
        })
        if(record.licenseDate === "Vitalicia")
        {
            setupdateValidDate(null)
            setupdateValidity(false)
        }
        else{
            setupdateValidDate(record.dateValid)
            setupdateValidity(true)
        }
    },[record]);

    const handleModalClick = () => {
        setModalUpdateRecord(!modalUpdateRecord);
    };

    const isValidated = () => {
        if (
            updateApplicationState !== "has-danger"
        ) {
            if(updateValidity === true){
                if(updateValidDateState === "has-success")
                {
                    return true;
                }
                else{
                    if (updateValidDateState !== "has-success") {
                        setupdateValidDateState("has-danger");
                    }
                    return false;
                }
            }
            else{
                return true;
            }  
        } else {
          if (updateApplicationState !== "has-success") {
            setupdateApplicationState("has-danger");
          }
          return false;
        }
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            updateRegister()
        }
        else{
            console.log("no entre")
        }
    };

    function updateRegister(){
        var date;
        var month;
        var year;
        var finalDate2;

        if(updateValidity === true) 
        {
            if(updateValidDate._d.getDate() < 10)
            {
                date = "0" + updateValidDate._d.getDate()
            }
            else{
                date = updateValidDate._d.getDate()
            }
            if((updateValidDate._d.getMonth() + 1) < 10)
            {
                month = "0" + (updateValidDate._d.getMonth() + 1)
            }
            else 
            {
                month = updateValidDate._d.getMonth() + 1
            }
            year = updateValidDate._d.getFullYear()
            finalDate2 = "" + year + "" + month + "" + date
        }
        else {
            finalDate2 = null
        }

        //console.log(updateCustomer)
        //console.log(updateCustomer)
        const catRegister = {
            pvOptionCRUD: "U",
            piIdCustomer: updateCustomer,
            piIdApplication: updateApplication.value,
            pvFinalEffectiveDate: finalDate2,
            pvUser: user,
            pvIP: ip
        };
    
        fetch(`http://129.159.99.152/develop-api/customer-applications/update-customer-application`, {
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

     //Desactivar días anteriores en el datepicker
     const yesterday = moment().subtract(1, 'day');
     const disablePastDt = current => {
         return current.isAfter(yesterday);
     };

    return (
        <Modal isOpen={modalUpdateRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Actualizar Aplicación / Servicio</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
            <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <label>Cliente</label>
                            <Input
                                name="text"
                                type="text"
                                placeholder = {record.client}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Aplicación / Servicio</label>
                            <Input
                                name="text"
                                type="text"
                                placeholder = {record.application}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox" 
                                checked = {updateValidity}
                                onChange={(e) => {
                                    setupdateValidity(e.target.checked)
                                }}
                            />{' '}
                            ¿La aplicación / servicio tiene vigencia?
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            </Label>
                            {updateValidity === true ? (
                            <>
                                <FormGroup className={`has-label ${updateValidDateState}`}>
                                    <ReactDatetime
                                        inputProps={{
                                        className: "form-control",
                                        placeholder: "Selecciona la fecha de vigencia",
                                        }}
                                        timeFormat={false}
                                        initialValue={record.dateValid}
                                        isValidDate={disablePastDt}
                                        onChange={(date) => {
                                            setupdateValidDate(date)
                                            setupdateValidDateState("has-success");
                                        }}
                                    />
                                    {updateValidDateState === "has-danger" ? (
                                        <label className="error">Este campo es requerido.</label>
                                    ) : null}
                                </FormGroup>    
                            </>
                            ) : null}
                        </FormGroup>
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
                    Cerrar
                </Button>
                <Button className="buttons" color="primary" onClick={updateClick}>
                    Guardar cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalUpdateCustomerApplication;