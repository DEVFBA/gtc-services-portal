import React, { useState, useEffect } from "react";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import Skeleton from '@yisheng90/react-loading';

import ModalReadArticle69B from "views/components/Modals/ModalReadArticle69B.js";

import {
  Button,
  Row,
  Col,
} from "reactstrap";

function Articulo69BTable({dataTable}){
    const [dataState, setDataState] = React.useState(
        dataTable.map((prop, key) => {
          return {
            id: key,
            rfc: prop.RFC,
            contribuyente: prop.Contribuyente,
            situacionContribuyente: prop.Situacion_Contribuyente,
            fechaPresuncionSAT: prop.SAT_Num_Fecha_Presuncion,
            publicacionPresuntosSAT: prop.SAT_Publicacion_Presuntos,
            fechaOficioSAT: prop.DOF_Num_Fecha_Presuncion,
            pubDOFP: prop.DOF_Publicacion_Presuntos,
            numFechaDesvirtuados: prop.SAT_Num_Fecha_Desvirtuados,
            pubSATDesvirtuados: prop.SAT_Publicacion_Desvirtuados,
            numFechaDesvirtuadosDOF: prop.DOF_Num_Fecha_Desvrituados,
            pDOFDesvirtuados: prop.DOF_Publicacion_Desvirtuados,
            numFechaDefinitivos: prop.SAT_Num_Fecha_Definitivos,
            pubDefinitivos: prop.SAT_Publicacion_Definitivos,
            numFechaDefinitivosDOF: prop.DOF_Num_Fecha_Definitivos,
            pDOFDefinitivos: prop.DOF_Publicacion_Definitivos,
            numFechaSentencia: prop.SAT_Num_Fecha_Sentencia_Fav,
            pSentencia: prop.SAT_Publicacion_Sentencia_Fav,
            numFechaSentenciaDOF: prop.DOF_Num_Fecha_Sentencia_Fav,
            pSentenciaDOF: prop.DOF_Publicacion_Sentencia_Fav,
            actions: (
              // ACCIONES A REALIZAR EN CADA REGISTRO
              <div className="actions-center">
                {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                <abbr title="Ver detalle">
                  <Button
                    onClick={() => {
                      getRegistro(key);
                      toggleModalUpdateRecord()
                    }}
                    color="warning"
                    size="sm"
                    className="btn-icon btn-link edit"
                  >
                    <i className="nc-icon nc-alert-circle-i" />
                  </Button>
                </abbr>
              </div>
            ),
          };
        })
    );

    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);
    //Para saber que usuario se va a editar
    const [record, setRecord] = useState({});

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
      <div className="content">
        <Row>
          <Col md="12">
            <Skeleton height={25} />
            <Skeleton height="25px" />
            <Skeleton height="3rem" />
          </Col>
        </Row>
      </div>
    ) : (
        <div className="content">
          <Row>
            <Col md="12">
                <ReactTable
                  data={dataState}
                  columns={[
                      {
                          Header: "RFC",
                          accessor: "rfc",
                      },
                      {
                          Header: "Contribuyente",
                          accessor: "contribuyente",
                      },
                      {
                          Header: "Situación Contribuyente",
                          accessor: "situacionContribuyente",
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
          {/*MODAL PARA MODIFICAR REGISTRO*/}
          <ModalReadArticle69B abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} />
      </div>
    );
}

export default Articulo69BTable;