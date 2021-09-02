/*!

=========================================================
* Paper Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";

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
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalAddUser from "../components/modals/ModalAddUser.js";
import ModalUpdateUser from "../components/modals/ModalUpdateUser.js";

import { data } from "jquery";

const datos = [
  ["Tiger Nixon", "hola@hola.com", "Administrador", 1],
  ["Garrett Winters", "hola@hola.com", "Soporte", "63"],
  ["Ashton Cox", "hola@hola.com", "Cliente", 1],
  ["Cedric Kelly", "hola@hola.com", "Administrador", 0],
  ["Airi Satou", "hola@hola.com", "Soporte", 0],
  ["Brielle Williamson", "hola@hola.com", "Cliente", 1],
];

function Usuarios() {
  const [dataState, setDataState] = useState(
    datos.map((prop, key) => {
      var status;
      if(prop[3] === 1){
        status = "Habilitado"
      }
      else{
        status = "No Habilitado"
      }
      return {
        id: key,
        name: prop[0],
        email: prop[1],
        rol: prop[2],
        status: status,
        actions: (
          // ACCIONES A REALIZAR EN CADA REGISTRO
          <div className="actions-center">
            {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
            <Button
              onClick={() => {
                let obj = dataState.find((o) => o.id === key);
                getRegistro(key);
                toggleModalUpdateRecord()
              }}
              color="warning"
              size="sm"
              className="btn-icon btn-link edit"
            >
              <i className="fa fa-edit" />
            </Button>
          </div>
        ),
      };
    })
  );

  const [modalAddRecord, setModalAddRecord] = useState(false);
  const [modalReadRecord, setModalReadRecord] = useState(false);
  const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

  //Para actualizar cada que agreguen un campo a la tabla
  const [updateTable, setUpdateTable] = useState(0);

  //Para saber que usuario se va a editar
  const [record, setRecord] = useState({});

  useEffect(() => {
    //Descargar la lista de usuarios
    //Los datos se van a guardar en dataState (se arma el array de objetos por primera vez)
    //console.log(dataState)
  },[]);

  useEffect(() => {
    //Para actualizar la tabla cada que se agreguen usuarios.
    //Se hace fetch de nuevo a la base de datos

    //Los datos se van a guardar en dataState
    console.log(dataState)

    //El renderizado se hará cada que cambiemos el valor de updateTable.
  },[updateTable]);

  function getRegistro(key)
  {
    var registro = dataState.find((o) => o.id === key)
    setRecord(registro) 
  }

  function toggleModalAddRecord(){
    if(modalAddRecord == false){
      setModalAddRecord(true);
    }
    else{
      setModalAddRecord(false);
    }
  }

  function toggleModalUpdateRecord(){
    if(modalUpdateRecord == false){
      setModalUpdateRecord(true);
    }
    else{
      setModalUpdateRecord(false);
    }
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Users Catalog</CardTitle>
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                  </span>
                  Add new record
                </Button>

              </CardHeader>
              <CardBody>
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Nombre",
                      accessor: "name",
                    },
                    {
                      Header: "Email",
                      accessor: "email",
                    },
                    {
                      Header: "Rol",
                      accessor: "rol",
                    },
                    {
                      Header: "Estatus",
                      accessor: "status",
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  /*
                      You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                    */
                  className="-striped -highlight primary-pagination"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/*MODAL PARA AÑADIR REGISTROS*/}
      <ModalAddUser modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} updateTable = {updateTable} setUpdateTable = {setUpdateTable}/>       

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      <ModalUpdateUser abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateTable = {updateTable} setUpdateTable = {setUpdateTable}/>
    </>
  );
}

export default Usuarios;
