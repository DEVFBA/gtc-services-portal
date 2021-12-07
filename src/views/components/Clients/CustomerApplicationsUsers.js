import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";

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
      pvOptionCRUD: "R",
      piIdCustomer: idCus,
      pIdApplication: idApp
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}customer-applications-users/`);

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

    var url = new URL(`${process.env.REACT_APP_API_URI}security-users/get-users-customer-role-service/`);

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

    var url = new URL(`${process.env.REACT_APP_API_URI}customer-applications-users/`);

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
        pvIP: ip
    };

    fetch(`${process.env.REACT_APP_API_URI}customer-applications-users/create-customer-application-user`, {
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
                autoCloseAlert(data[0].Code_Message_User)
            }
            else if(data[0].Code_Type === "Error")
            {
                setErrorMessage(data[0].Code_Message_User)
                setErrorState("has-danger")
                autoCloseAlert(data[0].Code_Message_User)
            }
            else{
                setErrorState("has-success");
                //Para actualizar la tabla en componente principal
                updateAddData()
                //Cerramos el modal
                autoCloseAlert(data[0].Code_Message_User)
            }
        }
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

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Usuarios de la Aplicación</CardTitle>
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
                {alert}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CustomerApplicationsUsers;