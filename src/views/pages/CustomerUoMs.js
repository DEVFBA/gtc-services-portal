import React from 'react'
import { useState, useEffect} from "react";
import axios from 'axios'
import Skeleton from '@yisheng90/react-loading';
import ReactBSAlert from "react-bootstrap-sweetalert";

import CustomerUoMsTable from '../components/CustomerUoMs/CustomerUoMsTable';
/*import ModalAddCompanyVendor from "./ModalAddCompanyVendor.js";
import ModalAddCompany2 from "./ModalAddCompany2";
import ModalAddVendor from ".//ModalAddVendor2";*/
import ModalAddCustomer from "../components/CustomerUoMs/ModalAddCustomer";
import ModalAddCustomUoM from "../components/CustomerUoMs/ModalAddCustomUoM";
import ModalAddCustomerUoM from "../components/CustomerUoMs/ModalAddCustomerUoM.js";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Button,
    Row,
    Col,
    FormGroup,
} from "reactstrap";

import Select from "react-select";
import { event } from 'jquery';

function CustomerUoMs(){
    //Para guardar los datos del cliente - custom uoms
    const [dataCustomerUoMs, setDataCustomerUoMs] = useState([]);

    /*INFORMACION RELACIONADA A LOS CLIENTES*/

    //Guardar la información de todos los clientes
    const [dataCustomers, setDataCustomers] = useState([]);

    //Guardar la información de los países
    const [dataCountries, setDataCountries] = useState([]);

    //Guardar la información requerida para agregar un cliente
    const [pathLogo, setPathLogo] = useState("");
    const [profilePath, setProfilePath] = useState("");

    //Guardar el cliente elegido en el select
    const [customer, setCustomer] = useState({});

    /*INFORMACIÓN RELACIONADA A LOS PRODUCTOS*/
    const [dataCustomUoMs, setDataCustomUoMs] = useState([]);

    //Guardar la custom UoMs creada desde modal
    const [customUoM, setCustomUoM] = useState({});

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

    //Para descargar la informacion de un cliente - productos
    const [dataFindCustomerUoMs, setDataFindCustomerUoMs] = useState(true)

    //Para el manejo de errores
    const [dataError, setDataError] = useState(false);

    const [dataErrorMessage, setDataErrorMessage] = useState("");

    //Para los mensajes de alerta
    const [alert, setAlert] = React.useState(null);

    const getData = async () => {
        //const res = await axios.get('https://geolocation-db.com/json/')
        //setIP(res.data.IPv4)

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

            //Ahora descargamos la información de las claves producto servicio (porque siempre será la misma)
            getDataCustomUoMs();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los clientes. ")
        });
    }, [])

    function getDataCustomUoMs()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_UoM_Codes_CRUD_Records",
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
            setDataCustomUoMs(optionsAux)

            //Ahora descargamos la información de los países en caso de que se quiera agregar un cliente
            getDataCountries();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los custom UoMs. ")
        });
    }

    function getDataCountries()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Countries_CRUD_Records",
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
                value: data[i].Id_Catalog, label: data[i].Short_Desc 
                })
            }
            setDataCountries(optionsAux);

            //Ahora descargamos la información de los parámetros generales (que servirán en caso de que se quiera agregar un cliente)
            getDataGeneralParameters();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los países. ")
        });
    }

    function getDataGeneralParameters()
    {
        //Aqui vamos a descargar la lista de general parameters para revisar la vigencia del password
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
            var aux = data.find( o => o.Id_Catalog === 5 )
            var aux2 = data.find( o => o.Id_Catalog === 7 )
            setPathLogo(aux.Value)
            setProfilePath(aux2.Value)
            setDataFind(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los parámetros generales. ")
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

    //Para descargar la información del Cliente - Producto de acuerdo al Cliente elegido en el select
    useEffect(() => {
        if(customer.value !== undefined)
        {
            //descargamos la información
            setDataFindCustomerUoMs(true);
          
            var url = new URL(`${process.env.REACT_APP_API_URI}customer-uoms/${customer.value}`);
          
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
                setDataCustomerUoMs(data);
                setDataFindCustomerUoMs(false);
            })
            .catch(function(err) {
                setDataError(true);
                setDataErrorMessage(" de los clientes. ")
            });
        }
    }, [customer]);


    //Para actualizar la lista de clientes en caso de que se agregue uno
    function updateAddDataCustomers() {
        setDataFind(true);
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
            setDataFind(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los clientes. ")
        });
    }

    //Para actualizar la lista de custom uoms en caso de que se agregue uno
    function updateAddDataCustomUoMs() {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_UoM_Codes_CRUD_Records",
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
                    value: data[i].Id_Catalog,  label: data[i].Id_Catalog + " - " + data[i].Short_Desc
                })
            }
            setDataCustomUoMs(optionsAux)
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los custom uoms. ")
        });
    }

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        //descargamos la información
        setDataFindCustomerUoMs(true);
            
        var url = new URL(`${process.env.REACT_APP_API_URI}customer-uoms/${customer.value}`);
        
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
            setDataCustomerUoMs(data);
            setDataFindCustomerUoMs(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los clientes. ")
        });
    }

    //Renderizado condicional
    function Catalog() {
        if (customer.value !== undefined) {
            if(dataFindCustomerUoMs === true)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else 
            {
                return <CustomerUoMsTable dataTable = {dataCustomerUoMs} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} toggleModalAddRecord = {toggleModalAddRecord}/>;
            }
        }
        return <p></p>
    }


    const [modalAddCustomer, setModalAddCustomer] = useState(false);
    const [modalAddCustomUoM, setModalAddCustomUoM] = useState(false);

    function toggleModalAddCustomer(){
        //event.preventDefault();
        if(modalAddCustomer == false){
            setModalAddCustomer(true);
        }
        else{
            setModalAddCustomer(false);
        }
    }

    function toggleModalAddCustomUoM(){
        //event.preventDefault();
        if(modalAddCustomUoM == false){
            setModalAddCustomUoM(true);
        }
        else{
            setModalAddCustomUoM(false);
        }
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

    const [mensajeAdd, setMensajeAdd] = useState("")

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
                                <CardTitle tag="h4">Cliente - Unidad Medida SAT</CardTitle>
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
                            <CardTitle tag="h4">Cliente - Unidad Medida SAT</CardTitle>
                            {role !== "CUSAPPLI" ? (
                                <Row>
                                    <Col md="9">
                                        <FormGroup>
                                        {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                                        <Select 
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            placeholder = "Selecciona un cliente para administrar sus productos"
                                            options = {dataCustomers}
                                            value = {customer}
                                            onChange={(e) => {
                                                setCustomer(e);
                                            }}
                                        />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3">
                                        <Button color="primary" className='btn-add-customer' onClick={toggleModalAddCustomer}>
                                            <span className="btn-label">
                                            <i className="nc-icon nc-simple-add" />
                                            </span>
                                            Añadir Cliente
                                        </Button>
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
                {/*MODAL PARA AÑADIR REGISTROS*/}
                <ModalAddCustomer modalAddRecord = {modalAddCustomer} setModalAddRecord = {setModalAddCustomer} dataCountries = {dataCountries} updateAddData = {updateAddDataCustomers} pathLogo = {pathLogo} ip = {ip} autoCloseAlert = {autoCloseAlert} setCustomer = {setCustomer}/> 
                
                {/*MODAL PARA AÑADIR REGISTROS DE CLIENTES - CUSTOMER UOMS*/}
                <ModalAddCustomerUoM modalAddRecord = {modalAddRecord} setModalAddRecord = {toggleModalAddRecord} ip = {ip}  autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataCustomUoMs = {dataCustomUoMs} toggleModalAddCustomUoM = {toggleModalAddCustomUoM} mensajeAdd = {mensajeAdd} customerE = {customer} customUoME = {customUoM} setCustomUoME = {setCustomUoM}/>

                {/*MODAL PARA AÑADIR REGISTROS DE CLAVE PRODUCTO*/}
                <ModalAddCustomUoM modalAddRecord = {modalAddCustomUoM} setModalAddRecord = {toggleModalAddCustomUoM} updateAddDataCustomUoMs = {updateAddDataCustomUoMs} ip = {ip} setCustomUoME = {setCustomUoM} toggleModalAddRecord = {toggleModalAddRecord} setMensajeAdd = {setMensajeAdd}/>
            </div>
        </>
    )

}

export default CustomerUoMs