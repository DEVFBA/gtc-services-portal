import React, { useState, useEffect } from "react";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import {
  Button,
  Row,
  Col,
} from "reactstrap";
import { prototype } from "react-datetime";

function Articulo69Table({dataTable}){
    const [dataState, setDataState] = useState(
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

export default Articulo69Table;