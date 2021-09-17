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

function ModalAddClient({modalAddRecord, setModalAddRecord, updateTable, setUpdateTable}) {
    // register form
    const [registerFullName, setregisterFullName] = React.useState("");
    const [registerRfc, setregisterRfc] = React.useState("");
    const [registerStreet, setregisterStreet] = React.useState("");
    const [registerNoExterior, setregisterNoExterior] = React.useState("");
    const [registerNoInterior, setregisterNoInterior] = React.useState("");
    const [registerCountry, setregisterCountry] = React.useState("Administrador");
    const [registerCity, setregisterCity] = React.useState("");
    const [registerZipCode, setregisterZipCode] = React.useState("");
    const [registerContact, setregisterContact] = React.useState("");
    const [registerTelephone1, setregisterTelephone1] = React.useState("");
    const [registerTelephone2, setregisterTelephone2] = React.useState("");
    const [registerWebPage, setregisterWebPage] = React.useState("");
    const [registerLogo, setregisterLogo] = React.useState(null);
    const [registerStatus, setregisterStatus] = useState(false);

    //Mandar error en caso de que ya exista el Country/TaxId
    const [registerError, setregisterError] = useState("");

    const [registerFullNameState, setregisterFullNameState] = React.useState("");
    const [registerRfcState, setregisterRfcState] = React.useState("");
    const [registerStreetState, setregisterStreetState] = React.useState("");
    const [registerNoExteriorState, setregisterNoExteriorState] = React.useState("");
    const [registerNoInteriorState, setregisterNoInteriorState] = React.useState("");
    const [registerCountryState, setregisterCountryState] = React.useState("");
    const [registerCityState, setregisterCityState] = React.useState("");
    const [registerZipCodeState, setregisterZipCodeState] = React.useState("");
    const [registerContactState, setregisterContactState] = React.useState("");
    const [registerTelephone1State, setregisterTelephone1State] = React.useState("");
    const [registerTelephone2State, setregisterTelephone2State] = React.useState("");
    const [registerWebPageState, setregisterWebPageState] = React.useState("");
    const [registerLogoState, setregisterLogoState] = React.useState("");
    const [registerStatusState, setregisterStatusState] = useState(false);

    //Mandar error en caso de que ya exista el Country/TaxId
    const [registerErrorState, setregisterErrorState] = useState("");

    const handleModalClick = () => {
        setModalAddRecord(!modalAddRecord);
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

    const registerClick = () => {
        if(isValidated()===true)
        {
            console.log(registerLogo);
            //haremos el fetch a la base de datos para agregar el registro
            //Para actualizar la tabla en componente principal
            setUpdateTable(updateTable+1)
            //si el country/taxid ya existe mandar mensaje de error al modal 
            setregisterErrorState("has-danger")
            //Cerramos el modal
            //handleModalClick()
        }
        else{
            console.log("no entre")
        }
    };

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg">
            <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Add new record</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`has-label ${registerFullNameState}`}>
                        <label>Full Name *</label>
                        <Input
                            name="name"
                            type="text"
                            onChange={(e) => {
                                if (!verifyLength(e.target.value, 1)) {
                                    setregisterFullNameState("has-danger");
                                } else {
                                    setregisterFullNameState("has-success");
                                }
                                setregisterFullName(e.target.value);
                            }}
                        />
                        {registerFullNameState === "has-danger" ? (
                            <label className="error">
                            This field is required.
                            </label>
                        ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${registerRfcState}`}>
                        <label>Rfc / Tax Id *</label>
                        <Input
                            name="rfc"
                            type="text"
                            onChange={(e) => {
                                if (!verifyLength(e.target.value, 1)) {
                                    setregisterRfcState("has-danger");
                                } else {
                                    setregisterRfcState("has-success");
                                }
                                setregisterRfc(e.target.value);
                            }}
                        />
                        {registerRfcState === "has-danger" ? (
                            <label className="error">
                            This field is required.
                            </label>
                        ) : null}
                        </FormGroup>
                        <FormGroup>
                            <label>Street</label>
                            <Input
                                name="street"
                                type="text"
                                onChange={(e) => {
                                    setregisterStreet(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup >
                            <label>No. Exterior</label>
                            <Input
                                name="noExterior"
                                type="text"
                                onChange={(e) => {
                                    setregisterNoExterior(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>No. Interior</label>
                            <Input
                                name="noInterior"
                                type="text"
                                onChange={(e) => {
                                    setregisterNoInterior(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Country</Label>
                            <Select
                                name="country"
                                className="react-select"
                                classNamePrefix="react-select"
                                defaultValue={opciones[0]}
                                onChange={(value) => {
                                    setregisterCountry(value)
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
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterCity(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Zip Code</label>
                            <Input
                                name="zipCode"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterZipCode(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Contact</label>
                            <Input
                                name="contact"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterContact(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telephone 1</label>
                            <Input
                                name="telephone1"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterTelephone1(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telephone 2</label>
                            <Input
                                name="telephone2"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterTelephone2(e.target.value);
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <UploadLogo registerLogo = {registerLogo} setregisterLogo={setregisterLogo} registerCountry = {registerCountry} registerRfc = {registerRfc}/>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <label>Web Page</label>
                            <Input
                                name="webpage"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    setregisterWebPage(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox" 
                                onChange={(e) => {
                                    setregisterStatus(e.target.checked)
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
                        <FormGroup className={`has-label ${registerErrorState}`}>
                            {registerErrorState === "has-danger" ? (
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
                <Button className="buttons" color="primary" onClick={registerClick}>
                    Save changes
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddClient;