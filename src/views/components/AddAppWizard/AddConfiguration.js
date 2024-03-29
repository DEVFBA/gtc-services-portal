/*!

=========================================================
* Paper Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import classnames from "classnames";
// reactstrap components
import {
  Input,
  Button,
  Row,
  Label,
  Col,
  FormGroup,
} from "reactstrap";

// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";

function AddConfiguration ({dataState, setDataState, updateTable, setAddRegister}){

  const [configuracion, setConfiguracion] = React.useState("");
  const [requerida, setRequerida] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
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

  

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const isValidated = () => {
    if (
      configuracionState === "has-success" &&
      tooltipState === "has-success"
    ) {
      return true;
    } else {
      if (configuracionState !== "has-success") {
        setconfiguracionState("has-danger");
      }
      if (tooltipState !== "has-success") {
        settooltipState("has-danger");
      }
      return false;
    }
  };

  const handleClick = () => {
    if(isValidated() === true){
        const key = dataState.length
        var register = {
            id: key,
            configuracion: configuracion,
            requerida: requerida,
            editable: editable,
            visible: visible,
            tooltip: tooltip,
            actions: (
              // ACCIONES A REALIZAR EN CADA REGISTRO
              <div className="actions-center">
                {/* use this button to remove the data row */}
                <Button
                  onClick={() => {
                    var data = dataState;
                    data.find((o, i) => {
                      if (o.id === key) {
                        // here you should add some custom code so you can delete the data
                        // from this component and from your server as well
                        data.splice(i, 1);
                        console.log(data.length);
                        return true;
                      }
                      return false;
                    });
                    setDataState(data);
                  }}
                  color="danger"
                  size="sm"
                  className="btn-icon btn-link remove"
                ><i className="fa fa-times" />
                </Button>{" "}
              </div>
            ),
        }
        setAddRegister(register)
        updateTable()
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col className="mt-3" lg="10">
          <FormGroup
            className={classnames(configuracionState, {
              "input-group-focus": configuracionFocus,
            })}
            onFocus={(e) => setconfiguracionFocus(true)}
            onBlur={(e) => setconfiguracionFocus(false)}
          >
            <Input
              name="configuracion"
              placeholder="Configuración (atributo 'name' del setting) (required)"
              autoComplete="off"
              type="text"
              onChange={(e) => {
                if (!verifyLength(e.target.value, 1)) {
                  setconfiguracionState("has-danger");
                } else {
                  setconfiguracionState("has-success");
                }
                setConfiguracion(e.target.value);
              }}
            />
            {configuracionState === "has-danger" ? (
              <label className="error">Este campo es requerido.</label>
            ) : null}
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup check>
            <Label check>
            <Input 
              name="requerida"
              type="checkbox" 
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
            <Input
              name="tooltip"
              placeholder="Tooltip (required)"
              type="text"
              autoComplete="off"
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
        <Col className="mt-1" lg="10">
          <Button color="primary" onClick={handleClick}>
            Guardar configuración
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default AddConfiguration;