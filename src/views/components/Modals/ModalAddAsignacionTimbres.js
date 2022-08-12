import React, { useState, useEffect } from "react";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

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

// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import moment from 'moment';

function ModalAddAsignacionTimbres({modalAddRecord, setModalAddRecord, dataCustomers, updateAddData, ip, autoCloseAlert}) {
    // register form
    const [customer, setCustomer] = useState("");
    const [noTimbres, setNoTimbres] = useState("");
    const [fecha, setFecha] = useState("");

    const [customerState, setCustomerState] = useState("");
    const [noTimbresState, setNoTimbresState] = useState("");
    const [fechaState, setFechaState] = useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        //Regresamos todo a su estado inicial
        setCustomer("");
        setNoTimbres("");
        setFecha("");
        setCustomerState("");
        setNoTimbresState();
        setFechaState("");
        setErrorState("")

        //Cerramos el modal
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
            customerState === "has-success" &&
            noTimbresState === "has-success" &&
            fechaState === "has-success"
        ) {
          return true;
        } else {
          if (customerState !== "has-success") {
            setCustomerState("has-danger");
          }
          if (noTimbresState !== "has-success") {
            setNoTimbresState("has-danger");
          }
          if (fechaState !== "has-success") {
            setFechaState("has-danger");
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
    };

    function addRegister(){

        console.log(customer)
        console.log(noTimbres)
        //console.log(fecha)

        var date;
        var month;
        var year;
        var finalDate;

        
        if(fecha._d.getDate() < 10)
        {
            date = "0" + fecha._d.getDate()
        }
        else{
            date = fecha._d.getDate()
        }
        if((fecha._d.getMonth() + 1) < 10)
        {
            month = "0" + (fecha._d.getMonth() + 1)
        }
        else 
        {
            month = fecha._d.getMonth() + 1
        }
        year = fecha._d.getFullYear()
        finalDate = "" + year + "" + month + "" + date

        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            piIdCustomer: customer.value,
            piAssigned: noTimbres,
            pvEffectiveDate: finalDate,
            pvUser: user,
            pvIP: ip
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}customers-stamping/create/`);

        fetch(url, {
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
                    autoCloseAlert(data[0].Code_Message_User)
                    setErrorState("has-danger")
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

    //Desactivar días anteriores en el datepicker
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
         return current.isAfter(yesterday);
    };

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Añadir Asignación de Timbres</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`has-label ${customerState}`}>
                            <Label for="exampleSelect">Cliente * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona un cliente"
                                classNamePrefix="react-select"
                                value={customer}
                                onChange={(value) => {
                                    setCustomer(value)
                                    setCustomerState("has-success");
                                }}
                                options={dataCustomers}
                            />
                            {customerState === "has-danger" ? (
                                <label className="error">Selecciona un cliente.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${noTimbresState}`}>
                            <label>Número de Timbres *</label>
                            <Input
                                name="noTimbres"
                                type="number"
                                autoComplete="off"
                                onChange={(e) => {
                                    setNoTimbresState("has-success");
                                    setNoTimbres(e.target.value);
                                }}
                            />
                            {noTimbresState === "has-danger" ? (
                                <label className="error">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${fechaState}`}>
                            <label>Vigencia *</label>
                            <ReactDatetime
                                inputProps={{
                                    className: "form-control",
                                    placeholder: "Selecciona la fecha de vigencia",
                                }}
                                timeFormat={false}
                                isValidDate={disablePastDt}
                                onChange={(date) => {
                                    setFecha(date)
                                    setFechaState("has-success");
                                }}
                            />
                            {fechaState === "has-danger" ? (
                                <label className="error">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>  
                    </Col>
                    <Col className="mt-3" lg="10">
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
                <Button className="buttons" color="primary" onClick={registerClick}>
                   Guardar Cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddAsignacionTimbres;