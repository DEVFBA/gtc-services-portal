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
import Articulo69Table from "../components/Articulo69/Articulo69Table";

function Articulo69() {

  //Para guardar el archivo
  const [excel, setExcel] = useState(null);
  const [JsonData, setJsonData]=useState([]);

  //Para guardar los datos de los usuarios
  const [dataArticulo69, setDataArticulo69] = useState([]);

  const [excelState69, setExcelState69] = useState("")
  const [excelState69B, setExcelState69B] = useState("")

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  }, []);

  //Renderizado condicional
  function Articulo69TableData() {
    return <Articulo69Table dataTable = {dataArticulo69}/>;
  }

  function uploadExcel()
  {
    if(excel !== null)
    {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(excel);
      fileReader.onload = (event) => {
      let data = new Uint8Array(event.target.result);

      var config = {
        type: 'array',
        cellDates: true,
        WTF: false,
        cellStyles: true,
        dateNF : 'dd/mm/yy',
        cellINF: true
      }
      let workbook = XLSX.read(data, config);
      var hojas =[];
      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        hojas.push({
          data: XL_row_object,
          sheetName
        })
      })
      
      var date;
      var month;
      var year;
      var fecha = "";
      for(var i=0; i< hojas[0].data.length; i++)
      {
        date = hojas[0].data[i]["FECHAS DE PRIMERA PUBLICACION"].getDate()
        month = hojas[0].data[i]["FECHAS DE PRIMERA PUBLICACION"].getMonth()
        year = hojas[0].data[i]["FECHAS DE PRIMERA PUBLICACION"].getFullYear()

        if(month < 10 && date < 10)
        {
          fecha = "0" + date + "/0" + (month+1) + "/" + year;  
        }
        else if(date < 10)
        {
          fecha = "0" + date + "/" + (month+1) + "/" + year;
        }
        else if(month < 10) 
        {  
          fecha = "" + date + "/0" + (month+1) + "/" + year;
        }
        else{
          fecha = "" + date + "/" + (month+1) + "/" + year;
        }
        hojas[0].data[i]["FECHAS DE PRIMERA PUBLICACION"] = fecha
        //console.log(hojas[0].data[i])
      }
        //console.log(JSON.stringify(hojas[0].data))
        setDataArticulo69(hojas[0].data)
      };
    }
    else{
      if (excelState69 !== "has-success") {
        setExcelState69("has-danger");
      }
    }
  }

  return dataArticulo69.length === 0 ? (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Articulo 69</CardTitle>
              </CardHeader>
              <CardBody>
                <Form> 
                  <Row> 
                    <Col>
                      <FormGroup className={`has-label ${excelState69}`}>
                        <Input 
                          className="form-control" 
                          type="file" id="fileUpload" 
                          accept=".xls, .xlsx, .csv" 
                          onChange={(e) => {
                            setExcel(e.target.files[0]);
                            setExcelState69("has-success")
                          }}/>
                        {excelState69 === "has-danger" ? (
                          <label className="error">
                            Selecciona un documento válido.
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button color="primary" onClick={uploadExcel}>
                        Subir datos
                      </Button> 
                    </Col>
                  </Row>
                </Form>
                {JsonData}
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Articulo 69-B</CardTitle>
              </CardHeader>
              <CardBody>
                <Form> 
                  <Row> 
                    <Col>
                      <FormGroup className={`has-label ${excelState69B}`}>
                        <Input 
                          className="form-control" 
                          type="file" id="fileUpload" 
                          accept=".xls, .xlsx, .csv" 
                          onChange={(e) => {
                            setExcel(e.target.files[0]);
                          }}/>
                        {excelState69B === "has-danger" ? (
                          <label className="error">
                            Selecciona un documento válido.
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button color="primary" onClick={console.log("hola")}>
                        Subir datos
                      </Button> 
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Articulo 69</CardTitle>
              </CardHeader>
              <CardBody>
                <Form> 
                  <Row> 
                    <Col>
                      <FormGroup className={`has-label ${excelState69}`}>
                        <Input 
                          className="form-control" 
                          type="file" id="fileUpload" 
                          accept=".xls, .xlsx, .csv" 
                          onChange={(e) => {
                            setExcel(e.target.files[0]);
                            setExcelState69("has-success")
                          }}/>
                        {excelState69 === "has-danger" ? (
                          <label className="error">
                            Selecciona un documento válido.
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button color="primary" onClick={uploadExcel}>
                        Subir datos
                      </Button> 
                    </Col>
                  </Row>
                </Form>
                {JsonData}
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Articulo 69-B</CardTitle>
              </CardHeader>
              <CardBody>
                <Form> 
                  <Row> 
                    <Col>
                      <FormGroup className={`has-label ${excelState69B}`}>
                        <Input 
                          className="form-control" 
                          type="file" id="fileUpload" 
                          accept=".xls, .xlsx, .csv" 
                          onChange={(e) => {
                            setExcel(e.target.files[0]);
                          }}/>
                        {excelState69B === "has-danger" ? (
                          <label className="error">
                            Selecciona un documento válido.
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button color="primary" onClick={console.log("hola")}>
                        Subir datos
                      </Button> 
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
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

export default Articulo69;
