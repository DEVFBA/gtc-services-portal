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

import Select from "react-select";

function ModalAddTariffFractions({modalAddRecord, setModalAddRecord, updateAddData, ip, autoCloseAlert, dataCustomUoMs}) {
        // update form
    const [id, setId] = useState("Hola");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [customUoMs, setCustomUoMs] = useState("");
    const [status, setStatus] = useState(true);
    
    const [idState, setIdState] = useState("");
    const [shortDescriptionState, setShortDescriptionState] = useState("");
    const [longDescriptionState, setLongDescriptionState] = useState("");
    const [customUoMsState, setCustomUoMsState] = useState("");

    const [error, setError] = useState();
    const [errorState, setErrorState] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        setId("");
        setShortDescription("");
        setLongDescription("");
        setCustomUoMs("");
        setStatus(true);
        setIdState("");
        setShortDescriptionState("");
        setLongDescriptionState("");
        setCustomUoMsState("");
        setError("");
        setErrorState("");
        setErrorMessage("");
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
            longDescriptionState === "has-success" &&
            customUoMsState === "has-success"
        ) {
          return true;
        } else {
            if (idState !== "has-success") {
                setIdState("has-danger");
            }
            if (shortDescriptionState !== "has-success") {
                setShortDescriptionState("has-danger");
            }
            if (longDescriptionState !== "has-success") {
                setLongDescriptionState("has-danger");
            }
            if (customUoMsState !== "has-success") {
                setCustomUoMsState("has-danger");
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
            pSpCatalog: "spSAT_Cat_Harmonized_Tariff_Codes_CRUD_Records",
            pvOptionCRUD: "C",
            pvIdCatalog: id,
            pvShortDesc: shortDescription,
            pvLongDesc: longDescription,
            pvIdCustomUoMs : customUoMs,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };

        console.log(catRegister);
    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/create-sat-tariff-fractions`, {
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
                <label>Descripción corta *</label>
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
            <FormGroup className={`has-label ${longDescriptionState}`}>
                <label>Descripción larga *</label>
                <Input
                    name="descripcionlarga"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => {
                    if (!verifyLength(e.target.value, 1)) {
                        setLongDescriptionState("has-danger");
                    } else {
                        setLongDescriptionState("has-success");
                    }
                    setLongDescription(e.target.value);
                    }}
                />
                {longDescriptionState === "has-danger" ? (
                    <label className="error">Este campo es requerido.</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${customUoMsState}`}>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <label>Unidad Aduana *</label>
                  <Select 
                    className="react-select"
                    classNamePrefix="react-select"
                    placeholder = "Selecciona una unidad aduana"
                    options = {dataCustomUoMs}
                    onChange={(e) => {
                      setCustomUoMs(e.value);
                      setCustomUoMsState("has-success");
                    }}
                  />
                  {customUoMsState === "has-danger" ? (
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

export default ModalAddTariffFractions;