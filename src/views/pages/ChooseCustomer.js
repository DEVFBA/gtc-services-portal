import React from "react";
import axios from 'axios'

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

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

function ChooseCustomer() {
  
    const history = useHistory();

    //Para guardar el customer elegido
    const [customer, setCustomer] = React.useState({});
    
    //Para guardar la lista de opciones de los customers
    const [dataOptions, setDataOptions] = React.useState([]);

    //Para guardar el estado del select
    const [customerState, setCustomerState] = React.useState("");

    const [error, setError] = React.useState();
    const [errorState, setErrorState] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const ambiente = process.env.REACT_APP_ENVIRONMENT

    useEffect(() => {
        var url = new URL(`${process.env.REACT_APP_API_URI}security-users/${user}`);
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
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
              optionsAux.push({
                value: data[i].Id_Customer, label: data[i].Customer 
              })
            }
            setDataOptions(optionsAux)      
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion del usuario" + err);
        });
    }, []);

    React.useEffect(() => {
        document.body.classList.toggle("register-page");
        return function cleanup() {
        document.body.classList.toggle("register-page");
        };
    });

    const isValidated = () => {
        if (customerState === "has-success") 
        {
          return true;
        } else {
          if (customerState !== "has-success") {
            setCustomerState("has-danger");
          }
          return false;
        }
    };

    const registerClick = () => {
        
        if(isValidated()===true)
        {
           //haremos el fetch a la base de datos para agregar el registro
           //Guardamos todos los datos en el localstorage
           localStorage.setItem("Id_Customer", customer.value)
           history.push(ambiente + "/admin/dashboard");
        }
    };
    
    return (
        <div className="register-page">
        <Container>
            <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-signup text-center">
                <CardHeader>
                    <CardTitle tag="h4">Elige el cliente con el que quieres trabajar</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form action="" className="form" method="">
                    <FormGroup className={`has-label ${customerState}`}>
                            <Label for="exampleSelect">Rol * </Label>
                            <Select
                                name=""
                                placeholder="Selecciona un cliente"
                                className="react-select"
                                classNamePrefix="react-select"
                                value={customer}
                                onChange={(value) => {
                                    console.log(value)
                                    setCustomer(value)
                                    setCustomerState("has-success");
                                }}
                                options={dataOptions}
                            />
                            {customerState === "has-danger" ? (
                                <label className="error">Selecciona un cliente.</label>
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
                require("assets/img/fondo4.png").default
            })`,
            }}
        />
    </div>
  );
}

export default ChooseCustomer;