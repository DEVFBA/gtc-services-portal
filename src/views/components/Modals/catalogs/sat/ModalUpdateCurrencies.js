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

function ModalUpdateCurrencies({abierto, toggleModalUpdateRecord, record, updateAddData, ip, autoCloseAlert}) {
        // update form
    const [id, setId] = React.useState("Hola");
    const [shortDescription, setShortDescription] = React.useState("");
    const [longDescription, setLongDescription] = React.useState("");
    const [decimals, setDecimals] = React.useState("");
    const [variationPercentage, setVariationPercentage] = React.useState("");
    const [status, setStatus] = React.useState(true);

    const [noDecimals, setNoDecimals] = React.useState(new RegExp('[.]'));
    
    const [shortDescriptionState, setShortDescriptionState] = React.useState("");
    const [longDescriptionState, setLongDescriptionState] = React.useState("");
    const [decimalsState, setDecimalsState] = React.useState("");
    const [variationPercentageState, setVariationPercentageState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setId(record.idR);
        setShortDescription(record.shortDescription);
        setLongDescription(record.longDescription);
        setDecimals(record.decimals);
        setVariationPercentage(record.variationPercentage);
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
        setDecimalsState();
        setVariationPercentageState();
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

    function containsDot(number)
    {
        console.log(number.toString())
        if(number.toString().includes(".") === true)
        {
            console.log("SI ENTRE")
            return true
        }
        else {
            return false
        }
    }

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var shortDesc = document.getElementById("shortdescription").value
        var longDesc = document.getElementById("longdescription").value
        var decimalsI = document.getElementById("decimals").value
        var variationPI = document.getElementById("variationpercentage").value

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

        if(decimalsI === "" || decimalsI < 0)
        {
            setDecimalsState("has-danger");
        }
        else {
            setDecimalsState("has-success");
        }
        setDecimals(decimalsI);

        if(variationPI === "" || variationPI < 0)
        {
            setVariationPercentageState("has-danger");
        }
        else {
            setVariationPercentageState("has-success");
        }
        setVariationPercentage(variationPI);
    }

    const isValidated = () => {
        
        verifyInputs()
        if (
            shortDescriptionState !== "has-danger" &&
            longDescriptionState !== "has-danger" &&
            decimalsState !== "has-danger" &&
            variationPercentageState !== "has-danger"
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
            pSpCatalog: "spSAT_Cat_Currencies_CRUD_Records",
            pvOptionCRUD: "U",
            pvIdCatalog: id,
            pvShortDesc: shortDescription,
            pvLongDesc: longDescription,
            piDecimals: decimals,
            pfVariationPercent: variationPercentage,
            pbStatus: status,
            pvUser: user,
            pvIP: ip
        };

        console.log(catRegister)
    
        fetch(`${process.env.REACT_APP_API_URI}cat-catalogs/update-sat-currencies`, {
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
                value={id} 
                readOnly
              />
            </FormGroup>
            <FormGroup className={`has-label ${shortDescriptionState}`}>
                <label>Descripción corta *</label>
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
                <label>Descripción larga *</label>
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
            <FormGroup className={`has-label ${decimalsState}`}>
                <label>Decimales *</label>
                <Input
                    name="decimals"
                    type="number"
                    id = "decimals"
                    onkeydown = "return event.keyCode !== 190"
                    value={decimals}
                    autoComplete="off"
                    onChange={(e) => {
                        //console.log(noDecimals.test(e.target.value))
                        console.log(containsDot(e.target.value))
                        if(e.target.value!=="" && containsDot(e.target.value)!==true)
                        {
                            setDecimals(e.target.value)
                            setDecimalsState("has-success")
                        }
                        else {
                            setDecimals(e.target.value)
                            setDecimalsState("has-danger")
                        }
                    }}
                />
                {decimalsState === "has-danger" ? (
                    <label className="error">Este campo es requerido - No se permiten números decimales</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${variationPercentageState}`}>
                <label>Variación *</label>
                <Input
                    name="variationpercentage"
                    type="number"
                    id = "variationpercentage"
                    value={variationPercentage}
                    autoComplete="off"
                    onChange={(e) => {
                        if(e.target.value!=="")
                        {
                            setVariationPercentage(e.target.value)
                            setVariationPercentageState("has-success")
                        }
                        else {
                            setVariationPercentage(e.target.value)
                            setVariationPercentageState("has-danger")
                        }
                    }}
                />
                {variationPercentageState === "has-danger" ? (
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

export default ModalUpdateCurrencies;