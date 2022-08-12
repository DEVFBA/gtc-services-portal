import React, {Component} from 'react'
import { useState, useEffect} from "react";
// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import ModalReadCustomerItems from "./ModalReadCustomerItems";
import ModalUpdateCustomerItem from "./ModalUpdateCustomerItem";

import {
    Button,
} from "reactstrap";

function CustomerItemsTable({dataTable, ip, autoCloseAlert, updateAddData, toggleModalAddRecord, dataProductServiceCodes, dataUoMCodes, dataUoMCodesSelect, dataTaxObject,dataHarmonizedTariffCodes, dataHarmonizedTariffCodesSelect}) {
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
            return {
              id: key,
              branch: prop.Branch,
              idCustomer: prop.Id_Customer,
              customer: prop.Customer,
              customUoMs: prop.Custom_UoMs,
              harmonizedTariffCode: prop.Harmonized_Tariff_Code,
              idCustomUoMs: prop.Id_Custom_UoMs,
              idCustomerUoM: prop.Id_Customer_UoM,
              idHarmonizedTariffCode: prop.Id_Harmonized_Tariff_Code,
              idItem: prop.Id_Item,
              idProductServiceCode: prop.Id_Product_Service_Code,
              idTaxObject: prop.Id_Tax_Object,
              idUoMCode: prop.Id_UoM_Code,
              longDesc: prop.Long_Desc,
              model: prop.Model,
              productServiceCode: prop.Product_Service_Code,
              serialNumber: prop.Serial_Number,
              shortDesc: prop.Short_Desc,
              subModel: prop.SubModel,
              taxObject: prop.Tax_Object,
              UoMCode: prop.UoM_Code,
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
                Añadir Cliente - Artículo
            </Button>
            <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Cliente",
                        accessor: "customer",
                    },
                    {
                        Header: "No. Item",
                        accessor: "idItem",
                    },
                    {
                        Header: "Item",
                        accessor: "shortDesc",
                    },
                    {
                        Header: "Unidad Medida",
                        accessor: "idUoMCode",
                    },
                    {
                        Header: "Desc. Unidad de Medida",
                        accessor: "UoMCode",
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
            <ModalReadCustomerItems modalReadRecord = {modalReadRecord} setModalReadRecord = {setModalReadRecord} record = {record}/>
            
            {/*MODAL PARA ACTUALIZAR REGISTRO*/}
            <ModalUpdateCustomerItem modalUpdateRecord = {modalUpdateRecord} setModalUpdateRecord = {toggleModalUpdateRecord} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert} dataProductServiceCodes = {dataProductServiceCodes} dataUoMCodes = {dataUoMCodes} dataUoMCodesSelect = {dataUoMCodesSelect} dataTaxObject = {dataTaxObject} dataHarmonizedTariffCodes = {dataHarmonizedTariffCodes} dataHarmonizedTariffCodesSelect = {dataHarmonizedTariffCodesSelect} record = {record}/>
        </div>
    )
    
}
export default CustomerItemsTable