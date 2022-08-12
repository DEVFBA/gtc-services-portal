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

function ModalUpdateMunicipalities({abierto, toggleModalUpdateRecord, record, updateAddData, ip, autoCloseAlert, dataCountries, dataStates}) {
        // update form
    const [idMunicipality, setIdMunicipality] = React.useState("");
    const [municipalityDesc, setMunicipalityDesc] = React.useState("");
    const [country, setCountry] = React.useState({});
    const [state, setState] = React.useState({});
    const [status, setStatus] = React.useState(true);
    
    const [municipalityDescState, setMunicipalityDescState] = React.useState("");
    const [countryState, setCountryState] = React.useState("");
    const [estadoState, setEstadoState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setIdMunicipality(record.idMunicipality);
        setMunicipalityDesc(record.municipalityDesc)
        setCountry({
            value: record.idCountry,
            label: record.idCountry + " - " + record.countryDesc
        })
        setState({
            value: record.idState,
            label: record.idState + " - " + record.stateDesc
        })
        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else{
            setStatus(false);
        }
    },[record]);

    const handleModalClick = () => {
        setMunicipalityDescState("")
        setCountryState("")
        setEstadoState("")
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
        var municipalityD = document.getElementById("municipalitydesc").value

        if (!verifyLength(municipalityD, 1)) {
            setMunicipalityDescState("has-danger");
        } else {
            setMunicipalityDescState("has-success");
        }
        setMunicipalityDesc(municipalityD);
    }

    const isValidated = () => {
        
        verifyInputs()
        if (
            municipalityDescState !== "has-danger"
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
            pSpCatalog: "spSAT_Cat_Municipalities_CRUD_Records",
            pvIdCountry: country.value,
            pvIdState: state.value,
            pvIdMunicipality: idMunicipality,
            pvDescription: municipalityDesc,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };

        console.log(catRegister)
    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/update-sat-municipalities`, {
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
              <label>Id</label>
              <Input
                name="id"
                type="text"
                value={idMunicipality} 
                readOnly
              />
            </FormGroup>
            <FormGroup className={`has-label ${municipalityDescState}`}>
                <label>Descripción *</label>
                <Input
                  name="municipalitydesc"
                  type="text"
                  id = "municipalitydesc"
                  autoComplete="off"
                  value={municipalityDesc}
                  onChange={(e) => {
                    if (!verifyLength(e.target.value, 1)) {
                        setMunicipalityDescState("has-danger");
                    } else {
                        setMunicipalityDescState("has-success");
                    }
                    setMunicipalityDesc(e.target.value);
                  }}
                />
                {municipalityDescState === "has-danger" ? (
                    <label className="error">Este campo es requerido.</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${countryState}`}>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <label>País *</label>
                  <Select 
                    className="react-select"
                    classNamePrefix="react-select"
                    defaultValue = {country}
                    options = {dataCountries}
                    onChange={(e) => {
                      setCountry(e);
                      setCountryState("has-success");
                    }}
                  />
                  {countryState === "has-danger" ? (
                    <label className="error">Este campo es requerido.</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${estadoState}`}>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <label>Estado *</label>
                  <Select 
                    className="react-select"
                    classNamePrefix="react-select"
                    defaultValue = {state}
                    options = {dataStates}
                    onChange={(e) => {
                      setState(e);
                      setEstadoState("has-success");
                    }}
                  />
                  {estadoState === "has-danger" ? (
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

export default ModalUpdateMunicipalities;