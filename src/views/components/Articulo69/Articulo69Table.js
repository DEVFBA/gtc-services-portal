import React from "react";
import Skeleton from '@yisheng90/react-loading';

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

import {
  Row,
  Col,
} from "reactstrap";

function Articulo69Table({dataTable}){
    const [dataState, setDataState] = React.useState(
      dataTable.map((prop, key) => {
        var tipo;
        if(prop.Tipo_Persona === "M")
        {
          tipo = "Moral"
        }
        else {
          tipo = "Física"
        }
        return {
          id: key,
          rfc: prop.RFC,
          razonSocial: prop.Razon_Social,
          tipoPersona: tipo,
          supuesto: prop.Assumption_Desc,
          fecha: prop.Fecha_Publicacion,
          entidadFederativa: prop.Entidad_Federativa,
        };
      })
    );

    return dataTable.length === 0 ? (
      <div className="content">
        <Row>
          <Skeleton height={25} />
          <Skeleton height="25px" />
          <Skeleton height="3rem" />
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
  );
}

export default Articulo69Table;