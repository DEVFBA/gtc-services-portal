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

function ModalUpdateTypesOperation({abierto, toggleModalUpdateRecord, record, updateAddData, ip}) {
        // update form
    const [id, setId] = React.useState("Hola");
    const [shortDescription, setShortDescription] = React.useState("");
    const [longDescription, setLongDescription] = React.useState("");
    const [status, setStatus] = React.useState(true);
    
    const [shortDescriptionState, setShortDescriptionState] = React.useState("");
    const [longDescriptionState, setLongDescriptionState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

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
        setShortDescriptionState("")
        setLongDescriptionState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
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
            pSpCatalog: "spSAT_Cat_Operation_Types_CRUD_Records",
            pvOptionCRUD: "U",
            pvIdCatalog: id,
            pvShortDesc: shortDescription,
            pvLongDesc: longDescription,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };
    
        fetch(`http://129.159.99.152/develop-api/api/cat-catalogs/update-sat`, {
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
                if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                }
                if(data[0].Code_Type === "Warning")
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
 
    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Editar Registro</h5>
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
                  autoComplete="off"
                  id = "shortdescription"
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
                    <label className="error">Este campo es requerido.</label>
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
                    <label className="error">Este campo es requerido.</label>
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
            <Button color="primary" onClick={updateClick}>
                Guardar cambios
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
}

export default ModalUpdateTypesOperation;