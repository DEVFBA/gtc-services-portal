import React, { useState, useEffect } from "react";

//Convertir excel a json
import * as XLSX from 'xlsx'

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

function ConsultaArt69Component(dataTable) {

  //Para guardar el archivo
  const [excel, setExcel] = useState(null);
  const [JsonData, setJsonData]=useState([]);

  const [excelState69, setExcelState69] = useState("")
  const [excelState69B, setExcelState69B] = useState("")

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  }, []);

  //Renderizado condicional
  function Articulo69TableData() {
    return <Articulo69Table dataTable = {dataTable}/>;
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Artículo 69</CardTitle>
              </CardHeader>
              <CardBody>
                <Articulo69TableData />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ConsultaArt69Component;
