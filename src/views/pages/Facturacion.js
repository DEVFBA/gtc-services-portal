import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';
import { Link, useHistory } from "react-router-dom";

// core components
import FacturacionTable from "../components/Facturacion/FacturacionTable";

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

function Facturacion() {
    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const history = useHistory();
    const token = localStorage.getItem("Token"); 
    const customer = localStorage.getItem("Id_Customer")
    
    //Para guardar los datos del control de timbres por cliente
    const [dataFacturas, setDataFacturas] = useState([])
    const [dataFind, setDataFind] = React.useState(true);

    useEffect(() => {
        /*var url = new URL(`${process.env.REACT_APP_API_URI}customers-stamping/${customer}/`);

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
        });*/
        setDataFind(false);
    }, []);

    //Renderizado condicional
    function FacturasT() {
        return <FacturasTable dataTable = {dataFacturas}/>;
    }

    return dataFind === true ? (
        <>
        <div className="content">
            <Row>
            <Col md="12">
                <Card>
                <CardHeader>
                    <CardTitle tag="h4">Facturación</CardTitle>
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
                        <CardTitle tag="h4">Facturación</CardTitle>
                        <Button color="primary" onClick={() => {
                            history.push(ambiente + `/admin/crear-factura/`)
                        }}>
                            <span className="btn-label">
                            <i className="nc-icon nc-simple-add" />
                            </span>
                            Crear Factura
                        </Button>
                    </CardHeader>
                    <CardBody>
                        {dataFacturas.length === 0 ? (
                            <h3>No hay datos</h3>
                        ):
                            <FacturasT />
                        }
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </div>
        </>
    );
}

export default Facturacion;