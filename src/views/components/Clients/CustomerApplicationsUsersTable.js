import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalAddCustomerApplication from "views/components/Modals/ModalAddCustomerApplication.js";
import ModalUpdateCustomerApplication from "views/components/Modals/ModalUpdateCustomerApplication.js";

import {
  Button,
  Row,
  Col,
} from "reactstrap";
import { prototype } from "react-datetime";

function CustomerApplicationsUsersTable({dataTable}){
    const ambiente = "/DEV"
    const history = useHistory();
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
          return {
            id: key,
            usuario: prop.User,
            nombre: prop.User_Name,
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
                                Header: "Usuario",
                                accessor: "usuario",
                            },
                            {
                                Header: "Nombre",
                                accessor: "nombre",
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

export default CustomerApplicationsUsersTable;