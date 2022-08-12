import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import {
  Button,
  Row,
  Col,
} from "reactstrap";

function FacturacionTable({dataTable}){
    
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            return {
                id: key,
                rfcReceptor: prop.Tax_Id,
                nombreReceptor: prop.Name,
                fechaFactura: prop.Date,
                serie: prop.Serie,
                folio: prop.Folio,
                uuid: prop.UUID,
                actions: (
                    // ACCIONES A REALIZAR EN CADA REGISTRO
                    <div className="actions-center">
                      {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                      <abbr title="Ver Detalle">
                        <Button
                          onClick={() => {
                            getRegistro(key);
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

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
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
                                    Header: "RFC Receptor",
                                    accessor: "rfcReceptor",
                                },
                                {
                                    Header: "Nombre Receptor",
                                    accessor: "nombreReceptor",
                                },
                                {
                                    Header: "Fecha Facturación",
                                    accessor: "fechaFactura",
                                },
                                {
                                    Header: "Serie",
                                    accessor: "serie",
                                },
                                {
                                    Header: "folio",
                                    accessor: "folio",
                                },
                                {
                                    Header: "UUID",
                                    accessor: "uuid",
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
        </>
    );
}

export default FacturacionTable;