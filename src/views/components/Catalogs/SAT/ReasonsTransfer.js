import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';

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
  Label,
  Input,
} from "reactstrap";

import Select from "react-select";

// core components
import ReactTable from "components/ReactTable/ReactTable.js"; 
import ModalUpdateReasonsTransfer from "views/components/Modals/catalogs/sat/ModalUpdateReasonsTransfer";
import ModalAddReasonsTransfer from "views/components/Modals/catalogs/sat/ModalAddReasonsTransfer.js";

function ReasonsTransfer({dataTable, updateAddData, ip, autoCloseAlert}) {
  const [dataState, setDataState] = React.useState(
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
          idR: prop.Id_Catalog,
          shortDescription: prop.Short_Desc,
          longDescription: prop.Long_Desc,
          status: status,
          actions: (
          // ACCIONES A REALIZAR EN CADA REGISTRO
          <div className="actions-center">
              {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
              <abbr title="Editar">
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
              </abbr>
              
          </div>
          ),
      };
    })
  );

    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);
    
    //Para actualizar cada que agreguen un campo a la tabla
    const [updateTable, setUpdateTable] = useState(0);

    //Para saber que registro se va a editar
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

    return dataTable.length === 0 ? (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <h4>Motivos de Traslado</h4>
              <Skeleton height={25} />
              <Skeleton height="25px" />
              <Skeleton height="3rem" />
            </Col>
          </Row>
        </div>
      </>
    ) : (
    <>
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            
                <h4>Motivos de Traslado</h4>
                <Button color="primary" onClick={toggleModalAddRecord}>
                    <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                    </span>
                    Agregar Nuevo Registro
                </Button>
             
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Id",
                      accessor: "idR",
                    },
                    {
                      Header: "Desc. Corta",
                      accessor: "shortDescription",
                    },
                    {
                      Header: "Desc. Larga",
                      accessor: "longDescription",
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

    {/*MODAL PARA AÑADIR REGISTROS*/}
    <ModalAddReasonsTransfer modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert}/>       

    {/*MODAL PARA MODIFICAR REGISTRO*/}
    <ModalUpdateReasonsTransfer abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert}/>

    </>
  );
}

export default ReasonsTransfer;