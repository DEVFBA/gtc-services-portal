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

function ModalAddKeyProduct({modalAddRecord, setModalAddRecord, updateAddDataKeyProduct, ip, setKeyProductE, toggleModalAddRecord, setMensajeAdd}) {
        // update form
    const [id, setId] = React.useState("Hola");
    const [shortDescription, setShortDescription] = React.useState("");
    const [longDescription, setLongDescription] = React.useState("");
    const [vatTransfer, setVatTransfer] = React.useState("0");
    const [vatTransferMessage, setVatTransferMessage] = React.useState("No Incluir");
    const [iepsTransfer, setIEPSTransfer] = React.useState("0");
    const [iepsTransferMessage, setIEPSTransferMessage] = React.useState("No Incluir");
    const [status, setStatus] = React.useState(true);
    
    const [idState, setIdState] = React.useState("");
    const [shortDescriptionState, setShortDescriptionState] = React.useState("");
    const [longDescriptionState, setLongDescriptionState] = React.useState("");
    const [vatTransferState, setVatTransferState] = React.useState("has-success");
    const [iepsTransferState, setIEPSTransferState] = React.useState("has-success");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const handleModalClick = () => {
        setId("")
        setShortDescription("")
        setLongDescription("")
        setVatTransfer("0")
        setIEPSTransfer("0")
        setStatus(true)
        setIdState("")
        setShortDescriptionState("")
        setLongDescriptionState("")
        setVatTransferState("has-success")
        setIEPSTransferState("has-success")
        setError("")
        setErrorState("")
        setErrorMessage("")
        setModalAddRecord(!modalAddRecord);
        toggleModalAddRecord()
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
            vatTransferState === "has-success" &&
            iepsTransferState === "has-success"
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
            if (vatTransferState !== "has-success") {
                setVatTransferState("has-danger");
            }
            if (iepsTransferState !== "has-success") {
                setIEPSTransferState("has-danger");
            }
            return false;
        }
    };

    const registerClick = () => {
        if(isValidated()===true)
        {
            //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
            const catRegister = {
                pSpCatalog: "spSAT_Cat_Product_Service_Codes_CRUD_Records",
                pvOptionCRUD: "C",
                pvIdCatalog: id,
                pvShortDesc: shortDescription,
                pvLongDesc: longDescription,
                piVATTransfer: vatTransfer,    
                piIEPSTransfer: iepsTransfer,
                pbStatus: status,
                pvUser: user,
                pvIP: ip
            };

            console.log(catRegister)
        
            fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/create-sat-key-product`, {
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
                    }
                    if(data[0].Code_Type === "Warning")
                    {
                        setErrorMessage(data[0].Code_Message_User)
                        setErrorState("has-danger")
                    }
                    else{
                        setErrorState("has-success");
                        //Para actualizar los datos del select en modal principal
                        updateAddDataKeyProduct();
                        //Para elegir en el modal principal la clave producto elegida
                        getKeyProduct(id);
                        //Cerramos el modal
                        handleModalClick()
                        setMensajeAdd("Clave Producto / Servicio creado con éxito.")
                        toggleModalAddRecord()
                    }
                }
            });
        }
        else{
            console.log("no entre")
        }
    };

    function getKeyProduct(id){

        var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/get-key-product/${id}`);
        fetch(url, {
          method: "GET",
          headers: {
              "access-token": token,
              "Content-Type": "application/json",
          }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            setKeyProductE({
                value: data[0].Id_Catalog, label: data[0].Short_Desc
            })
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de la clave producto servicio" + err);
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
            <Row>
                <Col>
                    <FormGroup className={`has-label ${vatTransferState}`}>
                        <label>Incluir IVA Traslado *</label>
                        <Input
                            name="decimals"
                            type="number"
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

export default ModalAddKeyProduct;