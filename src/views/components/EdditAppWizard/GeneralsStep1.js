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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  FormGroup,
  Label,
} from "reactstrap";

// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";

const GeneralsStep1 = React.forwardRef((props, ref) => {
  const [version, setVersion] = React.useState("");
  const [suite, setSuite] = React.useState("");
  const [descripcionApp, setDescripcionApp] = React.useState("");
  const [descripcionTec, setDescripcionTec] = React.useState("");

  const [versionState, setVersionState] = React.useState("");
  const [suiteState, setsuiteState] = React.useState("");
  const [descripcionappState, setdescripcionappState] = React.useState("");
  const [descripciontecState, setdescripciontecState] = React.useState("");

  const [versionFocus, setVersionFocus] = React.useState("");
  const [suiteFocus, setsuiteFocus] = React.useState("");
  const [descripcionappFocus, setdescripcionappFocus] = React.useState("");
  const [descripciontecFocus, setdescripciontecFocus] = React.useState("");

  //Guardar todos los catálogos para el select
  //const [catalogs, setCatalogs] = React.useState([]);
  const catalogs =[
    { value: "Afghanistan", label: " Afghanistan " },
    { value: "Albania", label: " Albania " },
    { value: "Algeria", label: " Algeria " },
    { value: "American Samoa", label: " American Samoa " },
    { value: "Andorra", label: " Andorra " },
    { value: "Angola", label: " Angola " },
    { value: "Anguilla", label: " Anguilla " },
    { value: "Antarctica", label: " Antarctica " },
  ]

  useEffect(() => {
    //Descargar la información de la app que se va a modificar mediante el idApp
  },[]);
  
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: {
      version,
      suite,
      descripcionApp,
      descripcionTec,
      versionState,
      suiteState,
      descripcionappState,
      descripciontecState,
    },
  }));

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const isValidated = () => {
    if (
      versionState === "has-success" &&
      suiteState === "has-success" &&
      descripcionappState === "has-success" &&
      descripciontecState === "has-success"
    ) {
      return true;
    } else {
      if (versionState !== "has-success") {
        setVersionState("has-danger");
      }
      if (suiteState !== "has-success") {
        setsuiteState("has-danger");
      }
      if (descripcionappState !== "has-success") {
        setdescripcionappState("has-danger");
      }
      if (descripciontecState !== "has-success") {
        setdescripciontecState("has-danger");
      }
      return false;
    }
  };


  return (
    <>
      <h5 className="info-text">
        Configuracion general de la aplicación o servicio
      </h5>
      <Row className="justify-content-center">
        <Col className="mt-3" lg="10">
          <FormGroup>
            <Input
              name="idAplicacion"
              placeholder={props.prop1}
              type="text"
              readOnly
            />
          </FormGroup>
        </Col>
        <Col className="mt-3" lg="10">
          <FormGroup>
            <Input
              name="aplicacion"
              placeholder="Nombre de la aplicación"
              type="text"
              readOnly
            />
          </FormGroup>
        </Col>
        <Col className="mt-3" lg="10">
          <FormGroup
            className={classnames(versionState, {
              "input-group-focus": versionFocus,
            })}
            onFocus={(e) => setVersionFocus(true)}
            onBlur={(e) => setVersionFocus(false)}
          >
            <Input
              name="version"
              placeholder="Versión (required)"
              type="text"
              onChange={(e) => {
                if (!verifyLength(e.target.value, 1)) {
                  setVersionState("has-danger");
                } else {
                    setVersionState("has-success");
                }
                setVersion(e.target.value);
              }}
              
            />
            {versionState === "has-danger" ? (
              <label className="error">This field is required.</label>
            ) : null}
          </FormGroup>
        </Col>
        <Col className="mt-3" lg="10">
          <FormGroup className={classnames(suiteState, {
              "input-group-focus": suiteFocus,
            })}
            onFocus={(e) => setsuiteFocus(true)}
            onBlur={(e) => setsuiteFocus(false)}
          >
            <Select
                name="suite" 
                placeholder="Suite (required)"
                options = {catalogs}
                onChange={(e) => {
                  if(e.value === null)
                  {
                      setsuiteState("has-danger");
                  } else {
                      setsuiteState("has-success");
                  }
                  setSuite(e.value);
                  console.log(e.value)
                }}
            />
            {suiteState === "has-danger" ? (
              <label className="error">This field is required.</label>
            ) : null}
          </FormGroup>
        </Col>
        <Col className="mt-3" lg="10">
          <FormGroup
            className={classnames(descripcionappState, {
              "input-group-focus": descripcionappFocus,
            })}
            onFocus={(e) => setdescripcionappFocus(true)}
            onBlur={(e) => setdescripcionappFocus(false)}
          >
            <Input
              name="descripcionApp"
              placeholder="Descripción de la aplicación (required)"
              type="text"
              onChange={(e) => {
                if (!verifyLength(e.target.value, 1)) {
                  setdescripcionappState("has-danger");
                } else {
                    setdescripcionappState("has-success");
                }
                setDescripcionApp(e.target.value);
              }}
              
            />
            {descripcionappState === "has-danger" ? (
              <label className="error">This field is required.</label>
            ) : null}
          </FormGroup>
        </Col>
        <Col className="mt-3" lg="10">
          <FormGroup
            className={classnames(descripciontecState, {
              "input-group-focus": descripciontecFocus,
            })}
            onFocus={(e) => setdescripciontecFocus(true)}
            onBlur={(e) => setdescripciontecFocus(false)}
          >
            <Input
              name="descripcionTec"
              placeholder="Descripción técnica de la aplicación (required)"
              type="text"
              onChange={(e) => {
                if (!verifyLength(e.target.value, 1)) {
                  setdescripciontecState("has-danger");
                } else {
                    setdescripciontecState("has-success");
                }
                setDescripcionTec(e.target.value);
              }}
            />
            {descripciontecState === "has-danger" ? (
              <label className="error">This field is required.</label>
            ) : null}
          </FormGroup>
        </Col>
      </Row>
    </>
  );
});

export default GeneralsStep1;