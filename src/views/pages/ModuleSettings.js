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
import ModalAddApplication from "views/components/Modals/ModalAddApplication.js";

function ModuleSettings() {

  //Guardar datos para la tabla
  const [dataApplications, setDataApplications] = useState([]);

  //Para guardar las suites del select
  const [options, setOptions] = useState([]);

  const token = localStorage.getItem("Token");

  const [ip, setIP] = React.useState("");

  const [alert, setAlert] = React.useState(null);

  const [dataFind, setDataFind] = useState(true)

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
      setDataFind(false)
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
    setDataFind(true)
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
      setDataFind(false)
      setDataApplications(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los aplicaciones" + err);
    });
  }

  const [modalAddRecord, setModalAddRecord] = useState(false);

  function toggleModalAddRecord(){
    if(modalAddRecord == false){
      setModalAddRecord(true);
    }
    else{
      setModalAddRecord(false);
    }
  }

  return dataFind === true ? (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Módulos</CardTitle>
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                  </span>
                  Añadir Módulo
                </Button>
              </CardHeader>
              <CardBody>
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/*MODAL PARA CREAR REGISTRO*/}
        <ModalAddApplication abierto = {modalAddRecord} toggleModalAddRecord = {toggleModalAddRecord} dataSuites = {options} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>
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
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                  </span>
                  Añadir Módulo
                </Button>
              </CardHeader>
              <CardBody>
                {alert}
                {dataApplications.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                  <Applications />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/*MODAL PARA CREAR REGISTRO*/}
        <ModalAddApplication abierto = {modalAddRecord} toggleModalAddRecord = {toggleModalAddRecord} dataSuites = {options} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>
      </div>
    </>
  );

  
}

export default ModuleSettings;