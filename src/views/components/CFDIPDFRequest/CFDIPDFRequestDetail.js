import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from '@yisheng90/react-loading';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import CFDIPDFRequestDetailTable from "./CFDIPDFRequestDetailTable.js";

  function CFDIPDFRequestDetail() {
  const { idCus, idReq } = useParams();

  //Para guardar los datos de los usuarios
  const [dataCFDIDetail, setDataCFDIDetail] = useState([]);
  
  const token = localStorage.getItem("Token");

  useEffect(() => {
    console.log(idCus)
    //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R",
      piIdCustomer : idCus,
      pvRequestCustomer: idReq
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cfdi-pdf-requests/customer-cfdi-pdf/`);

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
        console.log(data)
        setDataCFDIDetail(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los CFDI" + err);
    });
  }, []);

   //Renderizado condicional
  function CFDIPDFDetail() {
      return <CFDIPDFRequestDetailTable dataTable = {dataCFDIDetail}/>;
  }

  return dataCFDIDetail.length === 0 ? (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CFDI PDF Request Details</CardTitle>
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
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CFDI PDF Request Details</CardTitle>
              </CardHeader>
              <CardBody>
                <CFDIPDFDetail />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CFDIPDFRequestDetail;