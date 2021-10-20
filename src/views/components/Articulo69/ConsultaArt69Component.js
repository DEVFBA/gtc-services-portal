import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';

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
import Articulo69Table from "./Articulo69Table";

function ConsultaArt69Component({dataTable}) {

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  }, []);

  //Renderizado condicional
  function Articulo69TableData() {
    return <Articulo69Table dataTable = {dataTable}/>;
  }

  return dataTable.length === 0 ? (
      <>
        <div className="content">
          <Row>
            <Col md="12">
                  <h4 tag="h4">Artículo 69</h4>
                  <Skeleton height={25} />
                  <Skeleton height="25px" />
                  <Skeleton height="3rem" />
            </Col>
          </Row>
        </div>
      </>
    ) : (
    <>
      <div className="content">
        <Row>
          <Col md="12">
                <h4 tag="h4">Artículo 69</h4>
                <Articulo69TableData />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ConsultaArt69Component;
