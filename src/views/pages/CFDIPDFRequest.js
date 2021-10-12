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
import CFDIPDFRequestTable from "../components/CFDIPDFRequest/CFDIPDFRequestTable.js";

function CFDIPDFRequest() {

  //Para guardar los datos de los usuarios
  const [dataCFDI, setDataCFDI] = useState([]);

  //Para guardar los datos de los roles
  const [dataRoles, setDataRoles] = useState([]);

  const token = localStorage.getItem("Token");

  useEffect(() => {
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/cfdi-pdf-requests/`);

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
        console.log(data[0].Request_Customer)
        var auxData = []
        var contador = 0
        for(var i=0; i< data.length; i++)
        {
            if(i===0)
            {
                auxData[contador] = data[i]
                contador++
                console.log("entre")
            }
            else if(auxData[contador-1].Request_Customer !== data[i].Request_Customer)
            {
                auxData[contador] = data[i]
                contador++
            }
        }
        //console.log(auxData)
        setDataCFDI(auxData)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los CFDI" + err);
    });
  }, []);

   //Renderizado condicional
  function CFDIPDF() {
      return <CFDIPDFRequestTable dataTable = {dataCFDI}/>;
  }

  return dataCFDI.length === 0 ? (
    <>
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CFDI PDF Request</CardTitle>
              </CardHeader>
              <CardBody>
                <CFDIPDF />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CFDIPDFRequest;
