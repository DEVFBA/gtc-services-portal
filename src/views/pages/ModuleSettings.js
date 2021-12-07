import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import Skeleton from '@yisheng90/react-loading';

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

  //Para guardar las suites del select
  const [options, setOptions] = useState([]);

  const token = localStorage.getItem("Token");

  const [ip, setIP] = React.useState("");

  const [alert, setAlert] = React.useState(null);

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
      //Descargamos la IP del usuario
      getData()
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cat-applications/`);

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
      setDataApplications(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los aplicaciones" + err);
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

      data.sort(function (a, b) {
        if (a.Short_Desc > b.Short_Desc) {
          return 1;
        }
        if (a.Short_Desc < b.Short_Desc) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      
      //Creamos el arreglo de opciones para el select
      var optionsAux = [];
      var i;
      for(i=0; i<data.length; i++)
      {
        if(data[i].Status === true)
        {
          optionsAux.push({
            value: data[i].Id_Catalog, label: data[i].Short_Desc 
          })
        }
      }
      console.log(optionsAux)
      setOptions(optionsAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de las suites" + err);
    });
  }, []);

  React.useEffect(() => {
    return function cleanup() {
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  }, []);

  const autoCloseAlert = (mensaje) => {
    setAlert(
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Mensaje"
        onConfirm={() => hideAlert()}
        showConfirm={false}
      >
        {mensaje}
      </ReactBSAlert>
    );
    setTimeout(hideAlert, 2000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  //Renderizado condicional
  function Applications() {
    return <ModuleSettingsTable dataTable = {dataApplications} dataSuites = {options} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
  }

  function updateAddData(){
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cat-applications/`);

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
  }

  return dataApplications.length === 0 ? (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Módulos</CardTitle>
              </CardHeader>
              <CardBody>
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Módulos</CardTitle>
              </CardHeader>
              <CardBody>
                <Applications />
                {alert}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );

  
}

export default ModuleSettings;