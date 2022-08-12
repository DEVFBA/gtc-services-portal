import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";

// core components
import ModalAddAsignacionTimbres from "views/components/Modals/ModalAddAsignacionTimbres.js";
import AsignacionTimbresTable from "../components/AsignacionTimbres/AsignacionTimbresTable";

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

function AsignacionTimbres() {
    
    const token = localStorage.getItem("Token"); 
    
    //Para guardar los datos del control de timbres por cliente
    const [dataCustomerStamping, setDataCustomerStamping] = useState([])
    const [dataFind, setDataFind] = useState(true);

    //Para guardar los datos de los usuarios
    const [dataCustomers, setDataCustomers] = useState([]);

    const [ip, setIP] = useState("");

    const [alert, setAlert] = React.useState(null);

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }
    
    useEffect(() => {
        //Descargamos la IP del usuario
        getData()
    }, []);

    useEffect(() => {
        var url = new URL(`${process.env.REACT_APP_API_URI}customers-stamping/`);

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
            setDataCustomerStamping(data);
            getCustomers();
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los customer stampings" + err);
        });
        setDataFind(false);
    }, []);

    function getCustomers()
    {
        //Aqui vamos a descargar la lista de usuarios de la base de datos por primera vez
        const params = {
          pvOptionCRUD: "R",
        };
    
        var url = new URL(`${process.env.REACT_APP_API_URI}customers/`);
    
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
           //Creamos el arreglo de customers para el select
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
                optionsAux.push({
                    value: data[i].Id_Customer, label: data[i].Name
                })
            }
            console.log(optionsAux)
            setDataCustomers(optionsAux)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los customers" + err);
        });
    }

    //Renderizado condicional
    function AsignacionTimbresT() {
        return <AsignacionTimbresTable dataTable = {dataCustomerStamping}/>;
    }

    const autoCloseAlert = (mensaje) => {
        console.log("entre al alert")
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

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        setDataFind(true)
        var url = new URL(`${process.env.REACT_APP_API_URI}customers-stamping/`);

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
        setDataCustomerStamping(data)
        setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los Customers Stamping" + err);
        });
    }

    const [modalAddRecord, setModalAddRecord] = useState(false);

    function toggleModalAddRecord(){
        if(modalAddRecord == false){
        setModalAddRecord(true);
        }
        else{
        setModalAddRecord(false);
        }
    }

    return dataFind === true ? (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Asignacion de Timbres</CardTitle>
                                <Button color="primary" onClick={toggleModalAddRecord}>
                                    <span className="btn-label">
                                        <i className="nc-icon nc-simple-add" />
                                    </span>
                                    Añadir Asignación
                                </Button>
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
                                <CardTitle tag="h4">Asignacion de Timbres</CardTitle>
                                <Button color="primary" onClick={toggleModalAddRecord}>
                                    <span className="btn-label">
                                        <i className="nc-icon nc-simple-add" />
                                    </span>
                                    Añadir Asignación
                                </Button>
                            </CardHeader>
                            <CardBody>
                                {alert}
                                {dataCustomerStamping.length === 0 ? (
                                    <h3>No hay datos</h3>
                                ):
                                    <AsignacionTimbresT />
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/*MODAL PARA AÑADIR REGISTROS*/}
            <ModalAddAsignacionTimbres modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataCustomers = {dataCustomers} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert} /> 
        </>
    );
}

export default AsignacionTimbres;