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
  const [idApp, setIdApp] = React.useState("");
  const [appName, setAppName] = React.useState("");
  const [version, setVersion] = React.useState("");
  const [suite, setSuite] = React.useState({});
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
  const [options, setOptions] = useState([]);

  const token = localStorage.getItem("Token");

  useEffect(() => {
  
    var url = new URL(`${process.env.REACT_APP_API_URI}cat-applications/${props.prop1}/`);

    fetch(url, {
        method: "GET",
        headers: {
            "access-token": token,
            "Content-Type": "application/json",
        }
    })
    .then(function(response) {
        return response.ok ? response.json() : Promise.reject();
    })
    .then(function(data) {
      console.log(data)
      setIdApp(data[0].Id_Catalog)
      setAppName(data[0].Short_Desc)
      setDescripcionApp(data[0].Long_Desc)
      setDescripcionTec(data[0].Technical_Description)
      setVersion(data[0].Version)
      setSuite(
        {
          value: data[0].Id_Suite, label: data[0].Suite_Desc
        }
      )
      //setDataApplications(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de la aplicación" + err);
    });
  }, []);

  useEffect(() => {

    const params = {
      pvOptionCRUD: "R",
      pSpCatalog : "spCat_Suites_CRUD_Records",
    };
  
    var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url, {
        method: "GET",
        headers: {
            "access-token": token,
            "Content-Type": "application/json",
        }
    })
    .then(function(response) {
        return response.ok ? response.json() : Promise.reject();
    })
    .then(function(data) {
      //Creamos el arreglo de opciones para el select
      var optionsAux = [];
      var i;
      for(i=0; i<data.length; i++)
      {
        optionsAux.push({
          value: data[i].Component, label: data[i].Short_Desc 
        })
      }
      setOptions(optionsAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de las suites" + err);
    });
  }, []);
  
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: {
      idApp,
      appName,
      version,
      suite,
      descripcionApp,
      descripcionTec
    },
  }));

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  //Funcion para validar que no se queden en blanco los inputs en caso de que haga cambios
  const verifyInputs = () =>{
    var version = document.getElementById("version").value
    if (!verifyLength(version, 1)) {
        setVersionState("has-danger");
    } else {
        setVersionState("has-success");
    }
    setVersion(version);

    var descripcionApp = document.getElementById("descripcionApp").value
    if (!verifyLength(descripcionApp, 1)) {
        setdescripcionappState("has-danger");
    } else {
        setdescripcionappState("has-success");
    }
    setDescripcionApp(descripcionApp);

    var descripcionTec = document.getElementById("descripcionApp").value
    if (!verifyLength(descripcionTec, 1)) {
        setdescripciontecState("has-danger");
    } else {
        setdescripciontecState("has-success");
    }
    setdescripciontecState(descripcionTec);
  } 

  const isValidated = () => {
    verifyInputs()
    if (
        versionState !== "has-danger" &&
        suiteState !== "has-danger" &&
        descripcionappState !== "has-danger" &&
        descripciontecState !== "has-danger"
    ) {
      return true;
    } else {
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
          <label>Id Aplicación</label>
            <Input
              name="idAplicacion"
              value = {idApp}
              type="text"
              readOnly
            />
          </FormGroup>
        </Col>
        <Col className="mt-3" lg="10">
          <FormGroup>
            <label>Nombre de la aplicación</label>
            <Input
              name="aplicacion"
              value={appName}
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
            <label>Versión *</label>
            <Input
              id="version"
              name="version"
              value={version}
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
              <label className="error">Este campo es requerido.</label>
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
            <label>Suite *</label>
            <Select
                name="suite" 
                placeholder="Suite (required)"
                options = {options}
                value = {suite}
                onChange={(value) => {
                  setSuite(value)
                  setsuiteState("has-success");
                }}
            />
            {suiteState === "has-danger" ? (
              <label className="error">Este campo es requerido.</label>
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
            <label>Descripción de la aplicación *</label>
            <Input
              id = "descripcionApp"
              name="descripcionApp"
              value= {descripcionApp}
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
              <label className="error">Este campo es requerido</label>
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
            <label>Descripción técnica de la aplicación *</label>
            <Input
              id = "descripcionTec"
              name="descripcionTec"
              value = {descripcionTec}
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
              <label className="error">Este campo es requerido</label>
            ) : null}
          </FormGroup>
          <div className="category form-category">
              * Campos requeridos
          </div>
        </Col>
      </Row>
    </>
  );
});

export default GeneralsStep1;