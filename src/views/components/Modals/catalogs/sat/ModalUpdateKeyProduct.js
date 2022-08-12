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
    Col
} from "reactstrap";

function ModalUpdateKeyProduct({abierto, toggleModalUpdateRecord, record, updateAddData, ip, autoCloseAlert}) {
        // update form
    const [id, setId] = React.useState("Hola");
    const [shortDescription, setShortDescription] = React.useState("");
    const [longDescription, setLongDescription] = React.useState("");
    const [vatTransfer, setVatTransfer] = React.useState("");
    const [vatTransferMessage, setVatTransferMessage] = React.useState("");
    const [iepsTransfer, setIEPSTransfer] = React.useState("");
    const [iepsTransferMessage, setIEPSTransferMessage] = React.useState("");
    const [status, setStatus] = React.useState(true);

    const [shortDescriptionState, setShortDescriptionState] = React.useState("");
    const [longDescriptionState, setLongDescriptionState] = React.useState("");
    const [vatTransferState, setVatTransferState] = React.useState("");
    const [iepsTransferState, setIEPSTransferState] = React.useState("");

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

        if(record.vatTransfer === "No Incluir")
        {
            setVatTransfer("0")
            setVatTransferMessage("No Incluir")
        }
        else if(record.vatTransfer === "Incluir"){
            setVatTransfer("1")
            setVatTransferMessage("Incluir")
        }
        else if(record.vatTransfer === "Opcional"){
            setVatTransfer("2")
            setVatTransferMessage("Opcional")
        }

        if(record.iepsTransfer === "No Incluir"){
            setIEPSTransfer("0")
            setIEPSTransferMessage("No Incluir")
        }
        else if(record.iepsTransfer === "Incluir"){
            setIEPSTransfer("1")
            setIEPSTransferMessage("Incluir")
        }
        else if(record.iepsTransfer === "Opcional"){
            setIEPSTransfer("2")
            setIEPSTransferMessage("Opcional")
        }
    },[record]);

    const handleModalClick = () => {
        setShortDescriptionState("")
        setLongDescriptionState("")
        setVatTransferState("")
        setIEPSTransferState("")
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
        var vatTrans = document.getElementById("vattransfer").value
        var iepsTrans = document.getElementById("iepstransfer").value

        console.log(vatTrans)
        console.log(iepsTrans)

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

        if(vatTrans === "0" || vatTrans === "1" || vatTrans === "2")
        {
            setVatTransferState("has-success")
            
        }
        else {
            setVatTransferState("has-danger");
        }
        setVatTransfer(vatTrans);

        if(iepsTrans === "0" || iepsTrans === "1" || iepsTrans === "2")
        {
            setIEPSTransferState("has-success")
        }
        else {
            setIEPSTransferState("has-danger");
        }
        setIEPSTransfer(iepsTrans);
    }

    const isValidated = () => {
        
        verifyInputs()
        if (
            shortDescriptionState !== "has-danger" &&
            longDescriptionState !== "has-danger" &&
            vatTransferState !== "has-danger" &&
            iepsTransferState !== "has-danger"
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
            pSpCatalog: "spSAT_Cat_Product_Service_Codes_CRUD_Records",
            pvOptionCRUD: "U",
            pvIdCatalog: id,
            pvShortDesc: shortDescription,
            pvLongDesc: longDescription,
            piVATTransfer: vatTransfer,    
            piIEPSTransfer: iepsTransfer,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };

        console.log(catRegister);
    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/update-sat-key-product`, {
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
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Editar Registro {record.name} </h5>
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
                    <label className="error">Este campo es requerido.</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${longDescriptionState}`}>
                <label>Descripción larga</label>
                <Input
                    name="descripcionlarga"
                    type="text"
                    id = "longdescription"
                    value={longDescription}
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
            <Row>
                <Col>
                    <FormGroup className={`has-label ${vatTransferState}`}>
                        <label>Incluir IVA Traslado *</label>
                        <Input
                            name="decimals"
                            type="number"
                            id="vattransfer"
                            autoComplete="off"
                            min={0}
                            max={2}
                            value={vatTransfer}
                            step={1}
                            onChange={(e) => {
                                if(e.target.value === "0")
                                {
                                    setVatTransfer(e.target.value);
                                    setVatTransferState("has-success");
                                    setVatTransferMessage("No Incluir");
                                }
                                else if(e.target.value === "1")
                                {
                                    setVatTransfer(e.target.value);
                                    setVatTransferState("has-success");
                                    setVatTransferMessage("Incluir");
                                }
                                else if(e.target.value === "2")
                                {
                                    setVatTransfer(e.target.value);
                                    setVatTransferState("has-success");
                                    setVatTransferMessage("Opcional");
                                }
                                else {
                                    setVatTransfer(e.target.value);
                                    setVatTransferState("has-danger");
                                    setVatTransferMessage("");
                                }
                            }}
                        />
                        {vatTransferState === "has-danger" ? (
                            <label className="error">Este campo es requerido - Valor no permitido.</label>
                        ) : null}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <label>Descripción</label>
                        <Input
                            name="id"
                            type="text"
                            autoComplete="off"
                            value={vatTransferMessage}
                            readOnly
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup className={`has-label ${iepsTransferState}`}>
                        <label>Incluir IEPS Traslado *</label>
                        <Input
                            name="decimals"
                            type="number"
                            id="iepstransfer"
                            autoComplete="off"
                            min={0}
                            max={2}
                            value={iepsTransfer}
                            step={1}
                            onChange={(e) => {
                                if(e.target.value === "0")
                                {
                                    setIEPSTransfer(e.target.value);
                                    setIEPSTransferState("has-success");
                                    setIEPSTransferMessage("No Incluir");
                                }
                                else if(e.target.value === "1")
                                {
                                    setIEPSTransfer(e.target.value);
                                    setIEPSTransferState("has-success");
                                    setIEPSTransferMessage("Incluir");
                                }
                                else if(e.target.value === "2")
                                {
                                    setIEPSTransfer(e.target.value);
                                    setIEPSTransferState("has-success");
                                    setIEPSTransferMessage("Opcional");
                                }
                                else {
                                    setIEPSTransfer(e.target.value);
                                    setIEPSTransferState("has-danger");
                                    setIEPSTransferMessage("");
                                }
                            }}
                        />
                        {iepsTransferState === "has-danger" ? (
                            <label className="error">Este campo es requerido - Valor no permitido.</label>
                        ) : null}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <label>Descripción</label>
                        <Input
                            name="id"
                            type="text"
                            autoComplete="off"
                            value={iepsTransferMessage}
                            readOnly
                        />
                    </FormGroup>
                </Col>
            </Row>
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

export default ModalUpdateKeyProduct;