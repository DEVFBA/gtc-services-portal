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

function ModalAddCustomerItem({modalAddRecord, setModalAddRecord, ip, autoCloseAlert, updateAddData, dataProductServiceCodes, dataUoMCodes, dataUoMCodesSelect, dataTaxObject,dataHarmonizedTariffCodes, dataHarmonizedTariffCodesSelect, customerE}) {
        
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

    const [idItemState, setIdItemState] = useState("");
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
        setCustomer(customerE);
    },[customerE]);

    const handleModalClick = () => {
        setIdItemState("");
        setShortDescState("");
        setLongDescState("");
        setProductServiceCodeState("");
        setIdUoMCodeState("");
        setTaxObjectState("");
        setHarmonizedTariffCodeState("");
        setError("");
        setErrorState("");
        setErrorMessage("");
        setModalAddRecord(!modalAddRecord);
    };
    
    const isValidated = () => {
        if (idItemState === "has-success" &&
            shortDescState === "has-success" &&
            longDescState === "has-success" &&
            productServiceCodeState === "has-success" &&
            idUoMCodeState === "has-success" &&
            taxObjectState === "has-success" &&
            harmonizedTariffCodeState === "has-success") 
        {
            return true;
        } else {
            if (idItemState !== "has-success") {
                setIdItemState("has-danger");
            }
            if (shortDescState !== "has-success") {
                setShortDescState("has-danger");
            }
            if (longDescState !== "has-success") {
                setLongDescState("has-danger");
            }
            if (productServiceCodeState !== "has-success") {
                setProductServiceCodeState("has-danger");
            }
            if (idUoMCodeState !== "has-success") {
                setIdUoMCodeState("has-danger");
            }
            if (taxObjectState !== "has-success") {
                setTaxObjectState("has-danger");
            }
            if (harmonizedTariffCodeState !== "has-success") {
                setHarmonizedTariffCodeState("has-danger");
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
            piIdCustomer: customer.value,
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

        fetch(`${process.env.REACT_APP_API_URI}customer-items/insert/`, {
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
                if(data[0].Code_Type === "Warning")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                    
                    //Borramos el valor de las variables porque se quedan pegados cuando se insertan varios consecutivamente
                    setIdItem("");
                    setShortDesc("");
                    setLongDesc("");
                    setProductServiceCode("");
                    setIdUoMCode("");
                    setIdCustomerUoM("");
                    setTaxObject("");
                    setHarmonizedTariffCode("");
                    setIdCustomUoMs("");
                    setBranch("");
                    setModel("");
                    setSubModel("");
                    setSerialNumber("");
                    setStatus(true);

                    autoCloseAlert(data[0].Code_Message_User)
                    handleModalClick() 
                }
                else if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")

                    //Borramos el valor de las variables porque se quedan pegados cuando se insertan varios consecutivamente
                    setIdItem("");
                    setShortDesc("");
                    setLongDesc("");
                    setProductServiceCode("");
                    setIdUoMCode("");
                    setIdCustomerUoM("");
                    setTaxObject("");
                    setHarmonizedTariffCode("");
                    setIdCustomUoMs("");
                    setBranch("");
                    setModel("");
                    setSubModel("");
                    setSerialNumber("");
                    setStatus(true);

                    autoCloseAlert(data[0].Code_Message_User);
                    handleModalClick();
                }
                else{
                    setErrorState("has-success");
                    //Para actualizar la tabla en componente principal
                    updateAddData()

                    //Borramos el valor de las variables porque se quedan pegados cuando se insertan varios consecutivamente
                    setIdItem("");
                    setShortDesc("");
                    setLongDesc("");
                    setProductServiceCode("");
                    setIdUoMCode("");
                    setIdCustomerUoM("");
                    setTaxObject("");
                    setHarmonizedTariffCode("");
                    setIdCustomUoMs("");
                    setBranch("");
                    setModel("");
                    setSubModel("");
                    setSerialNumber("");
                    setStatus(true);

                    //Cerramos el modal
                    handleModalClick() 
                    autoCloseAlert(data[0].Code_Message_User)
                }
            }
        });
    }

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg" aria-labelledby="contained-modal-title-vcenter">
           <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Agregar Cliente - Artículo</h5>
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
                                value={customer.label}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${idItemState}`}>
                            <Label for="exampleSelect">Número de Item * </Label>
                            <Input
                                name="iditem"
                                type="text"
                                autoComplete="off"
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setIdItemState("has-danger");
                                    } else {
                                        setIdItemState("has-success");
                                    }
                                    setIdItem(e.target.value);
                                }}
                            />
                            {idItemState === "has-danger" ? (
                                <label className="form-text text-danger">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                        <FormGroup className={`form-group ${shortDescState}`}>
                            <Label for="exampleSelect">Descripción corta * </Label>
                            <Input
                                name="shortdesc"
                                type="text"
                                autoComplete="off"
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
                                autoComplete="off"
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

export default ModalAddCustomerItem;