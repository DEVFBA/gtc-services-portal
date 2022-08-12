/*!

=========================================================
* Componente utilizado para visualizar los datos de la tabla Request Customer Stampings
=========================================================

*/
import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';
import { Link, useHistory } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import RequestCustomerStampingsTable from "../components/RequestCustomerStampings/RequestCustomerStampingsTable";

import { useParams } from "react-router-dom";

function RequestCustomerStampings() {
    const { idCus } = useParams();

    const token = localStorage.getItem("Token"); 

    const [dataRequest, setDataRequest] = useState([])

    const [dataFind, setDataFind] = React.useState(true);

    const ambiente = process.env.REACT_APP_ENVIRONMENT

    const history = useHistory();

    useEffect(() => {
        var url = new URL(`${process.env.REACT_APP_API_URI}request-customer-stamping/${idCus}/`);
       
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
            //Creamos el arreglo de opciones para el select
            console.log(data)
            setDataFind(false)
            setDataRequest(data)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los request customers" + err);
        });
    }, []);

     //Renderizado condicional
    function RequestCustomerS() {
        return <RequestCustomerStampingsTable dataTable = {dataRequest}/>;
    }

    return dataFind === true ? (
        <>
            <div className="content">
                <Row>
                <Col md="12">
                    <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Solicitudes de Timbres</CardTitle>
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
                        <CardTitle tag="h4">Solicitudes de Timbres</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {dataRequest.length === 0 ? (
                            <h1> No hay datos </h1>
                        ):
                            <RequestCustomerS/>
                        }
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </div>
        </>
    );
}   

export default RequestCustomerStampings;