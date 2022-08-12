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

function ModalUpdateCFDIUsesTaxRegimes({abierto, toggleModalUpdateRecord, record, updateAddData, ip, autoCloseAlert}) {
       
    const [idCFDIUse, setIdCDFDIUse] = React.useState("");
    const [CFDIUse, setCDFDIUse] = React.useState("");
    const [idTaxRegimen, setIdTaxRegimen] = React.useState("");
    const [taxRegimen, setTaxRegimen] = React.useState("");
    const [status, setStatus] = React.useState(true);

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setIdCDFDIUse(record.idCFDIUse);
        setCDFDIUse(record.CFDIUseDesc);
        setIdTaxRegimen(record.idTaxRegimen);
        setTaxRegimen(record.taxRegimenDesc);
        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else{
            setStatus(false);
        }
    },[record]);

    const handleModalClick = () => {
        setError("")
        setErrorState("")
        setErrorMessage("")
        toggleModalUpdateRecord(!abierto);
    };


    const updateRegister = () => {
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            pSpCatalog: "spTax_Regimens_CFDI_Uses_CRUD_Records",
            pvIdTaxRegimen: idTaxRegimen,
            pvIdCFDIUse: idCFDIUse,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };
        console.log(catRegister)

    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/update-tax-regimens-cfdi-uses`, {
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
        <h5 className="modal-title">Editar Registro</h5>
        </div>
        <ModalBody>
        <Form id="RegisterValidation">
            <FormGroup>
                <label>Régimen Fiscal</label>
                <Input
                    name="taxRegimen"
                    type="text"
                    value={taxRegimen} 
                    readOnly
                />
            </FormGroup>
            <FormGroup>
                <label>Uso CFDI</label>
                <Input
                    name="cfdiuse"
                    type="text"
                    value={CFDIUse} 
                    readOnly
                />
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
            <Button color="primary" onClick={updateRegister}>
                Guardar cambios
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
}


export default ModalUpdateCFDIUsesTaxRegimes;