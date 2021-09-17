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

const opciones = [
    { value: "Administrador", label: " Administrador "},
    { value: "Soporte", label: " Soporte " },
    { value: "Cliente", label: " Cliente " },
    { value: "Servicio", label: " Servicio " }
]

function ModalUpdateClient({modalUpdateRecord, setModalUpdateRecord, updateTable, setUpdateTable, record}) {
    // register form
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
    const [updateLogo, setupdateLogo] = React.useState(null);
    const [updateStatus, setupdateStatus] = useState(false);

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

    //Mandar error en caso de que ya exista el Country/TaxId
    const [updateErrorState, setupdateErrorState] = useState("");

    useEffect(() => {
        //se tienen que jalar los datos de la base de datos...
        //los datos los guardamos en las variables para posteriormente usarlos como default en los inputs
        console.log(record)
    },[record]);

    const handleModalClick = () => {
        setModalUpdateRecord(!modalUpdateRecord);
    };

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    // function that verifies if two strings are equal
    const compare = (string1, string2) => {
        if (string1 === string2) {
        return true;
        }
        return false;
    };
    
    const isValidated = () => {
        if (
            registerFullNameState === "has-success" &&
            registerRfcState === "has-success"
        ) {
          return true;
        } else {
          if (registerFullNameState !== "has-success") {
            setregisterFullNameState("has-danger");
          }
          if (registerRfcState !== "has-success") {
            setregisterRfcState("has-danger");
          }
          return false;
        }
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            console.log(updateLogo);
            //haremos el fetch a la base de datos para agregar el registro
            //Para actualizar la tabla en componente principal
            setUpdateTable(updateTable+1)
            //si el country/taxid ya existe mandar mensaje de error al modal 
            setupdateErrorState("has-danger")
            //Cerramos el modal
            //handleModalClick()
        }
        else{
            console.log("no entre")
        }
    };

    //Para buscar el país elegido y ponerlo en el select
    function isCountry(country) {
        return country.value === updateCountry;
    }

    return (
        <Modal isOpen={modalUpdateRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Update Client {record.name}</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`has-label ${updateFullNameState}`}>
                        <label>Full Name *</label>
                        <Input
                            name="name"
                            type="text"
                            placeholder = {updateFullName}
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
                            This field is required.
                            </label>
                        ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${updateRfcState}`}>
                        <label>Rfc / Tax Id *</label>
                        <Input
                            name="rfc"
                            type="text"
                            placeholder = {updateRfc}
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
                            This field is required.
                            </label>
                        ) : null}
                        </FormGroup>
                        <FormGroup>
                            <label>Street</label>
                            <Input
                                name="street"
                                placeholder = {updateStreet}
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
                                placeholder = {updateNoExterior}
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
                                placeholder = {updateNoInterior}
                                type="text"
                                onChange={(e) => {
                                    setupdateNoInterior(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Country</Label>
                            <Select
                                name="country"
                                className="react-select"
                                classNamePrefix="react-select"
                                defaultValue={opciones.find(isCountry)}
                                onChange={(value) => {
                                    setupdateCountry(value)
                                    console.log(registerCountry)
                                }}
                                options={opciones}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>City</label>
                            <Input
                                name="city"
                                type="text"
                                placeholder = {updateCity}
                                autoComplete="off"
                                onChange={(e) => {
                                    setupdateCity(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Zip Code</label>
                            <Input
                                name="zipCode"
                                type="text"
                                placeholder = {updateZipCode}
                                onChange={(e) => {
                                    setupdateZipCode(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Contact</label>
                            <Input
                                name="contact"
                                type="text"
                                placeholder = {updateContact}
                                autoComplete="off"
                                onChange={(e) => {
                                    setupdateContact(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telephone 1</label>
                            <Input
                                name="telephone1"
                                type="text"
                                placeholder = {updateTelephone1}
                                onChange={(e) => {
                                    setupdateTelephone1(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telephone 2</label>
                            <Input
                                name="telephone2"
                                type="text"
                                placeholder = {updateTelephone2}
                                onChange={(e) => {
                                    setupdateTelephone2(e.target.value);
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <UploadLogo registerLogo = {updateLogo} setregisterLogo={setupdateLogo} registerCountry = {updateCountry} registerRfc = {updateRfc}/>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <label>Web Page</label>
                            <Input
                                name="webpage"
                                type="text"
                                placeholder = {updateWebPage}
                                onChange={(e) => {
                                    setupdateWebPage(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox" 
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
                        * Required fields
                        </div>
                    </Col>  
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`has-label ${updateErrorState}`}>
                            {updateErrorState === "has-danger" ? (
                                <label className="error">
                                ERROR. El Tax Id / Country ya existe.
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
                    Close
                </Button>
                <Button className="buttons" color="primary" onClick={updateClick}>
                    Save changes
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalUpdateClient;