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
    Col
} from "reactstrap";

function ModalUpdateCustomerUoM({abierto, toggleModalUpdateRecord, record, updateAddData, ip, autoCloseAlert}) {
        // update form
    const [idCustomer, setIdCustomer] = React.useState("");
    const [customer, setCustomer] = React.useState("");
    const [idCustomUoM, setIdCustomUoM] = useState("")
    const [customUoM, setCustomUoM] = useState("")
    const [idCustomerUoM, setIdCustomerUoM] = useState("")
    const [shortDesc, setShortDesc] = useState("")
    const [status, setStatus] = useState(true)

    const [idCustomerUoMState, setIdCustomerUoMState] = useState("")
    const [shortDescState, setShortDescState] = useState("")

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    useEffect(() => {
        setIdCustomer(record.idCustomer);
        setCustomer(record.customer);
        setIdCustomUoM(record.idUoMCode);
        setCustomUoM(record.uomCode)
        setIdCustomerUoM(record.idCustomerUoM);
        setShortDesc(record.shortDesc);
        if(record.status === "Habilitado")
        {
            setStatus(true);
        }
        else{
            setStatus(false);
        }
    },[record]);

    const handleModalClick = () => {
        setIdCustomerUoMState("")
        setShortDescState("")
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
        var idcustomeruom = document.getElementById("idcustomeruom").value
        var shortdesc = document.getElementById("shortdescription").value

        if (!verifyLength(idcustomeruom, 1)) {
            setIdCustomerUoMState("has-danger");
        } else {
            setIdCustomerUoMState("has-success");
        }
        setIdCustomer(idcustomeruom);

        if (!verifyLength(shortdesc, 1)) {
            setShortDescState("has-danger");
        } else {
            setShortDescState("has-success");
        }
        setShortDesc(shortdesc);
    }

    const isValidated = () => {
        
        verifyInputs()
        if (
            idCustomerUoMState !== "has-danger" &&
            shortDescState !== "has-danger"
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
        else {
            console.log("no entre")
        }
    };

    function updateRegister () {
        const catRegister = {
            piIdCustomer: idCustomer,
            pvIdUoMCode: idCustomUoM,
            pvIdCustomerUoM: idCustomerUoM,
            pvShortDesc: shortDesc,
            pbStatus: status,
            pvUser: user,
            pvIP: ip,
        };

        console.log(catRegister)
    
        fetch(`${process.env.REACT_APP_API_URI}customer-uoms/update/`, {
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
                <h5 className="modal-title">Editar Registro {record.name} </h5>
            </div>
        <ModalBody>
            <Form id="RegisterValidation">
                <FormGroup>
                    <label>Cliente</label>
                    <Input
                        name="id"
                        type="text"
                        value={customer} 
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <label>Unidad Medida SAT</label>
                    <Input
                        name="id"
                        type="text"
                        value={customUoM} 
                        readOnly
                    />
                </FormGroup>
                <FormGroup className={`has-label ${idCustomerUoMState}`}>
                    <label>Código Interno de Unidad de Medida *</label>
                    <Input
                        name="name"
                        type="text"
                        id="idcustomeruom"
                        autoComplete="off"
                        value = {idCustomerUoM}
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
                        id="shortdescription"
                        value = {shortDesc}
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

export default ModalUpdateCustomerUoM;