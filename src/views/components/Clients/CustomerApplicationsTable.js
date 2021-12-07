import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalAddCustomerApplication from "views/components/Modals/ModalAddCustomerApplication.js";
import ModalUpdateCustomerApplication from "views/components/Modals/ModalUpdateCustomerApplication.js";

import {
  Button,
  Row,
  Col,
} from "reactstrap";
import { prototype } from "react-datetime";

function CustomerApplicationsTable({dataTable, dataApplications, dataCustomers, updateAddData, ip, autoCloseAlert}){
    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const history = useHistory();
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
          var licDate;
          if(prop.Final_Effective_Date === null){
              licDate = "Vitalicia"
          }
          else{
              var fecha = new Date(prop.Final_Effective_Date)
              var date, month, year;
              if(fecha.getDate() < 10)
              {
                  date = "0" + (fecha.getDate()+1)
              }
              else{
                  date = (fecha.getDate()+1)
              }
              if((fecha.getMonth() + 1) < 10)
              {
                  month = "0" + (fecha.getMonth() + 1)
              }
              else 
              {
                  month = fecha.getMonth() + 1
              }
              year = fecha.getFullYear()
              licDate = year + "/" + month + "/" + date
          }
          return {
            id: key,
            idCus: prop.Id_Customer,
            client: prop.Customer,
            application: prop.Application_Desc,
            suite: prop.Suite_Desc,
            licenseDate: licDate,
            idApp: prop.Id_Application,
            dateValid: fecha,
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

                <Button
                  onClick={() => {
                    getRegistroUsers(key);
                    //var url = ambiente + `/admin/edit-application/`
                    let obj = dataState.find((o) => o.id === key); 
                    history.push(ambiente + `/admin/customer-application-users/${obj.idCus}/${obj.idApp}/`);
                  }}
                  color="info"
                  size="sm"
                  className="btn-icon btn-link edit"
                >
                  <i className="nc-icon nc-single-02" />
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

    //Para saber que registro se van a ver sus usuarios
    const [recordUsers, setRecordUsers] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
    }

    function getRegistroUsers(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecordUsers(registro) 
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
                        Agregar Aplicación
                    </Button>
                 
                    <ReactTable
                        data={dataState}
                        columns={[
                            {
                                Header: "Cliente",
                                accessor: "client",
                            },
                            {
                                Header: "Aplicación",
                                accessor: "application",
                            },
                            {
                                Header: "Suite",
                                accessor: "suite",
                            },
                            {
                                Header: "Fecha de vigencia",
                                accessor: "licenseDate",
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
        <ModalAddCustomerApplication modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} record = {record} dataApplications = {dataApplications} dataCustomers = {dataCustomers} updateAddData = {updateAddData} ip={ip} autoCloseAlert = {autoCloseAlert}/>       

        {/*MODAL PARA MODIFICAR REGISTRO*/}
        <ModalUpdateCustomerApplication modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {setModalUpdateRecord} record = {record} dataApplications = {dataApplications} updateAddData = {updateAddData} ip={ip} autoCloseAlert = {autoCloseAlert}/>
    
        </>
    );
}

export default CustomerApplicationsTable;