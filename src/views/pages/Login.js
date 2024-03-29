/*!

=========================================================
* Paper Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect} from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";
import Cargando from "assets/img/loading_icon.gif";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const logged = localStorage.getItem("Logged");

  const [errorState, setErrorState] = React.useState("");
  const [error, setError] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState("");

  const ambiente = process.env.REACT_APP_ENVIRONMENT

  //Para el alert de cargando login
  const [alert2, setAlert2] = React.useState(null);

  const autoCloseAlert2 = (mensaje) => {
    console.log("entre al alert")
    setAlert2(
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title=""
        onConfirm={() => hideAlert()}
        showConfirm={false}
      >
        <Row>
          <Col sm="4">
          </Col>
          <Col sm="4">
            <img 
              src = {Cargando} 
              style ={{ width: "50px", height: "50px" }}
            />
          </Col>
          <Col sm="4">
          </Col>
        </Row>
        &nbsp;
        {mensaje}
      </ReactBSAlert>
    );
  };

  const hideAlert2 = () => {
    setAlert2(null);
  };

  useEffect(() => {
    //Si el usuario ya ha iniciado sesión que se le redirija al dashboard
    //Por el momento se usará la bandera logged
    if(logged==="true")
    {
      history.push(ambiente + "/admin/dashboard");
    }
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onSubmitForm(event) {
    event.preventDefault();
    autoCloseAlert2("Iniciando Sesión...")
    const catRegister = {
      pvIdUser: email,
      pvPassword: password
    };

    fetch(`${process.env.REACT_APP_API_URI}security-users/login/`, {
        method: "POST",
        body: JSON.stringify(catRegister),
        headers: {
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
            if(data[0].Code_Type === "Error")
            {
                hideAlert2()
                setErrorState("has-danger")
                setErrorMessage(data[0].Code_Message_User)
            }
            else{
                setErrorState("has-success");
                //Obtenemos la información del usuario y la guardamos en el useContext
                getUser(email, data[1].token)
            }
        }
    });

    //Aquí se hará el fetch a la API 
    //Por el momento se va a guardar en el local storage una bandera para simular el token
    

    //Vamos a tener 3 tipos de usuario, dependiendo cual sea se les van a mostrar cosas diferentes en la aplicación
    //Por el momento guardaremos el tipo de usuario en el localstorage, pero eso se tiene que saber en la aplicación de usuario que va "abrazar" todo el sitio una vez que se haya loggeado
    
  }

  function getUser(email, token){
    console.log(email)

    var url = new URL(`${process.env.REACT_APP_API_URI}security-users/${email}`);
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
        hideAlert2()
        if(data.length > 1)
        {
          localStorage.setItem("User", data[0].User);
          localStorage.setItem("Id_Role", data[0].Id_Role)
          localStorage.setItem("Token", token)
          localStorage.setItem("Logged", true)
          history.push(ambiente + "/auth/choose-customer");
        }
        else
        {
          //Comparar fechas
          var f1 = new Date();
          var f2 = new Date(data[0].Final_Effective_Date)
          if(data[0].Temporal_Password===true)
          {
            localStorage.setItem("User", data[0].User);
            localStorage.setItem("Id_Customer", data[0].Id_Customer)
            localStorage.setItem("Id_Role", data[0].Id_Role)
            localStorage.setItem("Token", token)
            history.push(ambiente + "/auth/edit-password");
          }
          else if (data[0].Final_Effective_Date === "NULL")
          {
            localStorage.setItem("User", data[0].User);
            localStorage.setItem("Id_Customer", data[0].Id_Customer)
            localStorage.setItem("Id_Role", data[0].Id_Role)
            localStorage.setItem("Token", token)
            history.push(ambiente + "/auth/edit-password");      
          }
          else if(f2 < f1)
          {
            localStorage.setItem("User", data[0].User);
            localStorage.setItem("Id_Customer", data[0].Id_Customer)
            localStorage.setItem("Id_Role", data[0].Id_Role)
            localStorage.setItem("Token", token)
            history.push(ambiente + "/auth/edit-password");
          }
          else{
            localStorage.setItem("User", data[0].User);
            localStorage.setItem("Id_Customer", data[0].Id_Customer)
            localStorage.setItem("Id_Role", data[0].Id_Role)
            localStorage.setItem("Token", token)
            localStorage.setItem("Logged", true)
            history.push(ambiente + "/admin/dashboard");
          }
        }
        
        
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion del usuario" + err);
    });
  }

  

  return (
    <div className="login-page">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="form" onSubmit={onSubmitForm} >
              <Card className="card-login">
                <CardHeader>
                  <CardHeader>
                    <h3 className="header text-center">Iniciar Sesión</h3>
                  </CardHeader>
                </CardHeader>
                <CardBody>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type = "email"
                      name = "email"
                      placeholder="Email"
                      onChange={onChangeEmail} />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Contraseña"
                      type="password"
                      autoComplete="off"
                      onChange={onChangePassword}
                    />
                  </InputGroup>
                  <br />
                </CardBody>
                <CardFooter>
                  <div className="btn-login">
                    <Button type="submit" className="btn-round mb-3" color="primary">
                      Iniciar Sesión
                    </Button>
                  </div>
                  {error}
                  <FormGroup className={`has-label ${errorState}`}>
                    {errorState === "has-danger" ? (
                            <label className="error">{errorMessage}</label>
                    ) : null}
                  </FormGroup>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
        {alert2}
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${
            require("assets/img/fondo4.png").default
          })`,
        }}
      />
    </div>
  );
}

export default Login;
