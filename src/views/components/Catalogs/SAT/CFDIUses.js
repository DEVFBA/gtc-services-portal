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
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import Select from "react-select";

// core components
import ReactTable from "components/ReactTable/ReactTable.js"; 
import ModalUpdateCFDIUsers from "views/components/Modals/catalogs/sat/ModalUpdateCFDIUses";
import ModalAddCFDIUses from "views/components/Modals/catalogs/sat/ModalAddCFDIUses.js";

function CFDIUses({dataTable, updateAddData}) {

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

    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

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

    return (
    <>
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            
                <h4>Usos de CFDI</h4>
                <Button color="primary" onClick={toggleModalAddRecord}>
                    <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                    </span>
                    Add new record
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
          </Col>
        </Row>
    </div>

    {/*MODAL PARA AÑADIR REGISTROS*/}
    <ModalAddCFDIUses modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} updateAddData = {updateAddData}/>       

    {/*MODAL PARA MODIFICAR REGISTRO*/}
    <ModalUpdateCFDIUsers abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData}/>

    </>
  );
}

export default CFDIUses;