import React, { useState, useEffect } from "react";

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

  const [registerUser, setregisterUser] = React.useState("");
  const [registerUserState, setregisterUserState] = React.useState("");
  const [error, setError] = React.useState();
  const [errorState, setErrorState] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

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
        console.log(aux.Value)
        //setValidDays(aux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los general parameters" + err);
    });
  }, []);

   //Renderizado condicional
  function Customers() {
      return <CustomersTable dataTable = {dataCustomers} dataCountries = {dataCountries} updateAddData = {updateAddData} pathLogo = {pathLogo}/>;
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

  return dataCountries.length === 0 ? (
    <>
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Clientes</CardTitle>
              </CardHeader>
              <CardBody>
                <Customers />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Clientes;