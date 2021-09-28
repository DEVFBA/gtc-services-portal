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


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Input,
  Label
} from "reactstrap";

// core components


// core components
import ModuleSettingsTable from "../components/ModuleSettings/ModuleSettingsTable.js";

const datos = [
  ["APP1", "System Architect", "Edinburgh", "61"],
  ["APP2", "Accountant", "Tokyo", "63"],
  ["APP3", "Junior Technical Author", "San Francisco", "66"],
  ["APP4", "Senior Javascript Developer", "Edinburgh", "22"],
  ["APP5", "Accountant", "Tokyo", "33"],
  ["APP6", "Integration Specialist", "New York", "61"],
];

function ModuleSettings() {

  //Guardar datos para la tabla
  const [dataApplications, setDataApplications] = useState([]);

  const token = localStorage.getItem("Token");

  useEffect(() => {
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/cat-applications/`);

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
      console.log(data)
      setDataApplications(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los aplicaciones" + err);
    });
  }, []);

  //Renderizado condicional
  function Applications() {
    return <ModuleSettingsTable dataTable = {dataApplications}/>;
  }

  return dataApplications.length === 0 ? (
    <>
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Catálogo de Aplicaciones</CardTitle>
              </CardHeader>
              <CardBody>
                <Applications />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );

  
}

export default ModuleSettings;