import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  Input,
  Modal, 
  ModalBody, 
  ModalFooter
} from "reactstrap";

// core components
import Articulo69BTable from "./Articulo69BTable";

function ConsultaArt69BComponent({dataTable}) {

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  }, []);

  //Renderizado condicional
  function Articulo69BTableData() {
    return <Articulo69BTable dataTable = {dataTable}/>;
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
                <h4 tag="h4">Artículo 69-B</h4>
                <Articulo69BTableData />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ConsultaArt69BComponent;