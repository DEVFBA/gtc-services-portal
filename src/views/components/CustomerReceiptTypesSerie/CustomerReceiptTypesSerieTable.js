import React, {Component} from 'react'
import { useState, useEffect} from "react";
// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import ModalUpdateCustomerReceiptTypesSerie from "./ModalUpdateCustomerReceiptTypesSerie";

import {
    Button,
} from "reactstrap";

function CustomerReceiptTypesTable({dataTable, ip, autoCloseAlert, updateAddData, toggleModalAddRecord, dataReceiptTypes}) {
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
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
              idCustomer: prop.Id_Customer,
              customer: prop.Customer,
              idReceiptType: prop.Id_Receipt_Type,
              receiptType: prop.Receipt_Type,
              serie: prop.Serie,
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

    const [modalReadRecord, setModalReadRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState([]);

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
        <div>
            <Button color="primary" className='btn-add-customer' onClick={toggleModalAddRecord}>
                <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                </span>
                Añadir Cliente - Tipo de Comprobante / Serie
            </Button>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Cliente",
                        accessor: "customer",
                    },
                    {
                        Header: "Tipo de Comprobante",
                        accessor: "receiptType",
                    },
                    {
                        Header: "Serie",
                        accessor: "serie",
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
            
            {/*MODAL PARA ACTUALIZAR REGISTRO*/}
            <ModalUpdateCustomerReceiptTypesSerie modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert} dataReceiptTypes = {dataReceiptTypes}/>
        </div>
    )
    
}
export default CustomerReceiptTypesTable