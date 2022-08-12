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

function ModalAddCustomerUoM({modalAddRecord, setModalAddRecord, ip, autoCloseAlert, updateAddData, dataCustomUoMs, toggleModalAddCustomUoM, mensajeAdd, customerE, customUoME, setCustomUoME}) {
        // register form
    const [customer, setCustomer] = React.useState({});
    const [customUoM, setCustomUoM] = useState({})
    const [idCustomerUoM, setIdCustomerUoM] = useState({})
    const [shortDesc, setShortDesc] = useState({})
    const [status, setStatus] = useState(true)

    const [customUoMState, setCustomUoMState] = useState([]);
    const [idCustomerUoMState, setIdCustomerUoMState] = useState({})
    const [shortDescState, setShortDescState] = useState({})

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    //Para guardar el rol loggeado
    const role = localStorage.getItem("Id_Role");

    useEffect(() => {
        setCustomUoM(customUoME);
        if(customUoME.value === undefined)
        {
            setCustomUoMState("");
        }
        else {
            setCustomUoMState("has-success");
        }
    },[customUoME]);

    useEffect(() => {
        setCustomer(customerE);
    },[customerE]);

    const handleModalClick = () => {
        setCustomUoMState("");
        setIdCustomerUoMState("");
        setShortDescState("");
        setError("")
        setErrorState("")
        setErrorMessage("")
        setCustomUoME({})
        setModalAddRecord(!modalAddRecord);
    };
    
    const isValidated = () => {
        if (customUoMState === "has-success" && 
            idCustomerUoMState  === "has-success" && 
            shortDescState === "has-success"
        ) 
        {
            return true;
        } else {
            if (customUoMState !== "has-success") {
                setCustomUoMState("has-danger");
            }
            if (idCustomerUoMState !== "has-success") {
                setIdCustomerUoMState("has-danger");
            }
            if (shortDescState !== "has-success") {
                setShortDescState("has-danger");
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

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };
    

    function updateRegister(){
        const catRegister = {
            piIdCustomer: customer.value,
            pvIdUoMCode: customUoM.value,
            pvIdCustomerUoM: idCustomerUoM,
            pvShortDesc: shortDesc,
            pbStatus: status,
            pvUser: user,
            pvIP: ip,
        };

        console.log(catRegister)

        fetch(`${process.env.REACT_APP_API_URI}customer-uoms/insert/`, {
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
                <h5 className="modal-title">Agregar Cliente - Unidad Medida SAT</h5>
            </div>
            <ModalBody>
                <Form id="RegisterValidation">
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
                    <FormGroup className={`has-label ${customUoMState}`}>
                        <Label for="exampleSelect">Unidad Medida SAT * </Label>
                        {role !== "CUSAPPLI" ? (
                            <abbr title="Agregar Unidad de Medida SAT">
                                <button
                                    onClick={() => {
                                        event.preventDefault();
                                        setModalAddRecord(!modalAddRecord)
                                        toggleModalAddCustomUoM()
                                    }}
                                    color="warning"
                                    size="sm"
                                    className="btn-icon btn-link edit"
                                >
                                <i className="fa fa-plus-square"/>
                                </button>
                            </abbr>
                        ): null}
                        <Select
                            name="vendors"
                            id = "vendors"
                            className="react-select"
                            placeholder="Selecciona una Unidad Medida SAT"
                            classNamePrefix="react-select"
                            value={customUoM}
                            onChange={(value) => {
                                setCustomUoM(value)
                                setCustomUoMState("has-success");
                            }}
                            options={dataCustomUoMs}
                        />
                        {customUoMState === "has-danger" ? (
                            <label className="error">Selecciona una Unidad Medida SAT.</label>
                        ) : null}
                    </FormGroup>
                    {visible === true ? (
                        <div className = "badge-success badge-rounded company-message">
                            {mensajeAdd}
                        </div>
                        ) : (
                            null
                    )}
                    <FormGroup className={`has-label ${idCustomerUoMState}`}>
                        <label>Código Interno de Unidad de Medida *</label>
                        <Input
                            name="name"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => {
                                if (!verifyLength(e.target.value, 1)) {
                                    setIdCustomerUoMState("has-danger");
                                } else {
                                    setIdCustomerUoMState("has-success");
                                }
                                setIdCustomerUoM(e.target.value);
                            }}
                        />
                        {idCustomerUoMState === "has-danger" ? (
                            <label className="error">
                            Este campo es requerido.
                            </label>
                        ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${shortDescState}`}>
                        <label>Descripción *</label>
                        <Input
                            name="description"
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
                            <label className="error">
                            Este campo es requerido.
                            </label>
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
                    <div className="category form-category">
                    * Campos requeridos
                    </div>
                    <FormGroup className={`form-text ${errorState}`}>
                        {errorState === "text-danger" ? (
                            <label className="form-text has-danger">
                                {errorMessage}
                            </label>
                        ) : null}
                    </FormGroup>
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

export default ModalAddCustomerUoM;