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
import CustomerApplicationsUsersTable from "./CustomerApplicationsUsersTable.js";
import { useParams } from "react-router-dom";

function CustomerApplicationsUsers() {

  //Para guardar los datos de los usuarios
  const [dataUsers, setDataUsers] = useState([]);

  //Para guardar los datos de las aplicaciones
  const [dataApplications, setDataApplications] = useState([]);

  //Para guardar los datos de los usuarios Customer - Role Service
  const [dataCustomersUsers, setCustomersUsers] = useState([]);

  const { idApp } = useParams();
  const { idCus } = useParams();

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
      piIdCustomer: idCus,
      pIdApplication: idApp
    };

    var url = new URL(`http://localhost:8091/api/customer-applications-users/`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    console.log(url)

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
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los usuarios" + err);
    });
  }, []);


  useEffect(() => {
    //Aqui vamos a descargar la lista de customers de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R",
      piIdCustomer: idCus
    };

    var url = new URL(`http://localhost:8091/api/security-users/get-users-customer-role-service/`);

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
            value: data[i].User, label: data[i].Name
          })
        }
        setCustomersUsers(optionsAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los Customers Users Role - Service" + err);
    });
  }, []);

   //Renderizado condicional
  function CustomerApplication() {
      return <CustomerApplicationsUsersTable dataTable = {dataUsers}/>;
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R",
      piIdCustomer: idCus,
      pIdApplication: idApp
    };

    var url = new URL(`http://localhost:8091/api/customer-applications-users/`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    console.log(url)

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
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los usuarios" + err);
    });
  }

  const isValidated = () => {
    if (
        registerUserState === "has-success"
    ) {
      return true;
    } else {
      if (registerUserState !== "has-success") {
        setregisterUserState("has-danger");
      }

      return false;
    }
  };

  const registerClick = () => {
        
    if(isValidated()===true)
    {
       //haremos el fetch a la base de datos para agregar el registro
       addRegister()
    }
    else{
        console.log("no entre")
    }
  };

  function addRegister(){
    const catRegister = {
        pvOptionCRUD: "C",
        piIdCustomer: idCus,
        pIdApplication: idApp,
        pvIdUser: registerUser.value,
        pvUser: user,
    };

    fetch(`http://localhost:8091/api/customer-applications-users/create-customer-application-user`, {
        method: "POST",
        body: JSON.stringify(catRegister),
        headers: {
            "access-token": token,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.errors) {
            setError(
                <p>Hubo un error al realizar tu solicitud</p>
            );
        }
        else{
            if(data[0].Code_Type === "Warning")
            {
                setErrorMessage(data[0].Code_Message_User)
                setErrorState("has-danger")
            }
            else if(data[0].Code_Type === "Error")
            {
                setErrorMessage(data[0].Code_Message_User)
                setErrorState("has-danger")
            }
            else{
                setErrorState("has-success");
                //Para actualizar la tabla en componente principal
                updateAddData()
                //Cerramos el modal
                handleModalClick()
            }
        }
    });
  } 

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Customer Applications Users</CardTitle>
                <Form id="RegisterValidation">
                  <FormGroup className={`has-label ${registerUserState}`}>
                      <Label for="exampleSelect">Usuario * </Label>
                      <Select
                          name=""
                          className="react-select"
                          placeholder="Selecciona un usuario"
                          classNamePrefix="react-select"
                          value={registerUser}
                          onChange={(value) => {
                              setregisterUser(value)
                              setregisterUserState("has-success");
                          }}
                          options={dataCustomersUsers}
                      />
                      {registerUserState === "has-danger" ? (
                          <label className="error">Selecciona un usuario.</label>
                      ) : null}
                  </FormGroup>
                  <FormGroup className={`has-label ${errorState}`}>
                      {errorState === "has-danger" ? (
                              <label className="error">{errorMessage}</label>
                      ) : null}
                  </FormGroup>
                  {error}
                </Form>
                <Button color="primary" onClick={registerClick}>
                        <span className="btn-label">
                        <i className="nc-icon nc-simple-add" />
                        </span>
                        Agregar usuario
                </Button>
              </CardHeader>
              <CardBody>
                <CustomerApplication />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CustomerApplicationsUsers;