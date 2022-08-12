import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import Skeleton from '@yisheng90/react-loading';

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
import GeneralParametersTable from "../components/GeneralParameters/GeneralParametersTable.js";

function GeneralParameters() {

    const [dataGeneralParameters, setDataGeneralParameters] = useState([]);

    const token = localStorage.getItem("Token");

    const [ip, setIP] = React.useState("");

    const [alert, setAlert] = React.useState(null);

    const [dataFind, setDataFind] = useState(true)

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }

    useEffect(() => {
        //Descargamos la IP del usuario
        getData()
    }, []);

    useEffect(() => {
        //Aqui vamos a descargar la lista de general parameters para revisar el path de los logos
        const params = {
        pvOptionCRUD: "R"
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/`);

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
           setDataGeneralParameters(data)
           setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los general parameters" + err);
        });
    }, []);

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

    //Renderizado condicional
    function GeneralParametersT() {
        return <GeneralParametersTable dataTable = {dataGeneralParameters} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        setDataFind(true)
        const params = {
            pvOptionCRUD: "R"
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/`);

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
            setDataGeneralParameters(data)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los parámetros generales" + err);
        });
    }

    return dataFind === true ? (
        <>
            <div className="content">
                <Row>
                <Col md="12">
                    <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Catálogo de Parámetros Generales</CardTitle>
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
                        <CardTitle tag="h4">Catálogo de Parámetros Generales</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {alert}
                        {dataGeneralParameters.length === 0 ? (
                        <div className ="no-data">
                            <h3>No hay datos</h3>
                        </div>
                        ): 
                            <GeneralParametersT />
                        }
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        </>
    );
}

export default GeneralParameters;