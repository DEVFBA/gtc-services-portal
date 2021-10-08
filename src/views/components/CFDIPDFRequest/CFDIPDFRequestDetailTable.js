import React, { useState, useEffect } from "react";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import { Link, useHistory } from "react-router-dom";

import {
  Button,
  Row,
  Col,
} from "reactstrap";
import { prototype } from "react-datetime";

function CFDIPDFRequestTable({dataTable}){
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
          return {
            id: key,
            uUID: prop.Customer_Record_Identifier,
            fecha: prop.Register_Date,
            mensaje: prop.Execution_Message,
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
                                accessor: "uUID",
                            },
                            {
                                Header: "Fecha de registro",
                                accessor: "fecha",
                            },
                            {
                                Header: "Mensaje",
                                accessor: "mensaje",
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

export default CFDIPDFRequestTable;