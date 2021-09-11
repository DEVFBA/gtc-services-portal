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

function ModalUpdateCFDIUses({abierto, toggleModalUpdateRecord, record, updateAddData}) {
        // update form
    const [id, setId] = React.useState("");
    const [shortDescription, setShortDescription] = React.useState("");
    const [longDescription, setLongDescription] = React.useState("");
    const [status, setStatus] = React.useState(true);
    
    const [shortDescriptionState, setShortDescriptionState] = React.useState("");
    const [longDescriptionState, setLongDescriptionState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");

    useEffect(() => {
        setId(record.idR);
        setShortDescription(record.shortDescription)
        setLongDescription(record.longDescription)
        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else{
            setStatus(false);
        }
    },[record]);

    const handleModalClick = () => {
        toggleModalUpdateRecord(!abierto);
    };

     // function that verifies if a string has a given length or not
     const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var shortDesc = document.getElementById("shortdescription").value
        var longDesc = document.getElementById("longdescription").value

        if (!verifyLength(shortDesc, 1)) {
            setShortDescriptionState("has-danger");
        } else {
            setShortDescriptionState("has-success");
        }
        setShortDescription(shortDesc);

        if (!verifyLength(longDesc, 1)) {
            setLongDescriptionState("has-danger");
        } else {
            setLongDescriptionState("has-success");
        }
        setLongDescription(longDesc);
    }

    const isValidated = () => {
        
        verifyInputs()
        if (
            shortDescriptionState !== "has-danger" &&
            longDescriptionState !== "has-danger"
        ) {
          return true;
        } else {
            return false;
        }
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            //haremos el fetch a la base de datos para agregar el registro
            updateRegister()
        }
    };

    function updateRegister(){
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            pSpCatalog: "spSAT_Cat_CFDI_Uses_CRUD_Records",
            pvOptionCRUD: "U",
            pvIdCatalog: id,
            pvShortDesc: shortDescription,
            pvLongDesc: longDescription,
            pbStatus: status,
            pvUser: 'ahernandez@gtcta.mx',
            pvIP : "IPALEXIS"
        };
    
        fetch(`http://localhost:8091/api/cat-catalogs/update-sat`, {
            method: "PUT",
            body: JSON.stringify(catRegister),
            headers: {
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
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Edit Record</h5>
        </div>
        <ModalBody>
        <Form id="RegisterValidation">
            <FormGroup>
              <label>Id</label>
              <Input
                name="id"
                type="text"
                value={id} 
                readOnly
              />
            </FormGroup>
            <FormGroup className={`has-label ${shortDescriptionState}`}>
                <label>Descripción corta</label>
                <Input
                  name="shortdescription"
                  type="text"
                  id = "shortdescription"
                  autoComplete="off"
                  value={shortDescription}
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
                <label>Descripción larga</label>
                <Input
                    name="descripcionlarga"
                    type="text"
                    value={longDescription}
                    id = "longdescription"
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
                        <label className="error">An error has occurred. Try again.</label>
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
            <Button color="primary" onClick={updateClick}>
                Save changes
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
}

export default ModalUpdateCFDIUses;