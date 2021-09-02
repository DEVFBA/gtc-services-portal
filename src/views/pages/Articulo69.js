import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Modal, 
  ModalBody, 
  ModalFooter
} from "reactstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalAddClient from "../components/modals/ModalAddClient.js";
import ModalUpdateClient from "../components/modals/ModalUpdateClient.js";

const dataTable = [
  ["Tiger Nixon", "System Architect", "Edinburgh", "61","Tiger Nixon", "System Architect", "Edinburgh", 1],
  ["Garrett Winters", "Accountant", "Tokyo", "63","Tiger Nixon", "System Architect", "Edinburgh", "61"],
  ["Ashton Cox", "Junior Technical Author", "San Francisco", "66","Tiger Nixon", "System Architect", "Edinburgh", 0],
  ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22","Tiger Nixon", "System Architect", "Edinburgh", 1],
  ["Airi Satou", "Accountant", "Tokyo", "33","Tiger Nixon", "System Architect", "Edinburgh", 1],
  ["Brielle Williamson", "Integration Specialist", "New York", "61","Tiger Nixon", "System Architect", "Edinburgh", 0],
];

function Articulo69() {
  const [dataState, setDataState] = React.useState(
    dataTable.map((prop, key) => {
      var status;
      if(prop[7] === 1){
        status = "Habilitado"
      }
      else{
        status = "No Habilitado"
      }
      return {
        id: key,
        name: prop[0],
        rfc: prop[1],
        calle: prop[2],
        noExterior: prop[3],
        noInterior: prop[4],
        estado: prop[5],
        pais: prop[6],
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
  const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

  //Para actualizar cada que agreguen un campo a la tabla
  const [updateTable, setUpdateTable] = useState(0);

  //Para saber que cliente se va a editar
  const [record, setRecord] = useState({});

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  }, []);

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
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Articulo 69</CardTitle>
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
                      Header: "Name",
                      accessor: "name",
                    },
                    {
                      Header: "RFC / Tax Id",
                      accessor: "rfc",
                    },
                    {
                      Header: "Calle",
                      accessor: "calle",
                    },
                    {
                      Header: "No. Exterior",
                      accessor: "noExterior",
                    },
                    {
                      Header: "No. Interior",
                      accessor: "noInterior",
                    },
                    {
                      Header: "Estado",
                      accessor: "estado",
                    },
                    {
                      Header: "País",
                      accessor: "pais",
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
      <ModalAddClient modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} updateTable = {updateTable} setUpdateTable = {setUpdateTable}/> 

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      <ModalUpdateClient modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {setModalUpdateRecord} updateTable = {updateTable} setUpdateTable = {setUpdateTable} record = {record}/> 
    </>
  );
}

export default Articulo69;
