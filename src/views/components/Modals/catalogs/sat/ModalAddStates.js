import React, { useState, useEffect } from "react";
import { __esModule } from "react-select";

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

function ModalAddStates({modalAddRecord, setModalAddRecord, updateAddData, ip, autoCloseAlert, dataCountries}) {

    const [id, setId] = React.useState("");
    const [shortDescription, setShortDescription] = React.useState("");
    const [country, setCountry] = React.useState({});
    const [status, setStatus] = React.useState(true);
    
    const [idState, setIdState] = React.useState("");
    const [shortDescriptionState, setShortDescriptionState] = React.useState("");
    const [countryState, setCountryState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    
    const handleModalClick = () => {
        setId("")
        setShortDescription("")
        setCountry({});
        setStatus(true)
        setIdState("")
        setShortDescriptionState("")
        setCountryState("")
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
            idState === "has-success" &&
            shortDescriptionState === "has-success" &&
            countryState === "has-success"
        ) {
          return true;
        } else {
            if (idState !== "has-success") {
                setS("has-danger");
            }
            if (shortDescriptionState !== "has-success") {
                setShortDescriptionState("has-danger");
            }
            if (countryState !== "has-success") {
                setCountryState("has-danger");
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
        const catRegister = {
            pSpCatalog: "spSAT_Cat_States_CRUD_Records",
            pvIdCountry: country,
            pvIdState: id,
            pvDescription: shortDescription,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };
    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/create-sat-states`, {
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
            <FormGroup className={`has-label ${idState}`}>
                <label>Id *</label>
                <Input
                    name="id"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => {
                        if (!verifyLength(e.target.value, 1)) {
                            setIdState("has-danger");
                        } else {
                            setIdState("has-success");
                        }
                        setId(e.target.value);
                    }}
                />
                {idState === "has-danger" ? (
                    <label className="error">Este campo es requerido.</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${shortDescriptionState}`}>
                <label>Descripción *</label>
                <Input
                    name="shortdescription"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => {
                        if (!verifyLength(e.target.value, 1)) {
                            setShortDescriptionState("has-danger");
                        } else {
                            setShortDescriptionState("has-success");
                        }
                        setShortDescription(e.target.value);
                    }}
                />
                {shortDescriptionState === "has-danger" ? (
                    <label className="error">Este campo es requerido.</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${countryState}`}>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <label>País *</label>
                  <Select 
                    className="react-select"
                    classNamePrefix="react-select"
                    placeholder = "Selecciona un país"
                    options = {dataCountries}
                    onChange={(e) => {
                      setCountry(e.value);
                      setCountryState("has-success");
                    }}
                  />
                  {countryState === "has-danger" ? (
                    <label className="error">Este campo es requerido.</label>
                ) : null}
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

export default ModalAddStates;