import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import {
  Row,
  Col,
} from "reactstrap";

function RequestCustomerStampingsTable({dataTable}){
    
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
    
            var success;
            if(prop.Successful === 0)
            {
                success = "Exitoso";
            }
            else {
                success = "Error";
            }

            return {
                id: key,
                uuid: prop.UUID,
                archivo: prop.File_Name,
                serie: prop.Serie,
                folio: prop.Folio,
                mensaje: prop.Execution_Message,
                exitoso: success,
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
                                    Header: "UUID",
                                    accessor: "uuid",
                                },
                                {
                                    Header: "Archivo",
                                    accessor: "archivo",
                                },
                                {
                                    Header: "Serie",
                                    accessor: "serie",
                                },
                                {
                                    Header: "Folio",
                                    accessor: "folio",
                                },
                                {
                                    Header: "Mensaje",
                                    accessor: "mensaje",
                                },
                                {
                                    Header: "Exitoso",
                                    accessor: "exitoso",
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

export default RequestCustomerStampingsTable;