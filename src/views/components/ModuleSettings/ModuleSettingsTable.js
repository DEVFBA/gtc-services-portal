import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import ReactTable from "components/ReactTable/ReactTable.js";
import ModalUpdateSettings from "views/components/Modals/ModalUpdateSettings.js";
import ModalReadSettings from "views/components/Modals/ModalReadSettings.js";
import EditApplication from "views/pages//EditApplication.js";

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

function ModuleSettingsTable({dataTable, dataRoles, dataCustomers, updateAddData, validDays, pathImage}){

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
            suite: prop.Suite_Desc,
            status: status,
            longDescription: prop.longDescription,
            technicalDescription: prop.Technical_Description,
            type: prop.Type,
            actions: (
            // ACCIONES A REALIZAR EN CADA REGISTRO
            <div className="actions-center">
                {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                <Button
                onClick={() => {
                    let obj = dataState.find((o) => o.id === key);
                    history.push(ambiente + `/admin/edit-application/${obj.idAplicacion}/`);
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
                    <CardTitle tag="h4">Modules Catalog</CardTitle>
                    <Link to= {ambiente + "/admin/add-application"}>
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
          <ModalUpdateSettings abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord}/>
        </> 
    );
}

export default ModuleSettingsTable;