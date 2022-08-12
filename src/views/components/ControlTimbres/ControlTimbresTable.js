import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import {
  Button,
  Row,
  Col,
} from "reactstrap";

function ControlTimbresTable({dataTable}){
    
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            var fechaRegistro;
            var fechaVigencia;
            if(prop.Register_Date === null){
                fechaRegistro = "-"
            }
            else{
                var fecha = new Date(prop.Register_Date)
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
                fechaRegistro = date + "/" + month + "/" + year
            }

            if(prop.Effective_Date === null){
                fechaVigencia = "-"
            }
            else{
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
                fechaVigencia = date + "/" + month + "/" + year
            }

            var estatus;
            if(prop.Status === 0)
            {
                estatus = "No Vigente";
            }
            else {
                estatus = "Vigente";
            }

            return {
                id: key,
                registerDate: fechaRegistro,
                assigned: prop.Assigned,
                used: prop.Used,
                vigencia: fechaVigencia,
                estate: estatus
            };
        })
      );

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <ReactTable
                            data={dataState}
                            columns={[
                                {
                                    Header: "Fecha de Registro",
                                    accessor: "registerDate",
                                },
                                {
                                    Header: "Timbres Asignados",
                                    accessor: "assigned",
                                },
                                {
                                    Header: "Timbres Utilizados",
                                    accessor: "used",
                                },
                                {
                                    Header: "Vigencia",
                                    accessor: "vigencia",
                                },
                                {
                                    Header: "Estatus",
                                    accessor: "estate",
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

export default ControlTimbresTable;