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

function ModalAddCFDIUsesTaxRegimens({modalAddRecord, setModalAddRecord, updateAddData, ip, autoCloseAlert, dataCFDIUses, dataTaxRegimens}) {

    const [idCFDIUse, setIdCDFDIUse] = React.useState("");
    const [idTaxRegimen, setIdTaxRegimen] = React.useState("");
    const [status, setStatus] = React.useState(true);
    
    const [idCFDIUseState, setIdCDFDIUseState] = React.useState("");
    const [idTaxRegimenState, setIdTaxRegimenState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    
    const handleModalClick = () => {
        setIdCDFDIUse("")
        setIdTaxRegimen("")
        setStatus(true)
        setIdCDFDIUseState("")
        setIdTaxRegimenState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        setModalAddRecord(!modalAddRecord);
    };

    const isValidated = () => {
        if (
            idCFDIUseState === "has-success" &&
            idTaxRegimenState === "has-success"
        ) {
          return true;
        } else {
            if (idCFDIUseState !== "has-success") {
                setIdCDFDIUseState("has-danger");
            }
            if (idTaxRegimenState !== "has-success") {
                setIdTaxRegimenState("has-danger");
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
            pSpCatalog: "spTax_Regimens_CFDI_Uses_CRUD_Records",
            pvIdTaxRegimen: idTaxRegimen,
            pvIdCFDIUse: idCFDIUse,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };
    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/create-tax-regimens-cfdi-uses`, {
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
            <FormGroup className={`has-label ${idCFDIUseState}`}>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <label>Uso de CFDI *</label>
                  <Select 
                    className="react-select"
                    classNamePrefix="react-select"
                    placeholder = "Selecciona un Uso de CFDI"
                    options = {dataCFDIUses}
                    onChange={(e) => {
                      setIdCDFDIUse(e.value);
                      setIdCDFDIUseState("has-success");
                    }}
                  />
                  {idCFDIUseState === "has-danger" ? (
                    <label className="error">Este campo es requerido.</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${idTaxRegimenState}`}>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <label>Régimen Fiscal *</label>
                  <Select 
                    className="react-select"
                    classNamePrefix="react-select"
                    placeholder = "Selecciona un Régimen Fiscal"
                    options = {dataTaxRegimens}
                    onChange={(e) => {
                      setIdTaxRegimen(e.value);
                      setIdTaxRegimenState("has-success");
                    }}
                  />
                  {idTaxRegimenState === "has-danger" ? (
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

export default ModalAddCFDIUsesTaxRegimens;