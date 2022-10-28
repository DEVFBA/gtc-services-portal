import React, { useState } from "react";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import { useHistory } from "react-router-dom";

import {
  Button,
  Row,
  Col,
} from "reactstrap";

function CFDIPDFRequestTable({dataTable}){

    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const history = useHistory();

    const [dataState, setDataState] = useState(
      dataTable.map((prop, key) => {
        return {
          id: key,
          idCliente: prop.Id_Customer,
          cliente: prop.Customer_Name,
          requestCliente: prop.Request_Customer,
          status: prop.Request_Status_Customer_Desc,
          actions: (
            // ACCIONES A REALIZAR EN CADA REGISTRO
            <div className="actions-center">
              {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
              <abbr title="Ver detalle">
                  <Button
                      onClick={() => {
                          let obj = dataState.find((o) => o.id === key);
                          history.push(ambiente + `/admin/cfdi-requests/${obj.idCliente}/${obj.requestCliente}/`);
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

    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">         
                <ReactTable
                  data={dataState}
                  columns={[
                      {
                          Header: "Id Cliente",
                          accessor: "idCliente",
                      },
                      {
                          Header: "Cliente",
                          accessor: "cliente",
                      },
                      {
                          Header: "Request Cliente",
                          accessor: "requestCliente",
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
        </>
    );
}

export default CFDIPDFRequestTable;