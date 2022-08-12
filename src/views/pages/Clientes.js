import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import Skeleton from '@yisheng90/react-loading';

// reactstrap components
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle
} from "reactstrap";

// core components
import CustomersTable from "../components/Customers/CustomersTable.js";
import ModalAddCustomer from "views/components/Modals/ModalAddClient.js";

function Clientes() {

  //Para guardar los datos de los usuarios
  const [dataCustomers, setDataCustomers] = useState([]);

  //Para guardar los datos de las aplicaciones
  const [dataCountries, setDataCountries] = useState([]);

  //Para guardar el path de las imágenes
  const [pathLogo, setPathLogo] = useState();

  const [dataTaxRegimes, setDataTaxRegimes] = useState();

  const token = localStorage.getItem("Token");

  const user = localStorage.getItem("User");

  const [ip, setIP] = React.useState("");

  const [profilePath, setProfilePath] = useState("")
  
  const [message, setMessage] = React.useState(null);

  const [dataFind, setDataFind] = useState(true)

  const [modalAddRecord, setModalAddRecord] = useState(false);

  //Manejo de errores
  const [dataError, setDataError] = useState(false);
  const [dataErrorMessage, setDataErrorMessage] = useState(false);

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
      //Descargamos la IP del usuario
      getData()
  }, []);

  useEffect(() => {
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
      setDataCustomers(data);
      getDataCountries();
    })
    .catch(function(err) {
      setDataError(true);
      setDataErrorMessage(" del catálogo de Clientes ");
    });
  }, []);


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
      getDataGeneralParameters();
    })
    .catch(function(err) {
      setDataError(true);
      setDataErrorMessage(" del catálogo de Países ");
    });
  }

  function getDataGeneralParameters()
  {
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
      var aux = data.find( o => o.Id_Catalog === 1 );
      setPathLogo(aux.Value);
      var aux2 = data.find( o => o.Id_Catalog === 8 );
      setProfilePath(aux2.Value);
      getDataTaxRegimes();
    })
    .catch(function(err) {
      setDataError(true);
      setDataErrorMessage(" del catálogo de Parámetros Generales. ")
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
          data.sort(function (a, b) {
              if (a.Short_Desc > b.Short_Desc) {
                  return 1;
              }
              if (a.Short_Desc < b.Short_Desc) {
                  return -1;
              }
              // a must be equal to b
              return 0;
          });
          
          var optionsAux = [];
          var i;
          for(i=0; i<data.length; i++)
          {
              optionsAux.push({
                  value: data[i].Id_Catalog, label: data[i].Id_Catalog + " - " + data[i].Short_Desc 
              })
          }
          setDataTaxRegimes(optionsAux)
          setDataFind(false)
      })
      .catch(function(err) {
        setDataError(true);
        setDataErrorMessage(" del catálogo de Regímenes Fiscales. ")
      });
  }

   //Renderizado condicional
  function Customers() {
      return <CustomersTable dataTable = {dataCustomers} dataCountries = {dataCountries} updateAddData = {updateAddData} pathLogo = {pathLogo} ip={ip} profilePath = {profilePath} autoCloseAlert = {autoCloseAlert} dataTaxRegimes = {dataTaxRegimes}/>;
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    setDataFind(true)
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
      setDataCustomers(data)
      setDataFind(false)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los customers" + err);
    });
  }

  React.useEffect(() => {
    return function cleanup() {
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  }, []);

  const autoCloseAlert = (mensaje) => {
    setMessage(
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
    setMessage(null);
  };

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
                <CardTitle tag="h4">Clientes</CardTitle>
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                  </span>
                  Agregar Cliente
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
         {/*MODAL PARA AÑADIR REGISTROS*/}
         <ModalAddCustomer modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataCountries = {dataCountries} updateAddData = {updateAddData} pathLogo = {pathLogo} ip = {ip} autoCloseAlert = {autoCloseAlert} dataTaxRegimes = {dataTaxRegimes}/>       
      </div>
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card >
              <CardHeader>
                <CardTitle tag="h4">Clientes</CardTitle>
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                  </span>
                  Agregar Cliente
                </Button>
              </CardHeader>
              <CardBody>
                {message}
                {dataCustomers.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                  <Customers/>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
         {/*MODAL PARA AÑADIR REGISTROS*/}
         <ModalAddCustomer modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataCountries = {dataCountries} updateAddData = {updateAddData} pathLogo = {pathLogo} ip = {ip} autoCloseAlert = {autoCloseAlert} dataTaxRegimes = {dataTaxRegimes}/>       
      </div>
    </>
  );
}

export default Clientes;