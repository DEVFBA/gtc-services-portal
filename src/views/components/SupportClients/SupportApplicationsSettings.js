import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from '@yisheng90/react-loading';
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Modal, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Label,
} from "reactstrap";

// core components
import SupportApplicationsSettingsTable from "./SupportApplicationsSettingsTable";

function SupportApplicationsSettings() {
  const { idCus, idApp } = useParams();

  //Para guardar los datos de los usuarios
  const [dataTable, setDataTable] = useState([]);

  const [noApps, setNoApps] = useState(false)
  
  const token = localStorage.getItem("Token");

  const [alert, setAlert] = React.useState(null);

  const [ip, setIP] = React.useState("");
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
      //Descargamos la IP del usuario
      getData()
  }, []);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R",
      piIdCustomer : idCus,
      piIdApplication: idApp
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}applications-settings/`);

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
        if(data.length === 0)
        {
          setNoApps(true)
        }
        else {
          setNoApps(false)
        }
        var aux = []
        var contador = 0;
        for(var i=0; i< data.length; i++)
        {
          if(data[i].Use === "User")
          {
            aux[contador] = data[i]
            contador++
          }
        }
        setDataTable(aux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de las Configuraciones de la App" + err);
    });
  }, []);

  //Para actualizar la tabla al insertar registro
  function updateAddData(){   
    const params = {
      pvOptionCRUD: "R",
      piIdCustomer : idCus,
      piIdApplication: idApp
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}applications-settings/`);
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
        if(data.length === 0)
        {
          setNoApps(true)
        }
        else {
          setNoApps(false)
        }
        var aux = []
        var contador = 0;
        for(var i=0; i< data.length; i++)
        {
          if(data[i].Use === "User")
          {
            aux[contador] = data[i]
            contador++
          }
        }
        setDataTable(aux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los catálogos" + err);
    });
  }

   //Renderizado condicional
  function SupportAppSettings() {
    if(noApps === true)
    {
      return <h5>No hay configuraciones para la aplicación elegida</h5>;
    }
    else {
        return <SupportApplicationsSettingsTable dataTable = {dataTable} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
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

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Configuraciones Aplicación</CardTitle>
              </CardHeader>
              <CardBody>
                <SupportAppSettings />
                {alert}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SupportApplicationsSettings;