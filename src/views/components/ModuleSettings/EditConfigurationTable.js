import React, { useState, useEffect } from "react";

import ReactTable from "components/ReactTable/ReactTable.js";

import ModalUpdateConfig from "views/components/Modals/ModalUpdateConfig.js";

import {
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from "reactstrap";

function EditConfigurationTable({dataTable}){

    //Para saber que configuracion se va a editar
    const [record, setRecord] = useState({});

    const [dataState, setDataState] = React.useState(
        dataTable.map((prop, key) => {
            var requerida;
            var editable;
            var visible;
            if(prop.Required === true){
                requerida = "Requerida"
            }
            else{
                requerida = "No Requerida"
            }
            if(prop.Allow_Edit === true){
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
            configuracion: prop.Settings_Name,
            requerida: requerida,
            editable: editable,
            visible: visible,
            tooltip: prop.Tooltip,
            actions: (
              // ACCIONES A REALIZAR EN CADA REGISTRO
              <div className="actions-center">
                {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
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
              </div>
            ),
          };
        })
      );

    //Banderas para abrir modals
    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para obtener el registro que se va a editar
    const [editApplication, setEditApplication] = useState();

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
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
    
          {/*MODAL PARA MODIFICAR REGISTRO*/}
          <ModalUpdateConfig abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} setRecord = {setRecord}/>
        </>
      );
}

export default EditConfigurationTable;