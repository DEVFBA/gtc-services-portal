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

function ModalAddApplicationSuites({modalAddRecord, setModalAddRecord, updateAddData}) {
        
    const [id, setId] = React.useState();
    const [shortDescription, setShortDescription] = React.useState("");
    const [longDescription, setLongDescription] = React.useState("");
    const [status, setStatus] = React.useState(true);
    
    const [idState, setIdState] = React.useState("");
    const [shortDescriptionState, setShortDescriptionState] = React.useState("");
    const [longDescriptionState, setLongDescriptionState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
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
            longDescriptionState === "has-success"
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
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            pSpCatalog: "spCat_Suites_CRUD_Records",
            pvOptionCRUD: "C",
            piIdSuite: id,
            pvShortDesc: shortDescription,
            pvLongDesc: longDescription,
            pbStatus: status,
            pvUser: user,
        };
    
        fetch(`http://localhost:8091/api/cat-catalogs/create-portal`, {
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
 
    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Edit Record</h5>
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
                    <label className="error">This field is required.</label>
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
                    <label className="error">This field is required.</label>
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
                    <label className="error">This field is required.</label>
                ) : null}
            </FormGroup>
            <FormGroup check>
                    <Label check>
                    <Input 
                        type="checkbox" 
                        checked = {status}
                        onChange={(e) => {
                            setregisterStatus(e.target.checked)
                        }}
                    />{' '}
                    Habilitado
                    <span className="form-check-sign">
                        <span className="check"></span>
                    </span>
                    </Label>
            </FormGroup>
            <div className="category form-category">
                * Required fields
            </div>
            <FormGroup className={`has-label ${errorState}`}>
                {errorState === "has-danger" ? (
                        <label className="error">The record already exists, please validate</label>
                ) : null}
            </FormGroup>
          </Form>
          {error}
        </ModalBody>
        <ModalFooter>
          <div className="center-side">
            <Button color="secondary" onClick={handleModalClick}>
                Close
            </Button>
            <Button color="primary" onClick={registerClick}>
                Save changes
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
}

export default ModalAddApplicationSuites;