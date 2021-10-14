import React, { useState, useEffect } from "react";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

const dataTable2 = [
    ["APP1", "Tiger Nixon", "System Architect", "Edinburgh", 1, 0],
    ["APP2", "Garrett Winters", "Accountant", "Tokyo", 0, 1],
    ["APP3", "Ashton Cox", "Junior Technical Author", "San Francisco", 1, 0],
    ["APP4", "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", 1, 0],
    ["APP5", "Airi Satou", "Accountant", "Tokyo", 0, 1],
    ["APP6", "Brielle Williamson", "Integration Specialist", "New York", 1, 0],
    ["APP7", "Herrod Chandler", "Sales Assistant", "San Francisco", 1, 0],
    ["APP8", "Rhona Davidson", "Integration Specialist", "Tokyo", 0, 0],
    ["APP9", "Colleen Hurst", "Javascript Developer", "San Francisco", 0, 0],
];

import {
  Button,
  Row,
  Col,
} from "reactstrap";
import { prototype } from "react-datetime";

function Articulo69BTable({dataTable}){
    /*const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
          var persona;
          if(prop["TIPO PERSONA"] === "M"){
              persona = "Moral"
          }
          else{
              persona = "Física"
          }
          return {
            id: key,
            rfc: prop['RFC'],
            razonSocial: prop['RAZÓN SOCIAL'],
            tipoPersona: persona,
            supuesto: prop["SUPUESTO"],
            fecha: prop["FECHAS DE PRIMERA PUBLICACION"],
            entidadFederativa: prop["ENTIDAD FEDERATIVA"],
          };
        })
    );*/

    const [dataState, setDataState] = React.useState(
        dataTable2.map((prop, key) => {
          var habilitado;
          if(prop[4] === 1 )
          {
            habilitado = "Habilitado"
          }
          else{
            habilitado = "Inhabilitado"
          }
          return {
            id: key,
            rfc: prop[0],
            razonSocial: prop[1],
            tipoPersona: prop[2],
            supuesto: prop[3],
            fecha: habilitado,
            entidadFederativa: prop[5],
            actions: (
              // ACCIONES A REALIZAR EN CADA REGISTRO
              <div className="actions-center">
                {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                {prop[4] === 1 ? (
                  <Button
                  onClick={() => {
                    let obj = dataState.find((o) => o.id === key);
                    history.push(`/admin/edit-configuration/${obj.idAplicacion}/`);
                  }}
                  color="warning"
                  size="sm"
                  className="btn-icon btn-link edit"
                >
                  <i className="fa fa-edit" />
                </Button>
                ) : null}
                
              </div>
            ),
          };
        })
    );

    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
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
                                Header: "Razón social",
                                accessor: "razonSocial",
                            },
                            {
                                Header: "Tipo de persona",
                                accessor: "tipoPersona",
                            },
                            {
                                Header: "Supuesto",
                                accessor: "supuesto",
                            },
                            {
                                Header: "Fecha",
                                accessor: "fecha",
                            },
                            {
                                Header: "Estado",
                                accessor: "entidadFederativa",
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
        </>
    );
}

export default Articulo69BTable;