import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';

// reactstrap components
import {
  Button,
  Row,
  Col,
} from "reactstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js"; 
import ModalUpdateTaxFee from "views/components/Modals/catalogs/sat/ModalUpdateTaxFee";
import ModalAddTaxFee from "views/components/Modals/catalogs/sat/ModalAddTaxFee.js";

function TaxFee({dataTable, updateAddData, ip, autoCloseAlert}) {
  const role = localStorage.getItem("Id_Role");
  const token = localStorage.getItem("Token");
  const [dataState, setDataState] = React.useState(
    dataTable.map((prop, key) => {
        var status, fixed, withholding, transfer;
        if(prop.Status === true){
            status = "Habilitado"
        }
        else{
            status = "No Habilitado"
        }
        if(prop.Fixed === true){
            fixed = "Fijo"
        }
        else{
            fixed = "Rango"
        }
        if(prop.Withholding === true){
            withholding = "Si"
        }
        else{
            withholding = "No"
        }
        if(prop.Transfer === true){
            transfer = "Si"
        }
        else{
            transfer = "No"
        }
        return {
            id: key,
            fixed: fixed,
            tax: prop.Tax,
            minimumValue: prop.Minimum_Value,
            maximumValue: prop.Maximum_Value,
            idTax: prop.Id_Tax,
            taxDesc: prop.Tax_Desc,
            idFactorType: prop.Id_Factor_Type,
            factorType: prop.Factor_Type,
            withholding: withholding,
            transfer: transfer,
            status: status,
            actions: (
            // ACCIONES A REALIZAR EN CADA REGISTRO
            <div className="actions-center">
                {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                {role === "GTCADMIN" || role === "GTCSUPPO" ? (
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
                ):null}
            </div>
          ),
      };
    })
  );

    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que registro se va a editar
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

    const [dataFind, setDataFind] = useState(true)
    const [dataTaxes, setDataTaxes] = useState([])
    const [dataFactorTypes, setDataFactorTypes] = useState([])

    useEffect(() => {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Taxes_CRUD_Records",
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url, {
            method: "GET",
            headers: {
                "access-token": token,
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
        //Creamos el arreglo de opciones para el select en orden alfabetico
        data.sort(function (a, b) {
            if (a.Short_Desc > b.Short_Desc) {
            return 1;
            }
            if (a.Short_Desc < b.Short_Desc) {
            return -1;
            }
            // a must be equal to b
            return 0;
        });
        
        var optionsAux = [];
        var i;
        for(i=0; i<data.length; i++)
        {
            optionsAux.push({
            value: data[i].Id_Catalog, label: data[i].Id_Catalog + " - " + data[i].Short_Desc 
            })
        }
            setDataTaxes(optionsAux);
            getDataFactorTypes();
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }, []);

    function getDataFactorTypes() {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Factor_Types_CRUD_Records",
        };

        var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url, {
            method: "GET",
            headers: {
                "access-token": token,
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            //Creamos el arreglo de opciones para el select en orden alfabetico
            data.sort(function (a, b) {
                if (a.Short_Desc > b.Short_Desc) {
                return 1;
                }
                if (a.Short_Desc < b.Short_Desc) {
                return -1;
                }
                // a must be equal to b
                return 0;
            });
            
            var optionsAux = [];
            var i;
            for(i=0; i<data.length; i++)
            {
                optionsAux.push({
                value: data[i].Id_Catalog, label: data[i].Id_Catalog + " - " + data[i].Short_Desc 
                })
            }
            setDataFactorTypes(optionsAux);
            setDataFind(false);
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    return (
    <>
      {/*console.log(props.example)*/}
        <div className="content">
            <Row>
                <Col md="12">
                    
                        <h4>Tasa O Cuota</h4>
                        {role === "GTCADMIN" || role === "GTCSUPPO" ? (
                        <Button color="primary" onClick={toggleModalAddRecord}>
                            <span className="btn-label">
                            <i className="nc-icon nc-simple-add" />
                            </span>
                            Agregar Nuevo Registro
                        </Button>
                        ): null}
                    
                        <ReactTable
                        data={dataState}
                        columns={[
                            {
                                Header: "Impuesto",
                                accessor: "tax",
                            },
                            {
                                Header: "Tipo Factor",
                                accessor: "factorType",
                            },
                            {
                                Header: "Fijo",
                                accessor: "fixed",
                            },
                            {
                                Header: "Valor Mínimo",
                                accessor: "minimumValue",
                            },
                            {
                                Header: "Valor Máximo",
                                accessor: "maximumValue",
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
        <ModalAddTaxFee modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert} dataTaxes = {dataTaxes} dataFactorTypes = {dataFactorTypes}/>       

        {/*MODAL PARA MODIFICAR REGISTRO*/}
        <ModalUpdateTaxFee abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert}/>

    </>
  );
}

export default TaxFee;