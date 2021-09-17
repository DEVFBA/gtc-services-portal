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
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalAddClient from "../components/Modals/ModalAddClient.js";
import ModalUpdateClient from "../components/Modals/ModalUpdateClient.js";

function Articulo69() {

  //Para guardar el archivo
  const [excel, setExcel] = useState(null);
  const [JsonData, setJsonData]=useState([]);

  const [excelState, setExcelState] = useState("Hola")

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  }, []);

  function uploadExcel()
  {
    if(excel !== null)
    {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(excel);
      fileReader.onload = (event) => {
        let data = new Uint8Array(event.target.result);
        let workbook = XLSX.read(data, {type: "array"});
        console.log(workbook);
        var hojas =[];
        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data: XL_row_object,
            sheetName
          })
        })
        //setJsonData(JSON.stringify(hojas));
        console.log(hojas)
      };
    }
    else{
      if (excelState !== "has-success") {
        setExcelState("has-danger");
      }
    }
  }

  return (
    <>
      {/*console.log(props.example)*/}
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
                      <FormGroup className={`has-label ${excelState}`}>
                        <Input 
                          className="form-control" 
                          type="file" id="fileUpload" 
                          accept=".xls, .xlsx, .csv" 
                          onChange={(e) => {
                            setExcel(e.target.files[0]);
                          }}/>
                        {excelState === "has-danger" ? (
                          <label className="error">
                            Selecciona un documento válido.
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button color="primary" onClick={uploadExcel}>
                        Convert Excel To Json
                      </Button> 
                    </Col>
                  </Row>
                </Form>
                {JsonData}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Articulo69;
