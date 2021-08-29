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
import { Link, BrowserRouter, useLocation } from "react-router-dom";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Input,
  Label
} from "reactstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalUpdateSettings from "../components/modals/ModalUpdateSettings.js";
import ModalReadSettings from "../components/modals/ModalReadSettings.js";

function ModuleSettings(props) {

  //Guardar datos para la tabla
  const [dataTable, setDataTable] = useState([]);

  //Guardar el estado de la tabla
  const [dataState, setDataState] = React.useState([]);

  //Banderas para abrir modals
  const [modalReadRecord, setModalReadRecord] = useState(false);
  const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
    const datos = [
      ["APP1", "System Architect", "Edinburgh", "61"],
      ["APP2", "Accountant", "Tokyo", "63"],
      ["APP3", "Junior Technical Author", "San Francisco", "66"],
      ["APP4", "Senior Javascript Developer", "Edinburgh", "22"],
      ["APP5", "Accountant", "Tokyo", "33"],
      ["APP6", "Integration Specialist", "New York", "61"],
    ];
    setDataTable(datos);
  }, []);

  useEffect(() => {
    setDataState(
      dataTable.map((prop, key) => {
        return {
          id: key,
          name: prop[0],
          position: prop[1],
          office: prop[2],
          age: prop[3],
          actions: (
            // ACCIONES A REALIZAR EN CADA REGISTRO
            <div className="actions-right">
              {/*IMPLEMENTAR VER REGISTRO A DETALLE*/}
              <Button
                onClick={() => {
                  let obj = dataState.find((o) => o.id === key);
                  alert(
                    "You've clicked LIKE button on \n{ \nName: " +
                      obj.name +
                      ", \nposition: " +
                      obj.position +
                      ", \noffice: " +
                      obj.office +
                      ", \nage: " +
                      obj.age +
                      "\n}."
                  );
                }}
                color="info"
                size="sm"
                className="btn-icon btn-link like"
                onClick={toggleModalReadRecord}
              >
                <i className="fa fa-list" />
              </Button>{" "}
              {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
              <Button
                onClick={() => {
                  let obj = dataState.find((o) => o.id === key);
                  alert(
                    "You've clicked EDIT button on \n{ \nName: " +
                      obj.name +
                      ", \nposition: " +
                      obj.position +
                      ", \noffice: " +
                      obj.office +
                      ", \nage: " +
                      obj.age +
                      "\n}."
                  );
                }}
                color="warning"
                size="sm"
                className="btn-icon btn-link edit"
                onClick={toggleModalUpdateRecord}
              >
                <i className="fa fa-edit" />
              </Button>
            </div>
          ),
        };
      })
    );
  }, [dataTable.length]);


  function updateRecord(){
    //A la hora de crear un nuevo registro necesitamos actualizar la tabla para que
    //se pinten todos los registros incluido el nuevo
    //Hacemos fetch nuevamente a todos los registros
    //setRecords(nuevadata)
  }

  function readRecord(){
    //Leemos la informacion completa del registo para pintarla en el modal
    //tal vez no sea necesaria porque ya se leyó anteriormente...
  }

  function toggleModalReadRecord(){
    if(modalReadRecord == false){
      setModalReadRecord(true);
    }
    else{
      setModalReadRecord(false);
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
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Modules Catalog</CardTitle>
                <Link to="/admin/add-application">
                  <Button color="primary">
                    <span className="btn-label">
                      <i className="nc-icon nc-simple-add" />
                    </span>
                    Add new record
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Aplicación",
                      accessor: "name",
                    },
                    {
                      Header: "Versión",
                      accessor: "position",
                    },
                    {
                      Header: "Suite",
                      accessor: "office",
                    },
                    {
                      Header: "Estatus",
                      accessor: "age",
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

      {/*MODAL PARA LEER REGISTRO*/}
      <ModalReadSettings abierto = {modalReadRecord} toggleModalReadRecord = {toggleModalReadRecord}/>

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      <ModalUpdateSettings abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord}/>
    </>
  );
}

export default ModuleSettings;