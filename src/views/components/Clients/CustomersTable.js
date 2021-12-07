import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalAddCustomer from "views/components/Modals/ModalAddClient.js";
import ModalUpdateClient from "views/components/Modals/ModalUpdateClient.js";

import {
  Button,
  Row,
  Col,
} from "reactstrap";
import { prototype } from "react-datetime";
import { data } from "jquery";

function CustomersTable({dataTable, dataCountries, updateAddData, pathLogo, ip, profilePath, autoCloseAlert}){
    const ambiente = process.env.REACT_APP_ENVIRONMENT
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
            idCus: prop.Id_Customer,
            nombre: prop.Name,
            taxId: prop.Tax_Id,
            street: prop.Street,
            interiorNumber: prop.Int_Number,
            exteriorNumber: prop.Ext_Number,
            city: prop.City,
            country: prop.Country_Desc,
            idCountry: prop.Id_Country,
            status: status,
            zipCode: prop.Zip_Code,
            contact: prop.Contact_Person,
            phone1: prop.Phone_1,
            phone2: prop.Phone_2,
            webPage: prop.Web_Page,
            logo: prop.Logo,
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
                        Agregar Cliente
                    </Button>
                 
                    <ReactTable
                        data={dataState}
                        columns={[
                            {
                                Header: "Nombre",
                                accessor: "nombre",
                            },
                            {
                                Header: "Rfc",
                                accessor: "taxId",
                            },
                            {
                                Header: "Calle",
                                accessor: "street",
                            },
                            {
                                Header: "No. Interior",
                                accessor: "interiorNumber",
                            },
                            {
                                Header: "No. Exterior",
                                accessor: "exteriorNumber",
                            },
                            {
                                Header: "Ciudad",
                                accessor: "city",
                            },
                            {
                                Header: "País",
                                accessor: "country",
                            },
                            {
                                Header: "Status",
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
        <ModalAddCustomer modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} record = {record} dataCountries = {dataCountries} updateAddData = {updateAddData} pathLogo = {pathLogo} ip = {ip} autoCloseAlert = {autoCloseAlert}/>       

        {/*MODAL PARA MODIFICAR REGISTRO*/}
        <ModalUpdateClient modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {setModalUpdateRecord} record = {record} dataCountries = {dataCountries} updateAddData = {updateAddData} pathLogo = {pathLogo} ip = {ip} profilePath = {profilePath} autoCloseAlert = {autoCloseAlert}/>
    
        </>
    );
}

export default CustomersTable;