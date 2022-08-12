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
    Col,
} from "reactstrap";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

function ModalUpdateCustomerBillTos({modalUpdateRecord, setModalUpdateRecord, ip, autoCloseAlert, updateAddData, dataEntityTypes, foreignTaxIdParameter, dataZipCodes, dataCountries, dataTaxRegimes, dataCFDIUses, record}) {
        // register form
    const [idCustomer, setIdCustomer] = React.useState("");
    const [idBillTo, setIdBillTo] = React.useState("");
    const [customer, setCustomer] = React.useState("");
    const [idEntityType, setIdEntityType] = useState({})
    const [entityType, setEntityType] = useState({})
    const [foreign, setForeign] = useState(false)
    const [taxId, setTaxId] = useState("")
    const [name, setName] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [zipCodeDesc, setZipCodeDesc] = useState("")
    const [country, setCountry] = useState({})
    const [foreignTaxId, setForeignTaxId] = useState("")
    const [taxRegimen, setTaxRegimen] = useState({})
    const [CFDIUse, setCFDIUse] = useState({})
    const [status, setStatus] = useState(true)

    const [nameState, setNameState] = useState("")
    const [zipCodeState, setZipCodeState] = useState("")
    const [countryState, setCountryState] = useState("")
    const [foreignTaxIdState, setForeignTaxIdState] = useState("")
    const [taxRegimenState, setTaxRegimenState] = useState("")
    const [CFDIUseState, setCFDIUseState] = useState("")

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    //Para guardar el rol loggeado
    const role = localStorage.getItem("Id_Role");

    useEffect(() => {
        setIdBillTo(record.idBillTo);
        setIdCustomer(record.idCustomer);
        setCustomer(record.customer);
        setIdEntityType(record.idEntityType)
        setEntityType(record.entityType);
        if(record.foreign === "Si")
        {
            setForeign(true);
        }
        else {
            setForeign(false);
        }
        setTaxId(record.taxId);
        setName(record.name);
        setNameState("has-success")

        setZipCode(record.zipCode);
        var value = dataZipCodes.find(element => element.Zip_Code === record.zipCode);
        if(value === undefined)
        {
            setZipCodeDesc("Colonia No Existente.");
        }
        else {
            setZipCodeDesc(value.Description);
        }
        setCountry({
            value: record.idCountry, label: record.idCountry + " - " + record.country
        })
        setForeignTaxId(record.foreignTaxId)
        setTaxRegimen({
            value: record.idTaxRegimen, label: record.idTaxRegimen + " - " + record.taxRegimen
        })
        setCFDIUse({
            value: record.idCFDIUse, label: record.idCFDIUse + " - " + record.CFDIUse
        })

        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else {
            setStatus(false);
        }
    },[record]);

    useEffect(() => {
        if(foreign === true)
        {
            setTaxId(foreignTaxIdParameter)
            setForeignTaxIdState("")
            for(var i=0; i<dataTaxRegimes.length; i++)
            {
                if(dataTaxRegimes[i].value === "616")
                {
                    setTaxRegimen(dataTaxRegimes[i]);
                    setTaxRegimenState("has-success")
                }
            }

            for(var i=0; i<dataCFDIUses.length; i++)
            {
                if(dataCFDIUses[i].value === "S01")
                {
                    setCFDIUse(dataCFDIUses[i]);
                    setCFDIUseState("has-success")
                }
            }
        }
        else {
            setTaxId("")
            setTaxRegimen("")
            setTaxRegimenState("")
            setCFDIUse("")
            setCFDIUseState("")
            setForeignTaxIdState("has-success")
        }
    },[foreign]);

    useEffect(() => {
        if(zipCode !== undefined)
        {   
            if(zipCode.length === 5)
            {
                var value = dataZipCodes.find(element => element.Zip_Code === zipCode);
                if(value === undefined)
                {
                    setZipCodeDesc("Colonia No Existente.")
                    setZipCodeState("has-danger")
                }
                else {
                    setZipCodeDesc(value.Description)
                    setZipCodeState("has-success")
                }
            }
        }
    },[zipCode]);

    const handleModalClick = () => {
        setNameState("")
        setZipCodeState("")
        setCountryState("")
        setTaxRegimenState("")
        setCFDIUseState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        setModalUpdateRecord(!modalUpdateRecord);
    };

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var name = document.getElementById("name").value
        console.log(name)
        var zipcode = document.getElementById("zipcode").value
        var foreigntaxid = document.getElementById("foreigntaxid").value

        if (!verifyLength(name, 1)) {
            setNameState("has-danger");
        } else {
            console.log("SI ENTRE ")
            setNameState("has-success");
        }
        setName(name);

        if (!verifyLength(zipcode, 5)) {
            setZipCodeState("has-danger");
        } else {
            setZipCodeState("has-success");
        }
        setZipCode(zipcode);

        if(foreign === true)
        {
            if (!verifyLength(foreigntaxid, 1)) {
                setForeignTaxIdState("has-danger");
            } else {
                setForeignTaxIdState("has-success");
            }
        }
        else {
            setForeignTaxIdState("has-success");
        }
        setForeignTaxId(foreigntaxid);
    }
    
    const isValidated = () => {
        verifyInputs()
        console.log(nameState)
        if (
            nameState === "has-success" &&
            zipCodeState === "has-success" &&
            foreignTaxIdState === "has-success"
        ) 
        {
            return true;
        } else {
            if (nameState !== "has-success") {
                setNameState("has-danger");
            }
            if (zipCodeState !== "has-success") {
                setZipCodeState("has-danger");
            }
            if (foreignTaxIdState !== "has-success") {
                setForeignTaxIdState("has-danger");
            }
            return false;
        }
    };

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    const updateClick = () => {
        if(isValidated()===true)
        {
            updateRegister()
        }
        else {
            console.log("no entre")
        }
    };

    function updateRegister(){
        const catRegister = {
            piIdBillTo: idBillTo,
            pvIdEntityType: idEntityType,
            pvIdCountry: country.value,
            pvIdCFDIUse: CFDIUse.value,
            piIdCustomer: idCustomer,
            pvIdTaxRegimen: taxRegimen.value,
            pvZipCodes: zipCode,
            pvTaxId: taxId,
            pvName: name,
            pbForeign: foreign,
            pvForeignTaxId: foreignTaxId,
            pbStatus: status,
            pvUser: user,
            pvIP: ip,
        };

        console.log(catRegister)

        fetch(`${process.env.REACT_APP_API_URI}customer-bill-tos/update/`, {
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
        <Modal isOpen={modalUpdateRecord} toggle={handleModalClick} size="lg" aria-labelledby="contained-modal-title-vcenter">
           <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Actualizar Cliente - Receptor Factura</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <Label for="exampleSelect">Cliente</Label>
                            <Input
                                name="customer"
                                type="text"
                                autoComplete="off"
                                value={customer}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Tipo de Entidad</Label>
                            <Input
                                name="entitytype"
                                type="text"
                                autoComplete="off"
                                value={entityType}
                                readOnly
                            />
                        </FormGroup>
                        <Label for="exampleSelect">Extranjero</Label>
                        <FormGroup check>
                            <Label check>
                            <Input 
                                type="checkbox" 
                                checked = {foreign}
                                onChange={(e) => {
                                    setForeign(e.target.checked)
                                }}
                            />{' '}
                            Habilitado
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <label>RFC</label>
                            <Input
                                name="taxid"
                                type="text"
                                autoComplete="off"
                                value={taxId}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`has-label ${nameState}`}>
                            <label>Nombre / Razón Social *</label>
                            <Input
                                name="name"
                                id = "name"
                                type="text"
                                autoComplete="off"
                                value={name}
                                maxLength={254}
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setNameState("has-danger");
                                    } else {
                                        setNameState("has-success");
                                    }
                                    setName(e.target.value);
                                }}
                            />
                            {nameState === "has-danger" ? (
                                <label className="error">
                                Este campo es requerido.
                                </label>
                            ) : null}
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup className={`has-label ${zipCodeState}`}>
                                    <label>Código Postal *</label>
                                    <Input
                                        name="zipcode"
                                        type="text"
                                        id="zipcode"
                                        maxLength={5}
                                        value={zipCode}
                                        autoComplete="off"
                                        onChange={(e) => {
                                            if (!verifyLength(e.target.value, 5)) {
                                                setZipCodeState("has-danger");
                                            } else {
                                                setZipCodeState("has-success");
                                            }
                                            setZipCode(e.target.value);
                                        }}
                                    />
                                    {zipCodeState === "has-danger" ? (
                                        <label className="error">
                                            Este campo es requerido / La longitud debe ser de 5 / Colonia No Existente.
                                        </label>
                                    ) : null}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>Colonia</label>
                                    <Input
                                        name="taxid"
                                        type="text"
                                        autoComplete="off"
                                        value = {zipCodeDesc}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup className={`form-group ${countryState}`}>
                            <Label for="exampleSelect">País * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un País"
                                classNamePrefix="react-select"
                                value={country}
                                onChange={(value) => {
                                    setCountry(value)
                                    setCountryState("has-success");
                                }}
                                options={dataCountries}
                            />
                            {countryState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un País</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${foreignTaxIdState}`}>
                            <label>Id Tributario</label>
                            <Input
                                name="foreigntaxid"
                                id="foreigntaxid"
                                type="text"
                                autoComplete="off"
                                maxLength={40}
                                value={foreignTaxId}
                                readOnly={!foreign}
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setForeignTaxIdState("has-danger");
                                    } else {
                                        setForeignTaxIdState("has-success");
                                    }
                                    setForeignTaxId(e.target.value);
                                }}
                            />
                            {foreignTaxIdState === "has-danger" ? (
                                <label className="error">
                                Este campo es requerido.
                                </label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${taxRegimenState}`}>
                            <Label for="exampleSelect">Régimen Fiscal * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un Régimen Fiscal"
                                classNamePrefix="react-select"
                                value={taxRegimen}
                                onChange={(value) => {
                                    setTaxRegimen(value)
                                    setTaxRegimenState("has-success");
                                }}
                                options={dataTaxRegimes}
                            />
                            {taxRegimenState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un Régimen Fiscal</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${CFDIUseState}`}>
                            <Label for="exampleSelect">Uso de CFDI * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un Uso de CFDI"
                                classNamePrefix="react-select"
                                value = {CFDIUse}
                                onChange={(value) => {
                                    setCFDIUse(value)
                                    setCFDIUseState("has-success");
                                }}
                                options={dataCFDIUses}
                            />
                            {CFDIUseState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un Uso de CFDI</label>
                            ) : null}
                        </FormGroup>
                        <Label for="exampleSelect">Estatus</Label>
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
                    </Col>
                    <Col className="mt-3" lg="10">
                        <div className="category form-category">
                        * Campos requeridos
                        </div>
                    </Col>  
                    <Col className="mt-3" lg="10">
                        <FormGroup className={`form-text ${errorState}`}>
                            {errorState === "text-danger" ? (
                                <label className="form-text has-danger">
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
                <Button className="buttons button-close btn-gtc" color="secondary" onClick={handleModalClick}>
                    Cerrar
                </Button>
                <Button className="buttons btn-gtc" color="primary" onClick={updateClick}>
                    Guardar cambios
                </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ModalUpdateCustomerBillTos;