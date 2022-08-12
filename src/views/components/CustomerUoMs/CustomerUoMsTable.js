import React, {Component} from 'react'
import { useState, useEffect} from "react";
// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import ModalUpdateCustomerUoM from "./ModalUpdateCustomerUoM";

import {
    Button,
} from "reactstrap";

function CustomerUoMsTable({dataTable, ip, autoCloseAlert, updateAddData, toggleModalAddRecord}) {
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            var status;
            console.log(prop)
            if(prop.Status === true){
                status = "Habilitado"
            }
            else{
                status = "No Habilitado"
            }
            return {
              id: key,
              idCustomer: prop.Id_Customer,
              customer: prop.Customer,
              idUoMCode: prop.Id_UoM_Code,
              uomCode: prop.UoM_Code,
              shortDesc: prop.Short_Desc,
              idCustomerUoM: prop.Id_Customer_UoM,
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

    return dataTable.length === 0 ? (
        <div>
            <Button color="primary" className='btn-add-customer' onClick={toggleModalAddRecord}>
                <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                </span>
                Añadir Cliente - Unidad de Medida SAT
            </Button>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Cliente",
                        accessor: "customer",
                    },
                    {
                        Header: "Unidad de Medida SAT",
                        accessor: "idUoMCode",
                    },
                    {
                        Header: "Desc. U. Medida SAT",
                        accessor: "uomCode",
                    },
                    {
                        Header: "U. Medida Cliente",
                        accessor: "idCustomerUoM",
                    },
                    {
                        Header: "Desc. U. Medida Cliente",
                        accessor: "customerUoMDesc",
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
            <div className ="no-data">
                <h3>No hay datos</h3>
            </div>
        </div>
    ) : 
    (
        <div>
            <Button color="primary" className='btn-add-customer' onClick={toggleModalAddRecord}>
                <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                </span>
                Añadir Cliente - Unidad de Medida SAT
            </Button>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Cliente",
                        accessor: "customer",
                    },
                    {
                        Header: "Unidad de Medida SAT",
                        accessor: "idUoMCode",
                    },
                    {
                        Header: "Desc. U. Medida SAT",
                        accessor: "uomCode",
                    },
                    {
                        Header: "U. Medida Cliente",
                        accessor: "idCustomerUoM",
                    },
                    {
                        Header: "Desc. U. Medida Cliente",
                        accessor: "shortDesc",
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
            
            {/*MODAL PARA MODIFICAR REGISTRO*/}
            <ModalUpdateCustomerUoM abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>
        </div>
    )
    
}
export default CustomerUoMsTable