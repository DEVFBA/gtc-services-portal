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
import { data } from "jquery";

function ModalAddCustomerApplication({modalAddRecord, setModalAddRecord, dataCustomers, dataApplications, updateAddData, ip, autoCloseAlert}) {
    
    const [registerCustomer, setregisterCustomer] = React.useState("");
    const [registerApplication, setregisterApplication] = React.useState("");
    const [registerValidity, setregisterValidity] = React.useState(false);
    const [registerValidDate, setregisterValidDate] = React.useState(null);

    const [registerCustomerState, setregisterCustomerState] = React.useState("");
    const [registerApplicationState, setregisterApplicationState] = React.useState("");
    const [registerValidDateState, setregisterValidDateState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        setregisterCustomer("")
        setregisterApplication("")
        setregisterValidity(false)
        setregisterValidDate(null)
        setregisterCustomerState("")
        setregisterApplicationState("")
        setregisterValidDateState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        setModalAddRecord(!modalAddRecord);
    };
    
    const isValidated = () => {
        if (
            registerCustomerState === "has-success" &&
            registerApplicationState === "has-success"
        ) {
            if(registerValidity === true){
                if(registerValidDateState !== "has-danger")
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
          if (registerCustomerState !== "has-success") {
            setregisterCustomerState("has-danger");
          }
          if (registerApplicationState !== "has-success") {
            setregisterApplicationState("has-danger");
          }
          if (registerValidDateState !== "has-success") {
            setregisterValidDateState("has-danger");
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

    //Desactivar días anteriores en el datepicker
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
    };

    function addRegister(){

        var date;
        var month;
        var year;
        var finalDate2;

        if(registerValidity === true) 
        {
            if(registerValidDate._d.getDate() < 10)
            {
                date = "0" + registerValidDate._d.getDate()
            }
            else{
                date = registerValidDate._d.getDate()
            }
            if((registerValidDate._d.getMonth() + 1) < 10)
            {
                month = "0" + (registerValidDate._d.getMonth() + 1)
            }
            else 
            {
                month = registerValidDate._d.getMonth() + 1
            }
            year = registerValidDate._d.getFullYear()
            finalDate2 = "" + year + "" + month + "" + date
        }
        else {
            finalDate2 = null
        }
        const catRegister = {
            pvOptionCRUD: "C",
            piIdCustomer: registerCustomer.value,
            piIdApplication: registerApplication.value,
            pvFinalEffectiveDate: finalDate2,
            pvUser: user,
            pvIP: ip
        };
    
        fetch(`${process.env.REACT_APP_API_URI}customer-applications/create-customer-application`, {
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
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Agregar Aplicación / Servicio</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`has-label ${registerCustomerState}`}>
                            <Label for="exampleSelect">Cliente * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona un cliente"
                                classNamePrefix="react-select"
                                value={registerCustomer}
                                onChange={(value) => {
                                    setregisterCustomer(value)
                                    setregisterCustomerState("has-success");
                                }}
                                options={dataCustomers}
                            />
                            {registerCustomerState === "has-danger" ? (
                                <label className="error">Selecciona un cliente.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${registerApplicationState}`}>
                            <Label for="exampleSelect">Aplicación / Servicio * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona una aplicación / servicio"
                                classNamePrefix="react-select"
                                value={registerApplication}
                                onChange={(value) => {
                                    setregisterApplication(value)
                                    setregisterApplicationState("has-success");
                                }}
                                options={dataApplications}
                            />
                            {registerApplicationState === "has-danger" ? (
                                <label className="error">Selecciona una aplicación / servicio.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox" 
                                onChange={(e) => {
                                    setregisterValidity(e.target.checked)
                                }}
                            />{' '}
                            ¿La aplicación / servicio tiene vigencia?
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            </Label>
                            {registerValidity === true ? (
                            <>
                                <FormGroup className={`has-label ${registerValidDateState}`}>
                                    <ReactDatetime
                                        inputProps={{
                                        className: "form-control",
                                        placeholder: "Selecciona la fecha de vigencia",
                                        }}
                                        timeFormat={false}
                                        isValidDate={disablePastDt}
                                        onChange={(date) => {
                                            setregisterValidDate(date)
                                            setregisterValidDateState("has-success");
                                        }}
                                    />
                                    {registerValidDateState === "has-danger" ? (
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
                </Row>
            </Form>
            </ModalBody>
            <ModalFooter>
                <div className="center-side">
                <Button className="buttons" color="secondary" onClick={handleModalClick}>
                    Cerrar
                </Button>
                <Button className="buttons" color="primary" onClick={registerClick}>
                    Guardar cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddCustomerApplication;