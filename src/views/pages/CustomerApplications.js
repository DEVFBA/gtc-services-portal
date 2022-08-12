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
import CustomerApplicationsTable from "../components/Customers/CustomerApplicationsTable.js";
import ModalAddCustomerApplication from "views/components/Modals/ModalAddCustomerApplication.js";

function CustomerApplications() {

  //Para guardar los datos de los usuarios
  const [dataCustomersApplications, setDataCustomersApplications] = useState([]);

  //Para guardar los datos de las aplicaciones
  const [dataApplications, setDataApplications] = useState([]);

  //Para guardar los datos de los customers
  const [dataCustomers, setDataCustomers] = useState([]);

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
    //Aqui vamos a descargar la lista de Customer Applications de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}customer-applications/`);

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
      setDataCustomersApplications(data)
      setDataFind(false)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los Customer Applications" + err);
    });
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista aplicaciones
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cat-applications/`);

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

        //Creamos el arreglo de applications para el select en orden alfabetico
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
          if(data[i].Status === true)
          {
            optionsAux.push({
              value: data[i].Id_Catalog, label: data[i].Short_Desc 
            })
          }
        }
        setDataApplications(optionsAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de las aplicaciones" + err);
    });
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de customers de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
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

        data.sort(function (a, b) {
          if (a.Name > b.Name) {
            return 1;
          }
          if (a.Name < b.Name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        //Creamos el arreglo de customers para el select
        var optionsAux = [];
        var i;
        for(i=0; i<data.length; i++)
        {
          //console.log(data[i])
          if(data[i].Status === true)
          {
            optionsAux.push({
              value: data[i].Id_Customer, label: data[i].Name
            })
          }
        }
        setDataCustomers(optionsAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los customers" + err);
    });
  }, []);

   //Renderizado condicional
  function CustomerApplication() {
      return <CustomerApplicationsTable dataTable = {dataCustomersApplications} dataApplications = {dataApplications} dataCustomers = {dataCustomers} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    setDataFind(true)
    //Aqui vamos a descargar la lista de Customer Applications de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}customer-applications/`);

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
      setDataFind(false)
      setDataCustomersApplications(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los Customer Applications" + err);
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
                <CardTitle tag="h4">Aplicaciones Cliente</CardTitle>
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                  </span>
                  Agregar Aplicación
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
        <ModalAddCustomerApplication modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataApplications = {dataApplications} dataCustomers = {dataCustomers} updateAddData = {updateAddData} ip={ip} autoCloseAlert = {autoCloseAlert}/>       
      </div>
    </>
  ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Aplicaciones Cliente</CardTitle>
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                  </span>
                  Agregar Aplicación
                </Button>
              </CardHeader>
              <CardBody>
                {alert}
                {dataCustomersApplications.length === 0 ? (
                  <div className ="no-data">
                    <h3>No hay datos</h3>
                  </div>
                ): 
                  <CustomerApplication />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/*MODAL PARA AÑADIR REGISTROS*/}
        <ModalAddCustomerApplication modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataApplications = {dataApplications} dataCustomers = {dataCustomers} updateAddData = {updateAddData} ip={ip} autoCloseAlert = {autoCloseAlert}/>       
      </div>
    </>
  );
}

export default CustomerApplications;
