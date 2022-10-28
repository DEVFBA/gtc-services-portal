import React, { useEffect } from "react";

// reactstrap components
import {
  Row,
  Col,
} from "reactstrap";

// core components
import Articulo69BTable from "./Articulo69BTable";

function ConsultaArt69BComponent({dataTable}) {

  //Renderizado condicional
  function Articulo69BTableData() {
    return <Articulo69BTable dataTable = {dataTable}/>;
  }

  return (
    <div className="content">
      <Row>
        <Col md="12">
              <h4 tag="h4">Artículo 69-B</h4>
              <Articulo69BTableData />
        </Col>
      </Row>
    </div>
  );
}

export default ConsultaArt69BComponent;