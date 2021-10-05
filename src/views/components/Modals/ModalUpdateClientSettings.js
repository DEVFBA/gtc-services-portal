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

function ModalUpdateClientSettings({modalUpdateRecord, setModalUpdateRecord, updateTable, setUpdateTable, record}) {
    const [configName, setConfigName] = useState("")
    const [tooltip, setTooltip] = useState("");
    const [requerido, setRequerido] = useState(true); 
    const [settingsValue, setSettingsValue] = useState();
    const [regularExpression, setRegularExpression] = useState()

    const [settingsValueState, setsettingsValueState] = React.useState("");
    const [settingsValueFocus, setSettingsValueFocus] = React.useState("");

    useEffect(() => {
        console.log(record)
        /*setConfigName()
        setTooltip()
        setRequerido()
        setSettingsValue()
        setRegularExpression()*/
        //Se tienen que descargar los datos de la base de datos.
        /*fetch(`http://localhost:8091/api/app-config-client/${record.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
          })
          .then(function(response) {
              return response.ok ? response.json() : Promise.reject();
          })
          .then(function(data) {
      
              var routesAux = [];
          })
          .catch(function(err) {
              alert("No se pudo consultar la informacion de la configuracion" + err);
        });*/
        //Se tiene que descargar la informacion de cada configuracion porque del prop no la está jalando para usarla
        //en las variables
    }, [record]);

    //Funcion para cerrar modal
    const handleModalClick = () => {
        setModalUpdateRecord(!modalUpdateRecord);
    };

    const verifySettingsValue = (value, length) => {
        if(requerido === true)
        {
            if(regularExpression !== "")
            {
                var regEx = new RegExp(regularExpression);
                if (regEx.test(value)) {
                    return true;
                }
                return false;
            }
            else if(value.length >= length){
                return true;
            }
            return false;
        }
        else 
        {
            return true;   
        }
    }

    const isValidated = () => {
        //Solo se valida el único campo que es obligatorio.
        if (settingsValueState === "has-success") 
        {
            return true;
        } else {
            if (settingsValueState !== "has-success") {
                setsettingsValueState("has-danger");
            }
            return false;
        }
    };
    
    const handleClick = () => {
        if(isValidated() === true){
            //Hacemos fetch a la base de datos con la nueva configuracion
            
            //Le decimos al padre que actualice la tabla con los nuevos datos
            console.log("entre")
            setUpdateTable(updateTable+1)
        }
    };
    
    return (
        <Modal isOpen={modalUpdateRecord} toggle={handleModalClick} size="lg">
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClick}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Edit Configuration {record.configuracion}</h5>
        </div>
        <ModalBody>
            <Row className="justify-content-center">
            <Col className="mt-3" lg="10">
              <Label>
                Tooltip: {tooltip}
              </Label>
            </Col>
            <Col className="mt-3" lg="10">
            <FormGroup
                className={classnames(settingsValueState, {
                "input-group-focus": settingsValueFocus,
                })}
                onFocus={(e) => setSettingsValueFocus(true)}
                onBlur={(e) => setSettingsValueFocus(false)}
            >
                <Input
                name="tooltip"
                placeholder={settingsValue}
                type="text"
                onChange={(e) => {
                    if (!verifySettingsValue(e.target.value, 1)) {
                        setsettingsValueState("has-danger");
                    } else {
                        setsettingsValueState("has-success");
                    }
                    setSettingsValue(e.target.value);
                }}
                />
                {settingsValueState === "has-danger" ? (
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

export default ModalUpdateClientSettings;