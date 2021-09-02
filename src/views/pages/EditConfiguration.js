/*!

=========================================================
* Componente utilizado para editar una aplicación del usuario
=========================================================

*/
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
  Modal, 
  ModalBody, 
  ModalFooter
} from "reactstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalUpdateClientSettings from "../components/modals/ModalUpdateClientSettings.js";

const dataTable = [
  ["Tiger Nixon", 1, 1, 1],
  ["Garrett Winters", 0, 0, 1],
  ["Ashton Cox", 0, 1, 0],
  ["Cedric Kelly", 1, 0, 1],
  ["Airi Satou", 0, 0, 0],
  ["Brielle Williamson", 1, 1, 1],
  ["Herrod Chandler", 1, 1, 1],
  ["Rhona Davidson", 0, 1, 0],
  ["Colleen Hurst", 0, 0, 1],
];

import { useParams } from "react-router-dom";

function EditConfiguration({edit}) {
  const { idApp } = useParams();

  //Para saber que configuracion se va a editar
  const [record, setRecord] = useState({});

  const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

  const [dataState, setDataState] = React.useState(
    dataTable.map((prop, key) => {
        var requerida;
        var editable;
        var visible;
        if(prop[1] === 1){
            requerida = "Requerida"
        }
        else{
            requerida = "No Requerida"
        }
        if(prop[2] === 1){
            editable = "Editable"
        }
        else{
            editable = "No Editable"
        }
        if(prop[3] === 1){
            visible = "Visible"
        }
        else{
            visible = "No Visible"
        }
      return {
        id: key,
        configuracion: prop[0],
        requerida: requerida,
        editable: editable,
        visible: visible,
        tooltip: prop[4],
        actions: (
          // ACCIONES A REALIZAR EN CADA REGISTRO
          <div className="actions-center">
            {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
            {prop[2] === 1 ? (
              <Button
              onClick={() => {
                getRegistro(key)
                toggleModalUpdateRecord();
                //console.log(record)
              }}
              color="warning"
              size="sm"
              className="btn-icon btn-link edit"
            >
              <i className="fa fa-edit" />
            </Button>
            ) : null}
          </div>
        ),
      };
    })
  );

  //Para actualizar cada que editen un campo de la tabla
  const [updateTable, setUpdateTable] = useState(0);

  function getRegistro(key)
  {
    var registro = dataState.find((o) => o.id === key)
    setRecord(registro) 
  }

  useEffect(() => {
        //Es necesario descargar la información de toda la app y pasarsela como prop a los componentes...
        //Aqui vamos a utilizar idApp para bajar la informacion
  },[]);

  useEffect(() => {
    //Para actualizar la tabla cada que se editen configuraciones.
    //Se hace fetch de nuevo a la base de datos

    //Los datos se van a guardar en dataState
    console.log(dataState)

    //El renderizado se hará cada que cambiemos el valor de updateTable.
  },[updateTable]);

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
                <CardTitle tag="h4">Edit Application {idApp}</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Configuración",
                      accessor: "configuracion",
                    },
                    {
                      Header: "Requerida",
                      accessor: "requerida",
                    },
                    {
                      Header: "Editable",
                      accessor: "editable",
                    },
                    {
                      Header: "Visible",
                      accessor: "visible",
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

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      <ModalUpdateClientSettings modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {setModalUpdateRecord} updateTable = {updateTable} setUpdateTable = {setUpdateTable} record = {record} setRecord = {setRecord}/>
    </>
  );
}

export default EditConfiguration;
