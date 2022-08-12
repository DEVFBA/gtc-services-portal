import React, {Component} from 'react'
import { useState, useEffect} from "react";
// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import ModalReadBillTos from "./ModalReadBillTos";
import ModalUpdateCustomerBillTos from "./ModalUpdateCustomerBillTos";

import {
    Button,
} from "reactstrap";

function CustomerBillTosTable({dataTable, ip, autoCloseAlert, updateAddData, toggleModalAddRecord, dataEntityTypes, foreignTaxIdParameter, dataZipCodes, dataCountries, dataTaxRegimes, dataCFDIUses}) {
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            //console.log(prop)
            var status;
            if(prop.Status === true){
                status = "Habilitado"
            }
            else{
                status = "No Habilitado"
            }
            var foraneo;
            if(prop.Foreign === true){
                foraneo = "Si"
            }
            else{
                foraneo = "No"
            }
            return {
              id: key,
              idBillTo: prop.Id_Bill_To,
              idCustomer: prop.Id_Customer,
              customer: prop.Customer,
              idEntityType: prop.Id_Entity_Type,
              entityType: prop.Entity_Type,
              foreign: foraneo,
              taxId: prop.Tax_Id,
              name: prop.Name,
              zipCode: prop.Zip_Codes,
              idCountry: prop.Id_Country,
              country: prop.Country,
              foreignTaxId: prop.Foreign_Tax_Id,
              idTaxRegimen: prop.Id_Tax_Regimen, 
              taxRegimen: prop.Tax_Regimen,
              idCFDIUse: prop.Id_CFDI_Use,
              CFDIUse: prop.CFDI_Use,
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
                    <abbr title="Ver Detalle">
                        <Button
                            onClick={() => {
                                getRegistro(key);
                                toggleModalReadRecord()
                            }}
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                        >
                            <i className="fa fa-eye" />
                        </Button>
                    </abbr>
                </div>
              ),
            };
        })
    );

    const [modalReadRecord, setModalReadRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState([]);

    const token = localStorage.getItem("Token");

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

    function toggleModalReadRecord(){
        if(modalReadRecord == false){
            setModalReadRecord(true);
        }
        else{
            setModalReadRecord(false);
        }
    }

    return (
        <div>
            <Button color="primary" className='btn-add-customer' onClick={toggleModalAddRecord}>
                <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                </span>
                Añadir Cliente - Receptor Factura
            </Button>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Cliente",
                        accessor: "customer",
                    },
                    {
                        Header: "RFC",
                        accessor: "taxId",
                    },
                    {
                        Header: "Id Tributario",
                        accessor: "foreignTaxId",
                    },
                    {
                        Header: "Tipo Persona",
                        accessor: "entityType",
                    },
                    {
                        Header: "Extranjero",
                        accessor: "foreign",
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

            {dataTable.length === 0 ? (
                <div className ="no-data">
                    <h3>No hay datos</h3>
                </div>
            ): null}

            {/*MODAL PARA VER DETALLE*/}
            <ModalReadBillTos modalReadRecord = {modalReadRecord} setModalReadRecord = {setModalReadRecord} record = {record}/>
            
            {/*MODAL PARA ACTUALIZAR REGISTRO*/}
            <ModalUpdateCustomerBillTos modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert} dataEntityTypes = {dataEntityTypes} foreignTaxIdParameter = {foreignTaxIdParameter} dataZipCodes = {dataZipCodes} dataCountries = {dataCountries} dataTaxRegimes = {dataTaxRegimes} dataCFDIUses = {dataCFDIUses}/>
        </div>
    )
    
}
export default CustomerBillTosTable