import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import ReactTable from "components/ReactTable/ReactTable.js";
import ModalAddApplication from "views/components/Modals/ModalAddApplication.js";
import ModalUpdateApplication from "views/components/Modals/ModalUpdateApplication.js";

import {
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from "reactstrap";
import { prototype } from "react-datetime";

function ModuleSettingsTable({dataTable, dataSuites, updateAddData, ip}){

    const ambiente = "/DEV"
    const history = useHistory();

    //Guardar el estado de la tabla
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
        var status;
        if(prop.Status === true){
            status = "Habilitado"
        }
        else{
            status = "No Habilitado"
        }
        return {
            id: key,
            idAplicacion: prop.Id_Catalog,
            appName: prop.Short_Desc,
            version: prop.Version,
            suiteId: prop.Id_Suite,
            suite: prop.Suite_Desc,
            status: status,
            longDescription: prop.Long_Desc,
            technicalDescription: prop.Technical_Description,
            type: prop.Type,
            actions: (
            // ACCIONES A REALIZAR EN CADA REGISTRO
            <div className="actions-center">
                {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                <Button
                onClick={() => {
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

    //Banderas para abrir modals
    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para obtener el registro que se va a editar
    const [record, setRecord] = useState({});

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
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                  <i className="nc-icon nc-simple-add" />
                  </span>
                  Añadir Módulo
                </Button>
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Aplicación",
                      accessor: "appName",
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
                      Header: "Acciones",
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
              </Col>
            </Row>
          </div>
    
          {/*MODAL PARA CREAR REGISTRO*/}
          <ModalAddApplication abierto = {modalAddRecord} toggleModalAddRecord = {toggleModalAddRecord} dataSuites = {dataSuites} updateAddData = {updateAddData} ip = {ip}/>

          {/*MODAL PARA MODIFICAR REGISTRO*/}
          <ModalUpdateApplication abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} dataSuites = {dataSuites} updateAddData = {updateAddData} record = {record} ip = {ip}/>
        </> 
    );
}

export default ModuleSettingsTable;