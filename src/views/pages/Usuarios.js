import React, { useState, useEffect } from "react";

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
import UsersTable from "../components/Users/UsersTable.js";

function Usuarios() {

  //Para actualizar cada que agreguen un campo a la tabla
  const [updateTable, setUpdateTable] = useState(0);

  //Para guardar los datos de los usuarios
  const [dataUsers, setDataUsers] = useState([]);

  //Para guardar los datos de los roles
  const [dataRoles, setDataRoles] = useState([]);

  useEffect(() => {
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`http://localhost:8091/api/security-users/`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    console.log(url)

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(function(response) {
        return response.ok ? response.json() : Promise.reject();
    })
    .then(function(data) {
      setDataUsers(data)
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

    var url = new URL(`http://localhost:8091/api/security-roles/`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url, {
        method: "GET",
        headers: {
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

  return dataUsers.length === 0 ? (
    <>
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Users Catalog</CardTitle>
              </CardHeader>
              <CardBody>
                <UsersTable dataTable = {dataUsers} dataRoles = {dataRoles}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Usuarios;
