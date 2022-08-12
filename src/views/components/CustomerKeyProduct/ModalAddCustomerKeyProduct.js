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

function ModalAddCustomerKeyProduct({modalAddRecord, setModalAddRecord, ip, autoCloseAlert, updateAddData, dataKeyProducts, toggleModalAddKeyProduct, mensajeAdd, customerE, keyProductE, setKeyProductE}) {
        // register form
    const [customer, setCustomer] = React.useState({});
    const [keyProduct, setKeyProduct] = useState({})
    const [status, setStatus] = useState(true)

    const [keyProductState, setKeyProductState] = useState([]);

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
     //Para guardar el rol loggeado
     const role = localStorage.getItem("Id_Role");

    useEffect(() => {
        setKeyProduct(keyProductE);
        if(keyProductE.value === undefined)
        {
            setKeyProductState("");
        }
        else {
            setKeyProductState("has-success");
        }
    },[keyProductE]);

    useEffect(() => {
        setCustomer(customerE);
    },[customerE]);

    const handleModalClick = () => {
        setKeyProductState("")
        setError("")
        setErrorState("")
        setErrorMessage("")
        setKeyProductE({})
        setModalAddRecord(!modalAddRecord);
    };
    
    const isValidated = () => {
        console.log(keyProduct)
        if (keyProductState === "has-success") 
        {
            return true;
        } else {
            if(keyProduct.value !== undefined)
            {
                return true;
            }
            if (keyProductState !== "has-success") {
                setKeyProductState("text-danger");
            }
            return false;
        }
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
            pvIdProductServiceCode: keyProduct.value,
            pbStatus: status,
            pvUser: user,
            pvIP: ip,
        };

        console.log(catRegister)

        fetch(`${process.env.REACT_APP_API_URI}customer-service-codes/insert/`, {
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

    const [visible, setIsVisible] = useState(false)

    useEffect(() => {
        // message is empty (meaning no errors). Adjust as needed
        if(!mensajeAdd){
            setIsVisible(false)
            return
        }
        // error exists. Display the message and hide after 5 secs
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [mensajeAdd])

    return (
        <Modal isOpen={modalAddRecord} toggle={handleModalClick} size="lg" aria-labelledby="contained-modal-title-vcenter">
           <div className="modal-header justify-content-center">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title">Agregar Cliente - Producto / Servicio</h5>
            </div>
            <ModalBody>
            <Form id="RegisterValidation">
                <Row className="justify-content-center">
                    <Col className="mt-3" lg="10">
                        <FormGroup>
                            <Label for="exampleSelect">Cliente</Label>
                            <Input
                                name="comp"
                                type="text"
                                autoComplete="off"
                                value={customer.label}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className={`form-group ${keyProductState}`}>
                            <Label for="exampleSelect">Clave Producto / Servicio * </Label>
                            {role !== "CUSAPPLI" ?(
                                <abbr title="Agregar Clave Producto / Servicio">
                                    <button
                                        onClick={() => {
                                            event.preventDefault();
                                            setModalAddRecord(!modalAddRecord)
                                            toggleModalAddKeyProduct()
                                        }}
                                        color="warning"
                                        size="sm"
                                        className="btn-icon btn-link edit"
                                    >
                                        <i className="fa fa-plus-square"/>
                                    </button>
                                </abbr>
                            ):null}
                            <Select
                                name="vendors"
                                id = "vendors"
                                className="react-select"
                                placeholder="Selecciona una Clave Producto / Servicio"
                                classNamePrefix="react-select"
                                value={keyProduct}
                                onChange={(value) => {
                                    setKeyProduct(value)
                                    setKeyProductState("has-success");
                                }}
                                options={dataKeyProducts}
                            />
                            {keyProductState === "has-danger" ? (
                                <label className="form-text text-danger">Selecciona una Clave Producto / Servicio.</label>
                            ) : null}
                        </FormGroup>
                        {visible === true ? (
                            <div className = "badge-success badge-rounded company-message">
                                {mensajeAdd}
                            </div>
                            ) : (
                                null
                        )}
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

export default ModalAddCustomerKeyProduct;