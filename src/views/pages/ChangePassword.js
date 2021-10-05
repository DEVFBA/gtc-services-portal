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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import { useState, useEffect} from "react";

function Register() {
  
    const history = useHistory();

    const [registerPassword, setregisterPassword] = React.useState("");
    const [registerConfirmPassword, setregisterConfirmPassword] = React.useState("");

    const [registerPasswordState, setregisterPasswordState] = React.useState("");
    const [registerConfirmPasswordState, setregisterConfirmPasswordState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    //Para guardar los días transcurridos
    const [validDays, setValidDays] = React.useState();

    const Logged = localStorage.getItem("Logged");
    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("Id_Role");
    const [customer, setCustomer] = React.useState("");
    const name = localStorage.getItem("Name");

    const ambiente = "/DEV"

    useEffect(() => {
        //Aqui vamos a descargar la lista de general parameters para revisar la vigencia del password
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
            var aux = data.find( o => o.Id_Catalog === 3 )
            setValidDays(parseInt(aux.Value,10))
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los general parameters" + err);
        });
    }, []);

    useEffect(() => {
        //Si el usuario no está loggeado no se va a descargar la imagen
        if(Logged === "true")
        {
          var url = new URL(`http://129.159.99.152/develop-api/api/security-users/${user}`);
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
              setCustomer(data[0].Id_Customer)
          })
          .catch(function(err) {
              alert("No se pudo consultar la informacion del usuario" + err);
          });
        }  
    },[]);

    React.useEffect(() => {
        document.body.classList.toggle("register-page");
        return function cleanup() {
        document.body.classList.toggle("register-page");
        };
    });

    // function that verifies if two strings are equal
    const compare = (string1, string2) => {
        if (string1 === string2) {
        return true;
        }
        return false;
    };

    const verifyPassword = (value) => {
        var passwordRex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,50}$/;
        if (passwordRex.test(value)) {
        return true;
        }
        return false;
    };

    const isValidated = () => {
        if (
            registerPasswordState === "has-success" &&
            registerConfirmPasswordState === "has-success"
        ) {
          return true;
        } else {
          if (registerPasswordState !== "has-success") {
            setregisterPasswordState("has-danger");
          }
          if (registerConfirmPasswordState !== "has-success") {
            setregisterConfirmPasswordState("has-danger");
          }
          return false;
        }
    };

    const registerClick = () => {
        
        if(isValidated()===true)
        {
           //haremos el fetch a la base de datos para agregar el registro
           updateRegister()
        }
        else{
            console.log("no entre")
        }
    };

    /* Función que suma o resta días a una fecha, si el parámetro
    días es negativo restará los días*/
    function sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    function updateRegister(){

        var d = new Date();
        var finalDate = sumarDias(d, validDays);
        var date = finalDate.getDate();
        var month = finalDate.getMonth() + 1
        var year = finalDate.getFullYear()

        var finalDate2 = "" 
        if(month < 10 && date < 10)
        {
            finalDate2 = "" + year + "0" + month + "0" + date;  
        }
        else if(date < 10)
        {
            finalDate2 = "" + year + "" + month + "0" + date;
        }
        else if(month < 10) 
        {  
            finalDate2 = "" + year + "0" + month + "" + date;
        }
        else{
            finalDate2 = "" + year + "" + month + "" + date;
        }  
        
        //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
        const catRegister = {
            pvOptionCRUD: "U",
            piIdCustomer : customer,
            pvIdUser: user,
            pvIdRole: role,
            pvName: name,
            pvPassword: registerPassword,
            pbTempPassword: false,
            pvFinalEffectiveDate: finalDate2,
            pvUser: user,
        };

        fetch(`http://129.159.99.152/develop-api/api/security-users/update-user-pass/`, {
            method: "PUT",
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
                if(data[0].Code_Type === "Error")
                {
                    setErrorMessage(data[0].Code_Message_User)
                    setErrorState("has-danger")
                }
                else{
                    setErrorState("has-success");
                   
                    history.push(ambiente + "/admin/dashboard");
                }
            }
        });
    }
    
    return (
        <div className="register-page">
        <Container>
            <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-signup text-center">
                <CardHeader>
                    <CardTitle tag="h4">Change Password</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form action="" className="form" method="">
                    <FormGroup className={`has-label ${registerPasswordState}`}>
                        <label>Password *</label>
                        <Input
                            id="registerPassword"
                            name="password"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => {
                            if (!verifyPassword(e.target.value)) {
                                setregisterPasswordState("has-danger");
                            } else {
                                setregisterPasswordState("has-success");
                            }
                            setregisterPassword(e.target.value);
                            }}
                        />
                        {registerPasswordState === "has-danger" ? (
                            <label className="error">La contraseña debe tener una longitud mínima de 10 caracteres, al menos un número, una letra mayúscula y minúscula, y un caracter especial.</label>
                        ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${registerConfirmPasswordState}`}>
                        <label>Confirm Password *</label>
                        <Input
                            equalto="#registerPassword"
                            id="registerPasswordConfirmation"
                            name="password_confirmation"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => {
                            if (!compare(e.target.value, registerPassword)) {
                                setregisterConfirmPasswordState("has-danger");
                                //setregisterPasswordState("has-danger");
                            } else {
                                setregisterConfirmPasswordState("has-success");
                                //setregisterPasswordState("has-success");
                            }
                            setregisterConfirmPassword(e.target.value);
                            }}
                        />
                    {registerConfirmPasswordState === "has-danger" ? (
                        <label className="error">La contraseña no coincide.</label>
                    ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${errorState}`}>
                        {errorState === "has-danger" ? (
                                <label className="error">{errorMessage}</label>
                        ) : null}
                    </FormGroup>
                    </Form>
                </CardBody>
                <CardFooter>
                    <Button
                    className="btn-round"
                    color="info"
                    onClick={registerClick}
                    >
                    Enviar
                    </Button>
                </CardFooter>
                </Card>
            </Col>
            </Row>
        </Container>
        <div
            className="full-page-background"
            style={{
            backgroundImage: `url(${
                require("assets/img/logo-gtc.jpg").default
            })`,
            }}
        />
    </div>
  );
}

export default Register;