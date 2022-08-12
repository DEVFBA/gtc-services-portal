import React, { useState, useEffect } from "react";

import ReactTable from "components/ReactTable/ReactTable.js";
import ModalUpdateGeneralParameter from "views/components/Modals/ModalUpdateGeneralParameter";

import {
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from "reactstrap";

function GeneralParametersTable({dataTable, updateAddData, ip, autoCloseAlert}){

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
                idParameter: prop.Id_Catalog,
                idGrouper: prop.Id_Grouper,
                value: prop.Value,
                longDesc: prop.Long_Desc,
                dataType: prop.Data_Type,
                status: status,
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
    
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para obtener el registro que se va a editar
    const [record, setRecord] = useState({});

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
          
            <Row>
              <Col md="12">
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Agrupador",
                      accessor: "idGrouper",
                    },
                    {
                      Header: "Parámetro",
                      accessor: "longDesc",
                    },
                    {
                      Header: "Valor",
                      accessor: "dataType",
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
          
    
          {/*MODAL PARA MODIFICAR REGISTRO*/}
          <ModalUpdateGeneralParameter abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} updateAddData = {updateAddData} record = {record} ip = {ip} autoCloseAlert = {autoCloseAlert}/>
        </> 
    );
}

export default GeneralParametersTable;