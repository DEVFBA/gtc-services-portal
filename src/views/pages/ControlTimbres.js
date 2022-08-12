import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';
import { Link, useHistory } from "react-router-dom";

// core components
import ControlTimbresTable from "../components/ControlTimbres/ControlTimbresTable";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

function ControlTimbres() {
    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const history = useHistory();
    const token = localStorage.getItem("Token"); 
    const customer = localStorage.getItem("Id_Customer")
    
    //Para guardar los datos del control de timbres por cliente
    const [dataControlTimbres, setDataControlTimbres] = useState([])
    const [dataFind, setDataFind] = React.useState(true);

    useEffect(() => {
        var url = new URL(`${process.env.REACT_APP_API_URI}customers-stamping/${customer}/`);

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
        setDataFind(false);
        setDataControlTimbres(data);
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los customer stampings" + err);
        });
    }, []);

    //Renderizado condicional
    function ControlTimbre() {
        return <ControlTimbresTable dataTable = {dataControlTimbres}/>;
    }

    return dataFind === true ? (
        <>
        <div className="content">
            <Row>
            <Col md="12">
                <Card>
                <CardHeader>
                    <CardTitle tag="h4">Control Timbres</CardTitle>
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
                        <CardTitle tag="h4">Control Timbres</CardTitle>
                        <Button color="primary" onClick={() => {
                                history.push(ambiente + `/admin/request-customer-stampings/${customer}`)
                            }}>
                            <span className="btn-label">
                            <i className="nc-icon nc-simple-add" />
                            </span>
                            Ver Detalle
                        </Button>
                    </CardHeader>
                    <CardBody>
                        {dataControlTimbres.length === 0 ? (
                            <h3>No hay datos</h3>
                        ):
                            <ControlTimbre />
                        }
                        {alert}
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </div>
        </>
    );
}

export default ControlTimbres;