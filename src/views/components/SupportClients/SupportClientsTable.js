import React, { useState, useEffect } from "react";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalUpdateUser from "views/components/Modals/ModalUpdateUser.js";
import Skeleton from '@yisheng90/react-loading';
import { Link, useHistory } from "react-router-dom";

import {
  Button,
  Row,
  Col,
} from "reactstrap";

function SupportClientsTable({dataTable}){

    const ambiente = "/DEV"
    const history = useHistory();

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
            idSuite: prop.Id_Suite,
            suiteDesc: prop.Suite_Desc,
            idApp: prop.Id_Application,
            appDesc: prop.Application_Desc,
            idCliente: prop.Id_Customer,
            actions: (
              // ACCIONES A REALIZAR EN CADA REGISTRO
              <div className="actions-center">
                {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                <abbr title="Editar">
                    <Button
                        onClick={() => {
                            let obj = dataState.find((o) => o.id === key);
                            history.push(ambiente + `/admin/application-settings/${obj.idCliente}/${obj.idApp}/`);
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

    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
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

    return dataTable.length === 0 ? (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                 
                    <ReactTable
                        data={dataState}
                        columns={[
                            {
                                Header: "Id Suite",
                                accessor: "idSuite",
                            },
                            {
                                Header: "Descripción Suite",
                                accessor: "suiteDesc",
                            },
                            {
                                Header: "Id Aplicación",
                                accessor: "idApp",
                            },
                            {
                                Header: "Descripción Aplicación",
                                accessor: "appDesc",
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
        <ModalUpdateUser abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record}/>
    
        </>
    );
}

export default SupportClientsTable;