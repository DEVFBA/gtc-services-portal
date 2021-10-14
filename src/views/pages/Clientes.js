import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import Skeleton from '@yisheng90/react-loading';

// reactstrap components
import {
  Button,
  Modal, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle
} from "reactstrap";

import Select from "react-select";

// core components
import CustomersTable from "../components/Clients/CustomersTable.js";

function Clientes() {

  //Para guardar los datos de los usuarios
  const [dataCustomers, setDataCustomers] = useState([]);

  //Para guardar los datos de las aplicaciones
  const [dataCountries, setDataCountries] = useState([]);

  //Para guardar el path de las imágenes
  const [pathLogo, setPathLogo] = useState();

  const token = localStorage.getItem("Token");
  const user = localStorage.getItem("User");

  const [ip, setIP] = React.useState("");

  const [profilePath, setProfilePath] = useState("")
  
  const [message, setMessage] = React.useState(null);

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
      pvOptionCRUD: "R",
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/customers/`);

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
      setDataCustomers(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los customers" + err);
    });
  }, []);


  useEffect(() => {
    const params = {
      pvOptionCRUD: "R",
      pSpCatalog : "spSAT_Cat_Countries_CRUD_Records",
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/cat-catalogs/catalog`);
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
          value: data[i].Id_Catalog, label: data[i].Short_Desc 
        })
      }
      console.log(optionsAux)
      setDataCountries(optionsAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los catálogos" + err);
    });
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de general parameters para revisar el path de los logos
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/general-parameters/`);

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
        var aux = data.find( o => o.Id_Catalog === 1 )
        setPathLogo(aux.Value)
        var aux2 = data.find( o => o.Id_Catalog === 8 )
        setProfilePath(aux2.Value)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los general parameters" + err);
    });
  }, []);

   //Renderizado condicional
  function Customers() {
      return <CustomersTable dataTable = {dataCustomers} dataCountries = {dataCountries} updateAddData = {updateAddData} pathLogo = {pathLogo} ip={ip} profilePath = {profilePath} autoCloseAlert = {autoCloseAlert}/>;
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R",
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/customers/`);

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
      setDataCustomers(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los customers" + err);
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
    setMessage(
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
    setMessage(null);
  };

  return dataCountries.length === 0 ? (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Clientes</CardTitle>
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
            
            <Card >
              <CardHeader>
                <CardTitle tag="h4">Clientes</CardTitle>
              </CardHeader>
              <CardBody>
                <Customers/>
                {message}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Clientes;