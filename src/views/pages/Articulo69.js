import React, { useState, useEffect } from "react";
import axios from 'axios'
import { convertArrayToCSV } from 'convert-array-to-csv'

//Convertir excel a json
import * as XLSX from 'xlsx'
import Select from "react-select";

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

//Sustituir por datos de la base
const options =[
  {value: "EXIGI", label: "Exigibles"},
  {value: "RETOR", label: "Firmes"},
  {value: "FIRME", label: "No localizados"},
  {value: "NOLOC", label: "Retorno Inversiones"}
]

function Articulo69() {

  //Para guardar el archivo
  const [excel69, setExcel69] = useState(null);
  const [excel69B, setExcel69B] = useState(null);
  const [JsonData, setJsonData] = useState([]);

  const [filesPath, setFilesPath] = useState("");

  //Para guardar los datos de los usuarios
  const [dataArticulo69, setDataArticulo69] = useState([]);

  const [fileUpload, setFileUpload] = useState();
  const [fileState, setFileState] = React.useState(null);

  const [excelState69, setExcelState69] = useState("")
  const [excelState69B, setExcelState69B] = useState("")

  const user = localStorage.getItem("User");
  const customer = localStorage.getItem("Id_Customer");
  const token = localStorage.getItem("Token");

  const [ip, setIP] = React.useState("");

  const [supuesto, setSupuesto] = useState("")
  const [supuestoState, setSupuestoState] = useState("")

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
      //Descargamos la IP del usuario
      getData()
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de general parameters para revisar el path de los logos
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/general-parameters/`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url, {
        method: "GET",
        headers: {
            "access-token": token,
            "Content-Type": "application/json",
        }
    })
    .then(function(response) {
        return response.ok ? response.json() : Promise.reject();
    })
    .then(function(data) {
        var aux = data.find( o => o.Id_Catalog === 11 )
        setFilesPath(aux.Value)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los general parameters" + err);
    });
  }, []);


  //Renderizado condicional
  function Articulo69TableData() {
    return <Articulo69Table dataTable = {dataArticulo69} filesPath = {filesPath}/>;
  }

  function uploadExcel()
  {
    if(excel69 !== null)
    {
      console.log(excel69)
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(excel69);
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
        console.log(hojas)
        
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

          //Reemplazar comas y comillas
          var rS1 = hojas[0].data[i]["RAZÓN SOCIAL"]
          var rS2 = rS1.replace(/,/g, '');
          var rS3 = rS2.replace(/"/g, '');
          hojas[0].data[i]["RAZÓN SOCIAL"] = rS3
        }
          //console.log(JSON.stringify(hojas[0].data))

        
        //console.log(hojas[0].data)
        //setDataArticulo69(hojas[0].data)
        const csvFromArrayOfObjects = convertArrayToCSV(hojas[0].data);
        sendData69B(csvFromArrayOfObjects)
      };
    }
    else{
      if (excelState69 !== "has-success") {
        setExcelState69("has-danger");
      }
    }
  }

  function uploadFile69(){
    if(excel69 !== null && supuestoState === "has-success")
    {
      console.log(excel69)
      let reader = new FileReader();
      let file = excel69;

      reader.onloadend = () => { 
        setFileState(file);
        setFileUpload(reader.result)
        console.log(reader.result)
        sendData69(reader.result)
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    else{
      if (excelState69 !== "has-success") {
        setExcelState69("has-danger");
      }
      if (supuestoState !== "has-success") {
        setSupuestoState("has-danger");
      }
    }
  }

  function uploadFile69B(){
    if(excel69B !== null)
    {
      let reader = new FileReader();
      let file = excel69B;

      reader.onloadend = () => { 
        setFileState(file);
        //setFileUpload(reader.result)
        sendData69B(reader.result)
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    else{
      if (excelState69B !== "has-success") {
        setExcelState69B("has-danger");
      }
    }
  }

  function sendData69(file){
    //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
    console.log(user)
    const catRegister = {
      pvOptionCRUD: "C",
      pvFile: file,
      pvFilesPath: filesPath,
      pvIdAssumption: supuesto.value,
      piIdCustomer: customer,
      pvUser: user,
      pvIP: ip
    };

    fetch(`http://localhost:9000/api/article-69/create-article-69/`, {
        method: "POST",
        body: JSON.stringify(catRegister),
        headers: {
            "access-token": token,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.errors) {
            console.log("Hubo un error al procesar tu solicitud")
        }
        else{
            console.log(data)
        }
    });
  }

  function sendData69B(file){
    //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
    const catRegister = {
      pvFile: file,
      pvFilesPath: filesPath,
      pvUser: user,
      pvIP: ip
    };

    fetch(`http://localhost:9000/api/article-69/create-article-69-B/`, {
        method: "POST",
        body: JSON.stringify(catRegister),
        headers: {
            "access-token": token,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.errors) {
            console.log("Hubo un error al procesar tu solicitud")
        }
        else{
            console.log(data)
        }
    });
  }

  return (
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
                    <FormGroup className={`has-label ${supuestoState}`}>
                      {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                      <Select 
                        name=""
                        className="react-select"
                        placeholder="Selecciona el supuesto del archivo a cargar"
                        classNamePrefix="react-select"
                        value={supuesto}
                        onChange={(value) => {
                          setSupuesto(value);
                          setSupuestoState("has-success");
                        }}
                        options={options}
                      />
                      {supuestoState === "has-danger" ? (
                          <label className="error">
                            Selecciona una opción.
                          </label>
                      ) : null}
                    </FormGroup>
                      <FormGroup className={`has-label ${excelState69}`}>
                        <Input 
                          className="form-control" 
                          type="file" id="fileUpload" 
                          accept=".xls, .xlsx, .csv" 
                          onChange={(e) => {
                            console.log(e.target.files[0])
                            setExcel69(e.target.files[0]);
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
                      <Button color="primary" onClick={uploadFile69}>
                        Subir datos
                      </Button> 
                    </Col>
                  </Row>
                </Form>
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
                            setExcel69B(e.target.files[0]);
                            setExcelState69B("has-success")
                          }}/>
                        {excelState69B === "has-danger" ? (
                          <label className="error">
                            Selecciona un documento válido.
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button color="primary" onClick={uploadFile69B}>
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
  );
}

export default Articulo69;
