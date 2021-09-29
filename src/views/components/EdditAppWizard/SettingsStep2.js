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
  InputGroupText,
  InputGroup,
  Row,
  Label,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
} from "reactstrap";

// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalUpdateConfig from "../Modals/ModalUpdateConfig.js";
import EditConfigurationTable from "../ModuleSettings/EditConfigurationTable.js";


const datos = [
      ["Tiger Nixon", 0, 1, 1, "Edinburgh", "61"],
      ["Garrett Winters", 0, 1, 1, "Edinburgh", "61"],
      ["Ashton Cox", 1, 0, 0, "Edinburgh", "61"],
      ["Cedric Kelly", 0, 0, 1, "Edinburgh", "61"],
      ["Airi Satou", 0, 1, 1, "Edinburgh", "61"],
];

  const SettingsStep2 = React.forwardRef((props, ref) => {

  const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

  const [dataAppConfigs, setDataAppConfigs] = useState([]);

  const token = localStorage.getItem("Token");

  useEffect(() => {
    console.log(props.prop1)
    var url = new URL(`http://129.159.99.152/develop-api/api/applications-settings/${props.prop1}/`);

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
      setDataAppConfigs(data);
      //setDataApplications(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de la configuraciones applicacion" + err);
    });
  }, []);

  
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: {
      dataAppConfigs,
    },
  }));

 //Renderizado condicional
 function ApplicationConfigs() {
  return <EditConfigurationTable dataTable = {dataAppConfigs}/>;
  }

  return dataAppConfigs.length === 0 ? (
    <>
    </>
  ) : (
    <>
      <div className="content">
        <h5 className="info-text">
          Editar Configuraciones
        </h5>
        <Row>
          <Col md="12">
                <ApplicationConfigs />
          </Col>
        </Row>
      </div>
    </>
  );
});

export default SettingsStep2;