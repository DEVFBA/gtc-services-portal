import React from 'react'
import { useState, useEffect} from "react";
import axios from 'axios'
import Skeleton from '@yisheng90/react-loading';
import ReactBSAlert from "react-bootstrap-sweetalert";

import CustomerBillTosTable from '../components/CustomerBillTos/CustomerBillTosTable';
import ModalAddCustomer from "../components/CustomerBillTos/ModalAddCustomer";
import ModalAddCustomerBillTos from "../components/CustomerBillTos/ModalAddCustomerBillTos";

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

function CustomerBillTos(){
    //Para guardar los datos del cliente - bill tos
    const [dataCustomerBillTos, setDataCustomerBillTos] = useState([]);

    /*INFORMACION RELACIONADA A LOS CLIENTES*/

    //Guardar la información de todos los clientes
    const [dataCustomers, setDataCustomers] = useState([]);

    //Guardar la información de los países
    const [dataCountries, setDataCountries] = useState([]);

    //Guardar la información requerida para agregar un cliente
    const [pathLogo, setPathLogo] = useState("");
    const [profilePath, setProfilePath] = useState("");

    //Guardar el cliente elegido en el select
    const [customer, setCustomer] = useState("");

    /*INFORMACIÓN RELACIONADA A LOS MODALES PARA AGREGAR Y ACTUALIZAR*/
    const [dataEntityTypes, setDataEntityTypes] = useState([]);

    const [dataZipCodes, setDataZipCodes] = useState([]);

    const [dataTaxRegimes, setDataTaxRegimes] = useState([]);

    const [dataCFDIUses, setDataCFDIUses] = useState([]);

    const [foreignTaxId, setForeignTaxId] = useState([]);

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
    const [dataFindCustomerBillTos, setDataFindCustomerBillTos] = useState(true)

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
            getDataEntityTypes();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los clientes. ")
        });
    }, [])

    function getDataEntityTypes()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Entity_Type_CRUD_Records",
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
                    value: data[i].Id_Catalog, label: data[i].Id_Catalog + " - " + data[i].Short_Desc, length:  data[i].Tax_Id_Length
                })
            }
            setDataEntityTypes(optionsAux)

            //Ahora descargamos la información de los países en caso de que se quiera agregar un cliente
            getDataCountries();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de las entity types ")
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
                value: data[i].Id_Catalog, label: data[i].Id_Catalog + " - " + data[i].Short_Desc 
                })
            }
            setDataCountries(optionsAux);

            //Ahora descargamos la información de los parámetros generales (que servirán en caso de que se quiera agregar un cliente)
            getZipCodes();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los países. ")
        });
    }

    function getZipCodes()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Zip_Codes_Counties_CRUD_Records",
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
            //console.log(data)
            setDataZipCodes(data);

            //Ahora descargamos la información de los parámetros generales (que servirán en caso de que se quiera agregar un cliente)
            getDataTaxRegimes();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los códigos postales. ")
        });
    }

    function getDataTaxRegimes() 
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Tax_Regimens_CRUD_Records",
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

            setDataTaxRegimes(optionsAux);

            //Ahora descargamos la información de los parámetros generales (que servirán en caso de que se quiera agregar un cliente)
            getDataCFDIUses();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los regimenes fiscales. ")
        });
    }

    function getDataCFDIUses()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_CFDI_Uses_CRUD_Records",
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

            setDataCFDIUses(optionsAux);

            //Ahora descargamos la información de los parámetros generales (que servirán en caso de que se quiera agregar un cliente)
            getDataGeneralParameters();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los usos de CFDI. ")
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
            var aux3 = data.find( o => o.Id_Catalog === 21 )

            setPathLogo(aux.Value);
            setProfilePath(aux2.Value);
            setForeignTaxId(aux3.Value);

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

    //Para descargar la información del Cliente - Receptores Factura de acuerdo al Cliente elegido en el select
    useEffect(() => {
        if(customer.value !== undefined)
        {
            //descargamos la información
            setDataFindCustomerBillTos(true);

            console.log(customer.value)
          
            var url = new URL(`${process.env.REACT_APP_API_URI}customer-bill-tos/${customer.value}`);
          
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
                setDataCustomerBillTos(data);
                setDataFindCustomerBillTos(false);
            })
            .catch(function(err) {
                setDataError(true);
                setDataErrorMessage(" de los clientes bill tos. ")
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

    //Para actualizar la tabla al insertar registro
    function updateAddData(){
        //descargamos la información
        setDataFindCustomerBillTos(true);
            
        var url = new URL(`${process.env.REACT_APP_API_URI}customer-bill-tos/${customer.value}`);
        
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
            setDataCustomerBillTos(data);
            setDataFindCustomerBillTos(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los customer billtos. ")
        });
    }

    //Renderizado condicional
    function Catalog() {
        if (customer.value !== undefined) {
            if(dataFindCustomerBillTos === true)
            {
                return  <div>
                            <Skeleton height={25} />
                            <Skeleton height="25px" />
                            <Skeleton height="3rem" />
                        </div>
            }
            else 
            {
                return <CustomerBillTosTable dataTable = {dataCustomerBillTos} ip = {ip} autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} toggleModalAddRecord = {toggleModalAddRecord} dataEntityTypes = {dataEntityTypes} foreignTaxIdParameter = {foreignTaxId} dataZipCodes = {dataZipCodes} dataCountries = {dataCountries} dataTaxRegimes = {dataTaxRegimes} dataCFDIUses = {dataCFDIUses}/>;
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
                                <CardTitle tag="h4">Clientes - Receptores Factura</CardTitle>
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
                            <CardTitle tag="h4">Clientes - Receptores Factura</CardTitle>
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
                
                {/*MODAL PARA AÑADIR REGISTROS DE Clientes - Receptores Factura*/}
                <ModalAddCustomerBillTos modalAddRecord = {modalAddRecord} setModalAddRecord = {toggleModalAddRecord} ip = {ip}  autoCloseAlert = {autoCloseAlert} updateAddData = {updateAddData} dataEntityTypes = {dataEntityTypes} foreignTaxIdParameter = {foreignTaxId} dataZipCodes = {dataZipCodes} dataCountries = {dataCountries} dataTaxRegimes = {dataTaxRegimes} dataCFDIUses = {dataCFDIUses} customerE = {customer}/>
            </div>
        </>
    )

}

export default CustomerBillTos