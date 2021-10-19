import React, { useState } from "react";
import MD5 from "crypto-js/md5";
import axios from 'axios'

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
  FormText,
  Row,
  Col,
} from "reactstrap";

function RegularForms() {
  const [cadena, setCadena] = useState("");
  const [cadenaString, setCadenaString] = useState("");
  const [cadenaState, setCadenaState] = useState("");

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
    return true;
    }
    return false;
  };

  const isValidated = () => {
    if (
        cadenaState === "has-success"
    ) {
      return true;
    } else {
      if (cadenaState !== "has-success") {
        setCadenaState("has-danger");
      }
      return false;
    }
  };

  const convertClick = () => {
    if(isValidated()===true)
    {
        //setCadenaString(MD5(cadena).toString())
        convertirCadena(cadena)
        //haremos el fetch a la base de datos para agregar el registro
    }
  };

  const convertirCadena= async (cadena) => {
    console.log(cadena)
    const cadenaC = {
      text: cadena,
    };

    console.log(cadenaC)

    fetch(`http://localhost:9000/api/encrypt/create`, {
        method: "POST",
        body: JSON.stringify(cadenaC),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
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
          setCadenaString(data)
      }
    });
  }

  return (
    <>
      <div className="content">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Encriptado</CardTitle>
              </CardHeader>
              <CardBody>
                <Form id="RegisterValidation">
                  <label>Cadena *</label>
                  <FormGroup className={`has-label ${cadenaState}`}>
                    <Input
                      placeholder="Ingresa cadena a convertir" 
                      type="text"
                      onChange={(e) => {
                        if (!verifyLength(e.target.value, 1)) {
                            setCadenaState("has-danger");
                        } else {
                            setCadenaState("has-success");
                        }
                        setCadena(e.target.value);
                    }} />
                    {cadenaState === "has-danger" ? (
                      <label className="error">
                        Este campo es requerido.
                      </label>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                      <label>Cadena MD5</label>
                      <Input
                          name="text"
                          type="tex"
                          value = {cadenaString}
                          readOnly
                      />
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-round" color="info" onClick={convertClick} >
                  Convertir
                </Button>
              </CardFooter>
            </Card>
      </div>
    </>
  );
}

export default RegularForms;

