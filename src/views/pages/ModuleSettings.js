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
import { Link, useHistory } from "react-router-dom";


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
import ModalUpdateSettings from "../components/Modals/ModalUpdateSettings.js";
import ModalReadSettings from "../components/Modals/ModalReadSettings.js";
import EditApplication from "./EditApplication.js";

const datos = [
  ["APP1", "System Architect", "Edinburgh", "61"],
  ["APP2", "Accountant", "Tokyo", "63"],
  ["APP3", "Junior Technical Author", "San Francisco", "66"],
  ["APP4", "Senior Javascript Developer", "Edinburgh", "22"],
  ["APP5", "Accountant", "Tokyo", "33"],
  ["APP6", "Integration Specialist", "New York", "61"],
];

function ModuleSettings() {

  //Guardar datos para la tabla
  const [dataTable, setDataTable] = useState([]);

  const history = useHistory();

  //Guardar el estado de la tabla
  const [dataState, setDataState] = useState(
      datos.map((prop, key) => {
        return {
          id: key,
          idAplicacion: prop[0],
          version: prop[1],
          suite: prop[2],
          status: prop[3],
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
                  history.push(`/admin/edit-application/${obj.idAplicacion}/`);
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

  //Banderas para abrir modals
  const [modalReadRecord, setModalReadRecord] = useState(false);
  const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

  //Para obtener el registro que se va a editar
  const [editApplication, setEditApplication] = useState();

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
    
    setDataTable(datos);
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
                      accessor: "idAplicacion",
                    },
                    {
                      Header: "Versión",
                      accessor: "version",
                    },
                    {
                      Header: "Suite",
                      accessor: "suite",
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

      {/*MODAL PARA LEER REGISTRO*/}
      <ModalReadSettings abierto = {modalReadRecord} toggleModalReadRecord = {toggleModalReadRecord}/>

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      <ModalUpdateSettings abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord}/>
    </> 
  );
}

export default ModuleSettings;