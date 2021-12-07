import React, { useState, useEffect } from "react";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// core components
import UploadLogo from "components/CustomUpload/UploadLogo.js";

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
    Col,
} from "reactstrap";

function ModalUpdateClient({modalUpdateRecord, setModalUpdateRecord, record, dataCountries, updateAddData, pathLogo, ip, profilePath, autoCloseAlert}) {

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    // register form
    const [updateIdCustomer, setupdateIdCustomer] = React.useState("");
    const [updateFullName, setupdateFullName] = React.useState("");
    const [updateRfc, setupdateRfc] = React.useState("");
    const [updateStreet, setupdateStreet] = React.useState("");
    const [updateNoExterior, setupdateNoExterior] = React.useState("");
    const [updateNoInterior, setupdateNoInterior] = React.useState("");
    const [updateCountry, setupdateCountry] = React.useState("Administrador");
    const [updateCity, setupdateCity] = React.useState("");
    const [updateZipCode, setupdateZipCode] = React.useState("");
    const [updateContact, setupdateContact] = React.useState("");
    const [updateTelephone1, setupdateTelephone1] = React.useState("");
    const [updateTelephone2, setupdateTelephone2] = React.useState("");
    const [updateWebPage, setupdateWebPage] = React.useState("");
    const [updateLogo, setupdateLogo] = React.useState("");
    const [updateStatus, setupdateStatus] = useState(false);
    const [changeImage, setChangeImage] = useState(false)

    //Mandar error en caso de que ya exista el Country/TaxId
    const [updateError, setregisterError] = useState("");

    const [updateFullNameState, setupdateFullNameState] = React.useState("");
    const [updateRfcState, setupdateRfcState] = React.useState("");
    const [updateStreetState, setupdateStreetState] = React.useState("");
    const [updateNoExteriorState, setupdateNoExteriorState] = React.useState("");
    const [updateNoInteriorState, setupdateNoInteriorState] = React.useState("");
    const [updateCountryState, setupdateCountryState] = React.useState("");
    const [updateCityState, setupdateCityState] = React.useState("");
    const [updateZipCodeState, setupdateZipCodeState] = React.useState("");
    const [updateContactState, setupdateContactState] = React.useState("");
    const [updateTelephone1State, setupdateTelephone1State] = React.useState("");
    const [updateTelephone2State, setupdateTelephone2State] = React.useState("");
    const [updateWebPageState, setupdateWebPageState] = React.useState("");
    const [updateLogoState, setupdateLogoState] = React.useState("");
    const [updateStatusState, setupdateStatusState] = useState(false);

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    useEffect(() => {
        setupdateIdCustomer(record.idCus)
        setupdateFullName(record.nombre)
        setupdateRfc(record.taxId)
        setupdateStreet(record.street)
        setupdateNoExterior(record.exteriorNumber)
        setupdateNoInterior(record.interiorNumber)
        setupdateCountry({
            value: record.idCountry,
            label: record.country
        })
        setupdateCity(record.city)
        setupdateZipCode(record.zipCode)
        setupdateContact(record.contact)
        setupdateTelephone1(record.phone1)
        setupdateTelephone2(record.phone2)
        setupdateWebPage(record.webPage)
        if(record.status === "Habilitado")
        {
            setupdateStatus(true);
        }
        else{
            setupdateStatus(false);
        }
        setupdateLogo(record.logo)
    },[record]);

    const handleModalClick = () => {
        setupdateFullNameState("")
        setupdateRfcState("")
        setModalUpdateRecord(!modalUpdateRecord);
    };

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };
    
    const isValidated = () => {
        verifyInputs()
        if (
            updateFullNameState !== "has-danger" &&
            updateRfcState !== "has-danger" &&
            updateCountryState !== "has-danger"
        ) {
          return true;
        } else {
          return false;
        }
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            updateRegister()
        }
        else{
            console.log("no entre")
        }
    };

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var fullname = document.getElementById("fullname").value

        if (!verifyLength(fullname, 1)) {
            setupdateFullNameState("has-danger");
        } else {
            setupdateFullNameState("has-success");
        }
        setupdateFullName(fullname);
        
        var rfc = document.getElementById("rfc").value
        if (!verifyLength(rfc, 1)) {
            setupdateRfcState("has-danger");
        } else {
            setupdateRfcState("has-success");
        }
        setupdateRfc(rfc);
    }

    function updateRegister(){
        const catRegister = {
            pvOptionCRUD: "U",
            piIdCustomer: updateIdCustomer,
            pvIdCountry: updateCountry.value,
            pvName: updateFullName,
            pvTaxId: updateRfc,
            pvStreet: updateStreet,
            pvExtNumber: updateNoExterior,
            pvIntNumber: updateNoInterior,
            pvCity: updateCity,
            pvZipCode: updateZipCode,
            pvContactPerson: updateContact,
            pvPhone1 : updateTelephone1,
            pvPhone2 : updateTelephone2,
            pvWebPage : updateWebPage,
            pvLogo : updateLogo,
            pbStatus : updateStatus,
            pvUser : user,
            pathLogo : pathLogo,
            pvIP : ip,
            pvChangeImage : changeImage
        };
    
        fetch(`${process.env.REACT_APP_API_URI}customers/update-customer/`, {
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
        <Modal isOpen={modalUpdateRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Actualizar registro</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`has-label ${updateFullNameState}`}>
                        <label>Nombre completo *</label>
                        <Input
                            name="name"
                            type="text"
                            value = {updateFullName}
                            id="fullname"
                            onChange={(e) => {
                                if (!verifyLength(e.target.value, 1)) {
                                    setupdateFullNameState("has-danger");
                                } else {
                                    setupdateFullNameState("has-success");
                                }
                                setupdateFullName(e.target.value);
                            }}
                        />
                        {updateFullNameState === "has-danger" ? (
                            <label className="error">
                            Este campo es requerido.
                            </label>
                        ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${updateRfcState}`}>
                        <label>Rfc / Tax Id *</label>
                        <Input
                            name="rfc"
                            type="text"
                            id="rfc"
                            value = {updateRfc}
                            onChange={(e) => {
                                if (!verifyLength(e.target.value, 1)) {
                                    setupdateRfcState("has-danger");
                                } else {
                                    setupdateRfcState("has-success");
                                }
                                setupdateRfc(e.target.value);
                            }}
                        />
                        {updateRfcState === "has-danger" ? (
                            <label className="error">
                            Este campo es requerido.
                            </label>
                        ) : null}
                        </FormGroup>
                        <FormGroup>
                            <label>Calle</label>
                            <Input
                                name="street"
                                value = {updateStreet}
                                type="text"
                                onChange={(e) => {
                                    setupdateStreet(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup >
                            <label>No. Exterior</label>
                            <Input
                                name="noExterior"
                                value = {updateNoExterior}
                                type="text"
                                onChange={(e) => {
                                    setupdateNoExterior(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>No. Interior</label>
                            <Input
                                name="noInterior"
                                value = {updateNoInterior}
                                type="text"
                                onChange={(e) => {
                                    setupdateNoInterior(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">País</Label>
                            <Select
                                name="country"
                                className="react-select"
                                classNamePrefix="react-select"
                                defaultValue = {updateCountry}
                                onChange={(value) => {
                                    setupdateCountry(value)
                                }}
                                options={dataCountries}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Ciudad</label>
                            <Input
                                name="city"
                                type="text"
                                value = {updateCity}
                                autoComplete="off"
                                onChange={(e) => {
                                    setupdateCity(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Código Postal</label>
                            <Input
                                name="zipCode"
                                type="text"
                                value = {updateZipCode}
                                onChange={(e) => {
                                    setupdateZipCode(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Contacto</label>
                            <Input
                                name="contact"
                                type="text"
                                value = {updateContact}
                                autoComplete="off"
                                onChange={(e) => {
                                    setupdateContact(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Teléfono 1</label>
                            <Input
                                name="telephone1"
                                type="text"
                                value = {updateTelephone1}
                                onChange={(e) => {
                                    setupdateTelephone1(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Teléfono 2</label>
                            <Input
                                name="telephone2"
                                type="text"
                                value = {updateTelephone2}
                                onChange={(e) => {
                                    setupdateTelephone2(e.target.value);
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <UploadLogo registerLogo = {updateLogo} setregisterLogo={setupdateLogo} registerCountry = {updateCountry} registerRfc = {updateRfc} logo = {updateLogo} path = {profilePath} setChangeImage = {setChangeImage}/>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <label>Página Web</label>
                            <Input
                                name="webpage"
                                type="text"
                                value = {updateWebPage}
                                onChange={(e) => {
                                    setupdateWebPage(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox" 
                                checked = {updateStatus} 
                                onChange={(e) => {
                                    setupdateStatus(e.target.checked)
                                }}
                            />{' '}
                            Habilitado
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            </Label>
                        </FormGroup>
                    </Col> 
                    <Col className="mt-3" lg="10">
                        <div className="category form-category">
                        * Campos requeridos.
                        </div>
                    </Col>  
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`has-label ${errorState}`}>
                            {errorState === "has-danger" ? (
                                <label className="error">
                                    {errorMessage}
                                </label>
                            ) : null}
                        </FormGroup>
                    </Col>    
                </Row>
            </Form>
            </ModalBody>
            <ModalFooter>
                <div className="center-side">
                <Button className="buttons" color="secondary" onClick={handleModalClick}>
                    Cerrar
                </Button>
                <Button className="buttons" color="primary" onClick={updateClick}>
                    Guardar cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalUpdateClient;