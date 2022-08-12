import React, {Component} from 'react'
import { useState, useEffect} from "react";
// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import ModalUpdateCustomerItemTaxes from "./ModalUpdateCustomerItemTaxes";

import {
    Button,
} from "reactstrap";

function CustomerItemsTaxesTable({dataTable, ip, autoCloseAlert, updateAddData, toggleModalAddRecord, dataFactorTypes, dataTaxes, dataCustomerItems}) {
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
              idItemTaxes: prop.Id_Item_Taxes,
              idCustomer: prop.Id_Customer,
              customer: prop.Customer,
              factorType: prop.Factor_Type,
              idFactorType: prop.Id_Factor_Type,
              idItem: prop.Id_Item,
              idItemTaxes: prop.Id_Item_Taxes,
              idTax: prop.Id_Tax,
              item: prop.Item,
              tax: prop.Tax,
              taxType: prop.Tax_Type,
              taxValue: prop.Tax_Value,
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

    return (
        <div>
            <Button color="primary" className='btn-add-customer' onClick={toggleModalAddRecord}>
                <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                </span>
                Añadir Cliente - Artículo Impuesto
            </Button>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "No. Item",
                        accessor: "idItem",
                    },
                    {
                        Header: "Descripción",
                        accessor: "item",
                    },
                    {
                        Header: "Tipo Factor",
                        accessor: "factorType",
                    },
                    {
                        Header: "Impuesto",
                        accessor: "tax",
                    },
                    {
                        Header: "Valor",
                        accessor: "taxValue",
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
            <ModalUpdateCustomerItemTaxes modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {toggleModalUpdateRecord} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert} dataFactorTypes = {dataFactorTypes} dataTaxes = {dataTaxes} record = {record}/>
        </div>
    )
    
}
export default CustomerItemsTaxesTable