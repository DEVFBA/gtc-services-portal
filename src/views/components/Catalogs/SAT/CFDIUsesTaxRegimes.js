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
import ModalUpdateCFDIUsesTaxRegimes from "views/components/Modals/catalogs/sat/ModalUpdateCFDIUsesTaxRegimes";
import ModalAddCFDIUsesTaxRegimes from "views/components/Modals/catalogs/sat/ModalAddCFDIUsesTaxRegimes.js";

function CFDIUsesTaxRegimes({dataTable, updateAddData, ip, autoCloseAlert}) {
  const role = localStorage.getItem("Id_Role");
  const token = localStorage.getItem("Token");

  const [dataState, setDataState] = React.useState(
    dataTable.map((prop, key) => {
        console.log(prop)
      var status;
      if(prop.Status === true){
          status = "Habilitado"
      }
      else{
          status = "No Habilitado"
      }
      return {
          id: key,
          idTaxRegimen: prop.Id_Tax_Regimen,
          taxRegimenDesc: prop.Tax_Regimen,
          idCFDIUse: prop.Id_CFDI_Use,
          CFDIUseDesc: prop.CFDI_Use,
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

    const [dataCFDIUses, setDataCFDIUses] = useState([]);
    const [dataTaxRegimens, setDataTaxRegimens] = useState([]);
    const [dataFind, setDataFind] = useState(true);

    useEffect(() => {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_CFDI_Uses_CRUD_Records",
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
            setDataCFDIUses(optionsAux);
            getDataTaxRegimens();
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }, []);

    function getDataTaxRegimens() {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Tax_Regimens_CRUD_Records",
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
                if (a.State_Desc > b.State_Desc) {
                return 1;
                }
                if (a.State_Desc < b.State_Desc) {
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
            setDataTaxRegimens(optionsAux);
            setDataFind(false);
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

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

    return dataFind === true ? (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <h4>Régimenes Fiscales – Usos de CFDI</h4>
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
              </Col>
            </Row>
          </div>
        </>
      ) : (
    <>
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            
                <h4>Régimenes Fiscales – Usos de CFDI</h4>
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
                            Header: "Id Régimen Fiscal",
                            accessor: "idTaxRegimen",
                        },
                        {
                            Header: "Desc. Régimen Fiscal",
                            accessor: "taxRegimenDesc",
                        },
                        {
                            Header: "Id Uso CFDI",
                            accessor: "idCFDIUse",
                        },
                        {
                            Header: "Desc. Uso CFDI",
                            accessor: "CFDIUseDesc",
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
          </Col>
        </Row>
      </div>

      {/*MODAL PARA AÑADIR REGISTROS*/}
      <ModalAddCFDIUsesTaxRegimes modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert} dataCFDIUses = {dataCFDIUses} dataTaxRegimens = {dataTaxRegimens}/>       

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      <ModalUpdateCFDIUsesTaxRegimes abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert}/>

    </>
  );
}

export default CFDIUsesTaxRegimes;