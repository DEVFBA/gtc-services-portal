import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import Skeleton from '@yisheng90/react-loading';
import LoadingOverlay from 'react-loading-overlay';
import styled, { css } from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

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
import { createTypePredicateNodeWithModifier } from "typescript";

// core components
import UsersTable from "../components/Users/UsersTable.js";
import ModalAddUser from "views/components/Modals/ModalAddUser.js";

function Usuarios({changeImageP, setChangeImageP}) {

  //Para guardar los datos de los usuarios
  const [dataUsers, setDataUsers] = useState([]);

  //Para guardar los datos de los roles
  const [dataRoles, setDataRoles] = useState([]);

  //Para guardar los datos de los customers
  const [dataCustomers, setDataCustomers] = useState([]);

  //Para guardar los días transcurridos
  const [validDays, setValidDays] = React.useState();

  //Para guardar el path de las imágenes
  const [pathImage, setPathImage] = useState([]);

  const token = localStorage.getItem("Token");

  const [ip, setIP] = React.useState("");

  const [profilePath, setProfilePath] = useState("")

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

    var url = new URL(`${process.env.REACT_APP_API_URI}security-users/`);

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
      setDataUsers(data)
      setDataFind(false)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los roles" + err);
    });
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de roles de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}security-roles/`);

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

        //Creamos el arreglo de roles para el select
        var optionsAux = [];
        var i;
        for(i=0; i<data.length; i++)
        {
          optionsAux.push({
            value: data[i].Id_Role, label: data[i].Short_Desc 
          })
        }
        setDataRoles(optionsAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los roles" + err);
    });
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de customers de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}customers/`);

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

        //Creamos el arreglo de customers para el select
        var optionsAux = [];
        var i;
        for(i=0; i<data.length; i++)
        {
          optionsAux.push({
            value: data[i].Id_Customer, label: data[i].Name
          })
        }
        setDataCustomers(optionsAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los roles" + err);
    });
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de general parameters para revisar la vigencia del password
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/`);

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
        var aux = data.find( o => o.Id_Catalog === 3 )
        var aux2 = data.find( o => o.Id_Catalog === 9 )
        setValidDays(parseInt(aux.Value,10))
        setProfilePath(aux2.Value)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los general parameters" + err);
    });
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de general parameters para revisar el path de los logos
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/`);

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
        var aux = data.find( o => o.Id_Catalog === 2 )
        setPathImage(aux.Value)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los general parameters" + err);
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
    console.log("entre al alert")
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
  function Users() {
      return <UsersTable dataTable = {dataUsers} dataRoles = {dataRoles} dataCustomers = {dataCustomers} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} ip = {ip} profilePath = {profilePath} autoCloseAlert = {autoCloseAlert} changeImageP = {changeImageP} setChangeImageP = {setChangeImageP}/>;
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    setDataFind(true)
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}security-users/`);

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
      setDataUsers(data)
      setDataFind(false)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los usuarios" + err);
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
                <CardTitle tag="h4">Catálogo de Usuarios</CardTitle>
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                  </span>
                  Añadir Usuario 
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
      </div>
      {/*MODAL PARA AÑADIR REGISTROS*/}
      <ModalAddUser modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataRoles = {dataRoles} dataCustomers = {dataCustomers} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} ip = {ip} autoCloseAlert = {autoCloseAlert} /> 
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Catálogo de Usuarios</CardTitle>
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                  </span>
                  Añadir Usuario 
                </Button>
              </CardHeader>
              <CardBody>
                {alert}
                {dataUsers.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                  <Users />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/*MODAL PARA AÑADIR REGISTROS*/}
        <ModalAddUser modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataRoles = {dataRoles} dataCustomers = {dataCustomers} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} ip = {ip} autoCloseAlert = {autoCloseAlert} /> 
      </div>
    </>
  );
}

export default Usuarios;
