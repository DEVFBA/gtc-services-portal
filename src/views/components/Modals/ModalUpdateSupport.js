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

function ModalUpdateSupport({abierto, toggleModalUpdateRecord, record, updateAddData, ip, autoCloseAlert}) {
    const [idCustomer, setIdCustomer] = React.useState("");
    const [idApplication, setIdApplication] = React.useState("");
    const [settingsName, setSettingsName] = React.useState("");
    const [settingsKey, setSettingsKey] = React.useState("");
    const [settingsValue, setSettingsValue] = React.useState("");
    const [use, setUse] = React.useState("");
    const [tooltip, setTooltip] = React.useState("");
   
    const [settingsValueState, setSettingsValueState] = React.useState("");

    const [error, setError] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [errorState, setErrorState] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
      console.log(record)
      setIdCustomer(record.idCustomer);
      setIdApplication(record.idApplication)
      setSettingsName(record.settingsName)
      setSettingsValue(record.settingsValue)
      setSettingsKey(record.settingsKey)
      setUse(record.use)
      setTooltip(record.tooltip)
    },[record]);

    const handleModalClick = () => {
        setErrorState("")
        setError("")
        setSettingsValueState("")
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
      var settingsvalue = document.getElementById("settingsvalue").value

      if (!verifyLength(settingsvalue, 1)) {
          setSettingsValueState("has-danger");
      } else {
        setSettingsValueState("has-success");
      }
      setSettingsValue(settingsvalue);
    }

    const isValidated = () => {

      verifyInputs()
      if (settingsValueState !== "has-danger") 
      {
        return true;
      }
      else{
        return false;
      }
    };

    const updateClick = () => {
      if(isValidated()===true)
      {
          updateRegister()
      }
    };

    function updateRegister(){
      const catRegister = {
          pvOptionCRUD: "U",
          piIdCustomer: idCustomer,
          piIdApplication: idApplication,
          pvSettingsKey: settingsKey,
          pvSettingsValue: settingsValue,
          pvUser: user,
          pvIP: ip
      };
      
      fetch(`http://129.159.99.152/develop-api/api/applications-settings/update-settings/`, {
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
              if(data[0].Code_Type === "Warning")
              {
                  setErrorMessage(data[0].Code_Message_User)
                  setErrorState("has-danger")
                  autoCloseAlert(data[0].Code_Message_User)
              }
              else if(data[0].Code_Type === "Error")
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
                <label>Nombre de la Configuración</label>
                <Input
                  name="idApp"
                  type="text"
                  value={settingsName} 
                  readOnly
                />
            </FormGroup>
            <FormGroup className={`has-label ${settingsValueState}`}>
              <label>Valor de la Configuración *</label>
              <Input
                id="settingsvalue"
                name="settingsvalue"
                type="text"
                value={settingsValue}
                autoComplete="off"
                onChange={(e) => {
                  if (!verifyLength(e.target.value, 1)) {
                    setSettingsValueState("has-danger");
                  } else {
                    setSettingsValueState("has-success");
                  }
                  setSettingsValue(e.target.value);
                }}
              />
              {settingsValueState === "has-danger" ? (
                <label className="error">Este campo es requerido.</label>
              ) : null}
            </FormGroup>
            <FormGroup>
                <label>Tooltip</label>
                <Input
                  name="tooltip"
                  type="text"
                  value={tooltip} 
                  readOnly
                />
            </FormGroup>
            <FormGroup className={`has-label ${errorState}`}>
              {errorState === "has-danger" ? (
                  <label className="error">
                      {errorMessage}
                  </label>
              ) : null}
            </FormGroup>
            <div className="category form-category">
              * Campos requeridos
            </div>
          </Form>
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

export default ModalUpdateSupport;