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

function ModalUpdateCustomerItem({modalUpdateRecord, setModalUpdateRecord, ip, autoCloseAlert, updateAddData, dataProductServiceCodes, dataUoMCodes, dataUoMCodesSelect, dataTaxObject,dataHarmonizedTariffCodes, dataHarmonizedTariffCodesSelect, record}) {
    // register form
    const [idCustomer, setIdCustomer] = React.useState("");
    const [customer, setCustomer] = React.useState("");
    const [idItem, setIdItem] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [longDesc, setLongDesc] = useState("");
    const [productServiceCode, setProductServiceCode] = useState("");
    const [idUoMCode, setIdUoMCode] = useState("");
    const [idCustomerUoM, setIdCustomerUoM] = useState("");
    const [taxObject, setTaxObject] = useState("");
    const [harmonizedTariffCode, setHarmonizedTariffCode] = useState("");
    const [idCustomUoMs, setIdCustomUoMs] = useState("");
    const [branch, setBranch] = useState("");
    const [model, setModel] = useState("");
    const [subModel, setSubModel] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [status, setStatus] = useState(true)

    const [shortDescState, setShortDescState] = useState("");
    const [longDescState, setLongDescState] = useState("");
    const [productServiceCodeState, setProductServiceCodeState] = useState("");
    const [idUoMCodeState, setIdUoMCodeState] = useState("");
    const [taxObjectState, setTaxObjectState] = useState("");
    const [harmonizedTariffCodeState, setHarmonizedTariffCodeState] = useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setIdCustomer(record.idCustomer);
        setCustomer(record.customer);
        setIdItem(record.idItem);
        setShortDesc(record.shortDesc);
        setShortDescState("has-success");
        setLongDesc(record.longDesc);
        setLongDescState("has-success");
        setProductServiceCode({
            value: record.idProductServiceCode, label: record.idProductServiceCode + " - " + record.productServiceCode
        });
        setIdUoMCode({
            value: record.idUoMCode, label: record.idUoMCode + " - " + record.UoMCode
        });
        setIdCustomerUoM(record.idCustomerUoM);
        setTaxObject({
            value: record.idTaxObject, label: record.idTaxObject + " - " + record.taxObject
        });
        setHarmonizedTariffCode({
            value: record.idHarmonizedTariffCode, label: record.idHarmonizedTariffCode + " - " + record.harmonizedTariffCode
        });
        setIdCustomUoMs(record.idCustomUoMs);
        setBranch(record.branch);
        setModel(record.model);
        setSubModel(record.subModel)
        setSerialNumber(record.serialNumber);
       
        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else {
            setStatus(false);
        }
    },[record]);

    const handleModalClick = () => {
        setShortDescState("");
        setLongDescState("");
        setProductServiceCodeState("");
        setIdUoMCodeState("");
        setTaxObjectState("");
        setHarmonizedTariffCodeState("");
        setError("")
        setErrorState("")
        setErrorMessage("")
        setModalUpdateRecord(!modalUpdateRecord);
    };

    //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
    const verifyInputs = () =>{
        var shortdesc = document.getElementById("shortdesc").value
        var longdesc = document.getElementById("longdesc").value

        if (!verifyLength(shortdesc, 1)) {
            setShortDescState("has-danger");
        } else {
            setShortDescState("has-success");
        }
        setShortDesc(shortdesc);

        if (!verifyLength(longdesc, 5)) {
            setLongDescState("has-danger");
        } else {
            setLongDescState("has-success");
        }
        setLongDesc(longdesc);
    }
    
    const isValidated = () => {
        verifyInputs()
        if (
            shortDescState === "has-success" &&
            longDescState === "has-success"
        ) 
        {
            return true;
        } else {
            if (shortDescState !== "has-success") {
                setShortDescState("has-danger");
            }
            if (longDescState !== "has-success") {
                setLongDescState("has-danger");
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
            piIdCustomer: idCustomer,
            pvIdItem: idItem,
            pvIdProductServiceCode: productServiceCode.value,
            pvIdUoMCode: idUoMCode.value,
            pvIdTaxObject: taxObject.value,
            pvIdHarmonizedTariffCode: harmonizedTariffCode.value,
            pvIdCustom_UoMs: idCustomUoMs,
            pvShortDesc: shortDesc,
            pvLongDesc: longDesc,
            pvBranch: branch,
            pvModel: model,
            pvSubModel: subModel,
            pvSerialNumber: serialNumber,
            pbStatus: status,
            pvUser: user,
            pvIP: ip,
        };

        console.log(catRegister)

        fetch(`${process.env.REACT_APP_API_URI}customer-items/update/`, {
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
                    handleModalClick() 
                }
                else if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                    autoCloseAlert(data[0].Code_Message_User);
                    handleModalClick();
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
                <h5 className="modal-title">Actualizar Cliente - Artículo</h5>
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
                            <Label for="exampleSelect">Número de Item</Label>
                            <Input
                                name="iditem"
                                type="text"
                                autoComplete="off"
                                value={idItem}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${shortDescState}`}>
                            <Label for="exampleSelect">Descripción corta * </Label>
                            <Input
                                name="shortdesc"
                                id="shortdesc"
                                type="text"
                                autoComplete="off"
                                value={shortDesc}
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setShortDescState("has-danger");
                                    } else {
                                        setShortDescState("has-success");
                                    }
                                    setShortDesc(e.target.value);
                                }}
                            />
                            {shortDescState === "has-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${longDescState}`}>
                            <Label for="exampleSelect">Descripción larga * </Label>
                            <Input
                                name="longdesc"
                                type="text"
                                id="longdesc"
                                autoComplete="off"
                                value={longDesc}
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setLongDescState("has-danger");
                                    } else {
                                        setLongDescState("has-success");
                                    }
                                    setLongDesc(e.target.value);
                                }}
                            />
                            {longDescState === "has-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${productServiceCodeState}`}>
                            <Label for="exampleSelect">Clave Producto Servicio * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona una Clave Unidad Medida"
                                classNamePrefix="react-select"
                                value={productServiceCode}
                                onChange={(value) => {
                                    setProductServiceCode(value)
                                    setProductServiceCodeState("has-success");
                                }}
                                options={dataProductServiceCodes}
                            />
                            {productServiceCodeState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona una Clave Producto Servicio</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`has-label ${idUoMCodeState}`}>
                            <Label for="exampleSelect">Clave Unidad de Medida * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona una Clave Unidad Medida"
                                classNamePrefix="react-select"
                                value={idUoMCode}
                                onChange={(value) => {
                                    setIdUoMCode(value)
                                    setIdUoMCodeState("has-success");
                                    //console.log(dataUoMCodes.find(o => o.Id_UoM_Code === value.value))
                                    setIdCustomerUoM(dataUoMCodes.find(o => o.Id_UoM_Code === value.value).Id_Customer_UoM)
                                    //jsonData.elements[0].elements.find( o => o.name === "cfdi:Conceptos")
                                }}
                                options={dataUoMCodesSelect}
                            />
                            {idUoMCodeState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona una Clave Unidad de Medida</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Unidad de Medida Interna</Label>
                            <Input
                                name="iduomcode"
                                type="text"
                                autoComplete="off"
                                value={idCustomerUoM}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${taxObjectState}`}>
                            <Label for="exampleSelect">Objeto Impuesto * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona un Objeto Impuesto"
                                classNamePrefix="react-select"
                                value={taxObject}
                                onChange={(value) => {
                                    setTaxObject(value)
                                    setTaxObjectState("has-success");
                                }}
                                options={dataTaxObject}
                            />
                            {taxObjectState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona un Objeto Impuesto</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${harmonizedTariffCodeState}`}>
                            <Label for="exampleSelect">Fracción Arancelaria * </Label>
                            <Select
                                name="entitytype"
                                className="react-select"
                                placeholder="Selecciona una Fracción Arancelaria"
                                classNamePrefix="react-select"
                                value={harmonizedTariffCode}
                                onChange={(value) => {
                                    setIdCustomUoMs(dataHarmonizedTariffCodes.find(o => o.Id_Catalog === value.value).Id_Custom_UoMs)
                                    setHarmonizedTariffCode(value)
                                    setHarmonizedTariffCodeState("has-success");
                                }}
                                options={dataHarmonizedTariffCodesSelect}
                            />
                            {harmonizedTariffCodeState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona una Fracción Arancelaria</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Clave Unidad Aduana</Label>
                            <Input
                                name="iduomcode"
                                type="text"
                                autoComplete="off"
                                value={idCustomUoMs}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Marca</Label>
                            <Input
                                name="longdesc"
                                type="text"
                                autoComplete="off"
                                value={branch}
                                onChange={(e) => {
                                    setBranch(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Modelo</Label>
                            <Input
                                name="model"
                                type="text"
                                autoComplete="off"
                                value={model}
                                onChange={(e) => {
                                    setModel(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">SubModelo</Label>
                            <Input
                                name="submodel"
                                type="text"
                                autoComplete="off"
                                value={subModel}
                                onChange={(e) => {
                                    setSubModel(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Número de Serie</Label>
                            <Input
                                name="submodel"
                                type="text"
                                autoComplete="off"
                                value={serialNumber}
                                onChange={(e) => {
                                    setSerialNumber(e.target.value);
                                }}
                            />
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

export default ModalUpdateCustomerItem;