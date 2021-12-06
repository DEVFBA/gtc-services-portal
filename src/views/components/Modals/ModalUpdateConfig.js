import React, { useState, useEffect } from "react";
import classnames from "classnames";

// reactstrap components
import {
    Button,
    Modal, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Form,
    Row,
    Col,
    Input,
    Label,
} from "reactstrap";

function ModalUpdateConfig({abierto, toggleModalUpdateRecord, record}) {
    const [configuracion, setConfiguracion] = useState("");
    const [requerida, setRequerida] = React.useState("");
    const [editable, setEditable] = React.useState("");
    const [visible, setVisible] = React.useState("");
    const [tooltip, setTooltip] = React.useState("");

    const [configuracionState, setconfiguracionState] = React.useState("");
    const [requeridaState, setrequeridaState] = React.useState("");
    const [editableState, seteditableState] = React.useState("");
    const [visibleState, setvisibleState] = React.useState("");
    const [tooltipState, settooltipState] = React.useState("");

    const [configuracionFocus, setconfiguracionFocus] = React.useState("");
    const [requeridaFocus, setrequeridaFocus] = React.useState("");
    const [editableFocus, seteditableFocus] = React.useState("");
    const [visibleFocus, setvisibleFocus] = React.useState("");
    const [tooltipFocus, settooltipFocus] = React.useState("");

    useEffect(() => {
        setConfiguracion(record.configuracion)
        setTooltip(record.tooltip)
        if(record.requerida === "Requerida")
        {
            setRequerida(true);
        }
        else{
            setRequerida(false);
        }
        if(record.editable === "Editable")
        {
            setEditable(true);
        }
        else{
            setEditable(false);
        }
        if(record.visible === "Visible")
        {
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    },[record]);

    //Funcion para cerrar modal
    const handleModalClick = () => {
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
        var tooltip = document.getElementById("tooltip").value

        if (!verifyLength(tooltip, 1)) {
            settooltipState("has-danger");
        } else {
            settooltipState("has-success");
        }
        setTooltip(tooltip);  
    }

    const isValidated = () => {
        verifyInputs()
        if (
            tooltipState !== "has-danger"
        ) {
            return true;
        } else {
            return false;
        }
    };
    
    const handleClick = () => {
        if(isValidated() === true){
            //setConfiguracion(record.configuracion)
            var register = [
                configuracion,
                requerida, 
                editable,
                visible,
                tooltip
            ]
            //setRecord(register)
            //handleModalClick()
            //Aqui necesitamos actualizar la informacion del registro que está en la tabla
            //Es necesario mandar a llamar un método del parent (SettingStep2) para que actualice ese campo...
        }
    };
    
    return (
        <Modal isOpen={abierto} toggle={handleModalClick} size="lg">
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Editar Configuración</h5>
        </div>
        <ModalBody>
            <Row className="justify-content-center">
            <Col className="mt-3" lg="10">
            {/*No podra ser modificable - solo lectura*/}
            <FormGroup>
                <Label for="exampleSelect">Configuración</Label>
                <Input
                name="configuracion"
                value={configuracion}
                type="text"
                readOnly
                />
            </FormGroup>
            </Col>
            <Col sm="3">
            <FormGroup check>
                <Label check>
                <Input 
                name="requerida"
                type="checkbox" 
                checked = {requerida} 
                onChange={(e) => {
                    setRequerida(e.target.checked)
                }}
                />{' '}
                Requerida
                <span className="form-check-sign">
                    <span className="check"></span>
                </span>
                </Label>
            </FormGroup>
            </Col>
            <Col sm="3">
            <FormGroup check>
                <Label check>
                <Input 
                    name="editable"
                    checked = {editable} 
                    type="checkbox" 
                    onChange={(e) => {
                        setEditable(e.target.checked)
                    }}
                />{' '}
                Editable
                <span className="form-check-sign">
                    <span className="check"></span>
                </span>
                </Label>
            </FormGroup>
            </Col>
            <Col sm="3">
            <FormGroup check>
                <Label check>
                <Input 
                    name="visible"
                    type="checkbox" 
                    checked = {visible} 
                    onChange={(e) => {
                    setVisible(e.target.checked)
                    }}
                />{' '}
                Visible
                <span className="form-check-sign">
                    <span className="check"></span>
                </span>
                </Label>
            </FormGroup>
            </Col>
            <Col className="mt-3" lg="10">
            <FormGroup
                className={classnames(tooltipState, {
                "input-group-focus": tooltipFocus,
                })}
                onFocus={(e) => settooltipFocus(true)}
                onBlur={(e) => settooltipFocus(false)}
            >
                <Label for="exampleSelect">Tooltip *</Label>
                <Input
                    id="tooltip"
                    name="tooltip"
                    value={tooltip}
                    type="text"
                    onChange={(e) => {
                        if (!verifyLength(e.target.value, 1)) {
                        settooltipState("has-danger");
                        } else {
                        settooltipState("has-success");
                        }
                        setTooltip(e.target.value);
                    }}
                />
                {tooltipState === "has-danger" ? (
                <label className="error">Este campo es requerido.</label>
                ) : null}
            </FormGroup>
            </Col>
        </Row>
        </ModalBody>
        <ModalFooter>
          <div className="center-side">
            <Button color="secondary" onClick={handleModalClick}>
                Close
            </Button>
            <Button color="primary" onClick={handleClick}>
                Guardar cambios
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
}

export default ModalUpdateConfig;