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
import ModalUpdateKeyProduct from "views/components/Modals/catalogs/sat/ModalUpdateKeyProduct";
import ModalAddKeyProduct from "views/components/Modals/catalogs/sat/ModalAddKeyProduct";

function KeyProduct({dataTable, updateAddData, ip, autoCloseAlert}) {
  const role = localStorage.getItem("Id_Role");
  const [dataState, setDataState] = React.useState(
    dataTable.map((prop, key) => {
      var status, vattransfer, iepstransfer;
      if(prop.Status === true){
          status = "Habilitado"
      }
      else{
          status = "No Habilitado"
      }

      if(prop.VAT_Transfer === 0){
        vattransfer = "No Incluir"
      }
      else if(prop.VAT_Transfer === 1){
        vattransfer = "Incluir"
      }
      else if(prop.VAT_Transfer === 2){
        vattransfer = "Opcional"
      }

      if(prop.IEPS_Transfer === 0){
        iepstransfer = "No Incluir"
      }
      else if(prop.IEPS_Transfer === 1){
        iepstransfer = "Incluir"
      }
      else if(prop.IEPS_Transfer === 2){
        iepstransfer = "Opcional"
      }

      return {
          id: key,
          idR: prop.Id_Catalog,
          shortDescription: prop.Short_Desc,
          longDescription: prop.Long_Desc,
          vatTransfer: vattransfer,
          iepsTransfer: iepstransfer,
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
    
    //Para actualizar cada que agreguen un campo a la tabla
    const [updateTable, setUpdateTable] = useState(0);

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

  return (
    <>
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            
                <h4>Clave Producto Servicio</h4>
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
                      Header: "Id",
                      accessor: "idR",
                    },
                    {
                      Header: "Desc. Corta",
                      accessor: "shortDescription",
                    },
                    {
                      Header: "Desc. Larga",
                      accessor: "longDescription",
                    },
                    {
                      Header: "Incluir IVA Traslado’ ",
                      accessor: "vatTransfer",
                    },
                    {
                      Header: "Incluir IEPS Traslado",
                      accessor: "iepsTransfer",
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
      <ModalAddKeyProduct modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert}/>       

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      <ModalUpdateKeyProduct abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert}/>

    </>
  );
}

export default KeyProduct;