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
  CardTitle,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Modal, 
  ModalBody, 
  ModalFooter
} from "reactstrap";

import Select from "react-select";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalUpdateSat from "../components/modals/ModalUpdateSat.js";
import ModalReadSat from "../components/modals/ModalReadSat.js";

const dataTable = [
  ["Tiger Nixon", "System Architect", "Edinburgh", "61"],
  ["Garrett Winters", "Accountant", "Tokyo", "63"],
  ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
  ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
  ["Airi Satou", "Accountant", "Tokyo", "33"],
  ["Brielle Williamson", "Integration Specialist", "New York", "61"],
];

function CatalogosSAT(props) {
  const [dataState, setDataState] = React.useState(
    dataTable.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        position: prop[1],
        office: prop[2],
        age: prop[3],
        actions: (
          // ACCIONES A REALIZAR EN CADA REGISTRO
          <div className="actions-center">
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

  const [modalAddRecord, setModalAddRecord] = useState(false);
  const [modalReadRecord, setModalReadRecord] = useState(false);
  const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

  //Validaciones en formularios de Modals
  const [requiredState, setrequiredState] = React.useState("");
  const [emailState, setemailState] = React.useState("");
  const [numberState, setnumberState] = React.useState("");

  //Guardar todos los catálogos para el select
  //const [catalogs, setCatalogs] = React.useState([]);
  const catalogs =[
    { value: "Afghanistan", label: " Afghanistan " },
    { value: "Albania", label: " Albania " },
    { value: "Algeria", label: " Algeria " },
    { value: "American Samoa", label: " American Samoa " },
    { value: "Andorra", label: " Andorra " },
    { value: "Angola", label: " Angola " },
    { value: "Anguilla", label: " Anguilla " },
    { value: "Antarctica", label: " Antarctica " },
  ]

  //Guardar catalogo seleccionado para descargar su lista de opciones
  const [catalog, setCatalog] = React.useState();
  
  //Descargar la lista de registros
  const [records, setRecords] = useState([]);

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  }, []);

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
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
              <CardTitle tag="h4">SAT Catalog</CardTitle>
                <FormGroup>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <Select 
                    placeholder = "Selecciona un catálogo para administrar sus configuraciones"
                    options = {catalogs}
                    onChange={(e) => {
                      setCatalog(e.value);
                      console.log(e.value)
                    }}
                  />
                </FormGroup>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Id",
                      accessor: "name",
                    },
                    {
                      Header: "Desc. Corta",
                      accessor: "position",
                    },
                    {
                      Header: "Desc. Larga",
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
      <ModalReadSat abierto = {modalReadRecord} toggleModalReadRecord = {toggleModalReadRecord}/>

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      <ModalUpdateSat abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord}/>
    </>
  );
}

export default CatalogosSAT;