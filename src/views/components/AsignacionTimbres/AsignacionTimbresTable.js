import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import {
  Button,
  Row,
  Col,
} from "reactstrap";
import AsignacionTimbres from "views/pages/AsignacionTimbres";

function AsignacionTimbresTable({dataTable}){
    
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            var vigencia = ""
            var status = ""
            if(prop.Status === true)
            {
                status = "Vigente"
            }
            else 
            {
                status = "No Vigente"
            }

            var fecha = new Date(prop.Effective_Date)
            var date, month, year;
            if(fecha.getDate() < 10)
            {
                date = "0" + (fecha.getDate()+1)
            }
            else{
                date = (fecha.getDate()+1)
            }
            if((fecha.getMonth() + 1) < 10)
            {
                month = "0" + (fecha.getMonth() + 1)
            }
            else 
            {
                month = fecha.getMonth() + 1
            }
            year = fecha.getFullYear()
            vigencia = date + "/" + month + "/" + year

            return {
                id: key,
                nombreCliente: prop.Customer,
                timbresAsignados: prop.Assigned,
                timbresUsados: prop.Used,
                timbresDisponibles: prop.Availables,
                vigencia: vigencia,
                status: status,
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
                                    Header: "Nombre Cliente",
                                    accessor: "nombreCliente",
                                },
                                {
                                    Header: "Timbres Asignados",
                                    accessor: "timbresAsignados",
                                },
                                {
                                    Header: "Timbres Usados",
                                    accessor: "timbresUsados",
                                },
                                {
                                    Header: "Timbres Disponibles",
                                    accessor: "timbresDisponibles",
                                },
                                {
                                    Header: "Vigencia",
                                    accessor: "vigencia",
                                },
                                {
                                    Header: "Estatus",
                                    accessor: "status",
                                }
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

export default AsignacionTimbresTable;