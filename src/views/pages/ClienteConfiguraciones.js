import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import Skeleton from '@yisheng90/react-loading';

// core components
import ClienteConfiguracionesTable from "../components/ClienteConfiguraciones/ClienteConfiguracionesTable";

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
  ModalFooter
} from "reactstrap";




function ClienteConfiguraciones() {
  const token = localStorage.getItem("Token"); 
  const customer = localStorage.getItem("Id_Customer")
  
  //Para guardar los datos de las aplicaciones por cliente
  const [dataApplications, setDataApplications] = useState([])

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
    var url = new URL(`http://129.159.99.152/develop-api/api/customer-applications/${customer}/`);

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
      console.log(data)
      setDataApplications(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los clientes" + err);
    });
  }, []);

  //Renderizado condicional
  function ClienteConfiguracion() {
    return <ClienteConfiguracionesTable dataTable = {dataApplications} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    var url = new URL(`http://129.159.99.152/develop-api/api/customer-applications/${customer}/`);

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
        console.log(err)
    });
  }

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

  return dataApplications.length === 0 ? (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cliente Configuraciones</CardTitle>
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
                <CardTitle tag="h4">Cliente Configuraciones</CardTitle>
              </CardHeader>
              <CardBody>
                <ClienteConfiguracion />
                {alert}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ClienteConfiguraciones;
