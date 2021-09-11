import React, { useState, useEffect } from "react";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalAddUser from "views/components/Modals/ModalAddUser.js";
import ModalUpdateUser from "views/components/Modals/ModalUpdateUser.js";

import {
  Button,
  Row,
  Col,
} from "reactstrap";


const dataa = [
  ["Tiger Nixon", "System Architect", "Edinburgh", 0],
  ["Garrett Winters", "Accountant", "Tokyo", "63"],
  ["Ashton Cox", "Junior Technical Author", "San Francisco", 0],
  ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", 0],
  ["Airi Satou", "Accountant", "Tokyo", "33"],
  ["Brielle Williamson", "Integration Specialist", "New York", 0],
];

function UsersTable({dataTable, dataRoles, updateAddData}){
    console.log(dataTable)
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
            name: prop.Name,
            email: prop.User,
            rol: prop.Role_Desc,
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

    //Para saber que usuario se va a editar
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
          <div className="content">
            <Row>
              <Col md="12">
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
                                Header: "Nombre",
                                accessor: "name",
                            },
                            {
                                Header: "Email",
                                accessor: "email",
                            },
                            {
                                Header: "Rol",
                                accessor: "rol",
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
        <ModalAddUser modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} dataRoles = {dataRoles}/>       

        {/*MODAL PARA MODIFICAR REGISTRO*/}
        <ModalUpdateUser abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record}/>
    
        </>
    );
}

export default UsersTable;