import React from 'react'
import { useState, useEffect} from "react";
import axios from 'axios'
import Skeleton from '@yisheng90/react-loading';
import ReactBSAlert from "react-bootstrap-sweetalert";

import CustomerItemsTaxesTable from '../components/CustomerItemsTaxes/CustomerItemsTaxesTable';
import ModalAddCustomerItemTaxes from "../components/CustomerItemsTaxes/ModalAddCustomerItemTaxes";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    FormGroup,
} from "reactstrap";

import Select from "react-select";

function ItemTaxes(){
    //Para guardar los datos del cliente - items taxes
    const [dataCustomerItemsTaxes, setDataCustomerItemsTaxes] = useState([]);

    //Para guardar los datos del cliente - items
    const [dataCustomerItems, setDataCustomerItems] = useState([]);

    /*INFORMACION RELACIONADA A LOS CLIENTES*/

    //Guardar la información de todos los clientes
    const [dataCustomers, setDataCustomers] = useState([]);

    //Guardar el cliente elegido en el select
    const [customer, setCustomer] = useState("");

    /*INFORMACIÓN RELACIONADA A LOS MODALES PARA AGREGAR Y ACTUALIZAR*/
    const [dataFactorTypes, setDataFactorTypes] = useState([]);

    const [dataTaxes, setDataTaxes] = useState([]);

    //Para guardar el token de la sesión
    const token = localStorage.getItem("Token");

    //Para guardar el rol loggeado
    const role = localStorage.getItem("Id_Role");

    //Para guardar el cliente loggeado
    const customerLogged = localStorage.getItem("Id_Customer");

    //Para guardar la direccion IP del usuario
    const [ip, setIP] = React.useState("");

    /*PARA LA CARGA DE INFORMACION*/

    //Para descargar toda la información inicialmente
    const [dataFind, setDataFind] = useState(true)

    //Para descargar la informacion de un cliente - item taxes
    const [dataFindCustomerItemsTaxes, setDataFindCustomerItemsTaxes] = useState(true)

    //Para el manejo de errores
    const [dataError, setDataError] = useState(false);

    const [dataErrorMessage, setDataErrorMessage] = useState("");

    //Para los mensajes de alerta
    const [alert, setAlert] = React.useState(null);

    const getData = async () => {
        try{
            let response = await axios({
                method: 'get',
                url: "https://geolocation-db.com/json/",
                json: true
            })
            setIP(response.data.IPv4)
        } catch(err){
              return {
                mensaje: "Error al obtener IP",
                error: err
              }
        }
    }
    
    useEffect(() => {
        //Descargamos la IP del usuario
        getData()
    }, []);

    //Primero vamos a descargar la lista de clientes para el select
    useEffect(() => {
        const params = {
            pvOptionCRUD: "R"
        };
      
        var url = new URL(`${process.env.REACT_APP_API_URI}customers/`);
    
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
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
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
                optionsAux.push({
                    value: data[i].Id_Customer, label: data[i].Name
                })
            }
            setDataCustomers(optionsAux);

            //Información de los Tipos de Factor
            getDataFactorTypes();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los clientes. ")
        });
    }, [])

    //Tipos de Factor
    function getDataFactorTypes()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Factor_Types_CRUD_Records",
        };
      
        var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);
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
            //Creamos el arreglo de opciones para el select
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
                optionsAux.push({
                value: data[i].Id_Catalog, label: data[i].Id_Catalog + " - " + data[i].Short_Desc 
                })
            }
            setDataFactorTypes(optionsAux);

            //Información de los impuestos
            getTaxes()
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" del catálogo de Tipos de Factor. ")
        });
    }

    function getTaxes()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Taxes_CRUD_Records",
          };
      
        var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);
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
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
                optionsAux.push({
                value: data[i].Id_Catalog, label: data[i].Id_Catalog + " - " + data[i].Short_Desc 
                })
            }
            setDataTaxes(optionsAux);
            setDataFind(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" del catálogo de Impuestos. ")
        });
    }

    useEffect(() => {
        if(role === "CUSAPPLI")
        {
            var url = new URL(`${process.env.REACT_APP_API_URI}customers/${customerLogged}`);
          
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
                setCustomer(
                    {value: customerLogged,
                    label: data[0].Name}
                )
            })
            .catch(function(err) {
                setDataError(true);
                setDataErrorMessage(" de los clientes. ")
            });
        }
    },[])

    //Para descargar la información del Cliente - Item Taxes de acuerdo al cliente elegido
    useEffect(() => {
        if(customer.value !== undefined)
        {
            //descargamos la información
            setDataFindCustomerItemsTaxes(true);
          
            var url = new URL(`${process.env.REACT_APP_API_URI}customer-items-taxes/${customer.value}`);
          
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
                setDataCustomerItemsTaxes(data);
                getCustomerItems();
            })
            .catch(function(err) {
                setDataError(true);
                setDataErrorMessage(" de los Clientes - Items Taxes. ")
            });
        }
    }, [customer]);

    function getCustomerItems()
    {
        if(customer.value !== undefined)
        { 
            var url = new URL(`${process.env.REACT_APP_API_URI}customer-items/${customer.value}`);
          
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
                var optionsAux = [];
                var i;
                for(i=0; i<data.length; i++)
                {
                    optionsAux.push({
                    value: data[i].Id_Item, label: data[i].Id_Item + " - " + data[i].Short_Desc 
                    })
                }
                setDataCustomerItems(optionsAux);
                setDataFindCustomerItemsTaxes(false);
            })
            .catch(function(err) {
                setDataError(true);
                setDataErrorMessage(" de los Clientes - Items. ")
            });
        }
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        //descargamos la información
        setDataFindCustomerItemsTaxes(true);
            
        var url = new URL(`${process.env.REACT_APP_API_URI}customer-items-taxes/${customer.value}`);
        
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
            setDataCustomerItemsTaxes(data);
            setDataFindCustomerItemsTaxes(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los Customer Items Taxes. ")
        });
    }

    //Renderizado condicional
    function Catalog() {
        if (customer.value !== undefined) {
            if(dataFindCustomerItemsTaxes === true)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else 
            {
                return <CustomerItemsTaxesTable dataTable = {dataCustomerItemsTaxes} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} toggleModalAddRecord = {toggleModalAddRecord} dataFactorTypes = {dataFactorTypes} dataTaxes = {dataTaxes} dataCustomerItems = {dataCustomerItems}/>;
            }
        }
        return <p></p>
    }

    const [modalAddRecord, setModalAddRecord] = useState(false);

    function toggleModalAddRecord(){
        if(modalAddRecord == false){
            setModalAddRecord(true);
        }
        else{
            setModalAddRecord(false);
        }
        console.log(modalAddRecord)
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

    return dataFind === true ? (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Clientes - Artículos Impuestos</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div>
                                    <Skeleton height={25} />
                                    <Skeleton height="25px" />
                                    <Skeleton height="3rem" />
                                </div>
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
                            <CardTitle tag="h4">Clientes - Artículos Impuestos</CardTitle>
                            {role !== "CUSAPPLI" ? (
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                        {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                                        <Select 
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder = "Selecciona un cliente para administrar sus artículos impuestos"
                                            options = {dataCustomers}
                                            value = {customer}
                                            onChange={(e) => {
                                                setCustomer(e);
                                            }}
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            ): null}
                        </CardHeader>
                        <CardBody>
                                <Catalog/>
                                {alert}
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
                
                {/*MODAL PARA AÑADIR REGISTROS DE Clientes - Items Taxes*/}
                <ModalAddCustomerItemTaxes modalAddRecord = {modalAddRecord} setModalAddRecord = {toggleModalAddRecord} ip = {ip}  autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataFactorTypes = {dataFactorTypes} dataTaxes = {dataTaxes} dataCustomerItems = {dataCustomerItems} customerE = {customer}/>
            </div>
        </>
    )
}

export default ItemTaxes