import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import Cargando from "assets/img/loading_icon.gif";

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

  const [alert, setAlert] = React.useState(null);
  const [assumptions, setAssumptions] = useState([]);

  //Para el alert de cargando archivo
  const [alert2, setAlert2] = React.useState(null);

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
      //Descargamos la IP del usuario
      getData()
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar los assumptions para el select

    var url = new URL(`${process.env.REACT_APP_API_URI}assumptions/`)

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
        //Creamos el arreglo de roles para el select
        var optionsAux = [];
        var i;
        for(i=0; i<data.length; i++)
        {
          optionsAux.push({
            value: data[i].Id_Catalog, label: data[i].Short_Desc 
          })
        }
        setAssumptions(optionsAux)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los general parameters" + err);
    });
  }, []);

  useEffect(() => {
    //Aqui vamos a descargar la lista de general parameters para revisar el path de los logos
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}general-parameters/`);

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

  function uploadFile69(){
    if(excel69 !== null && supuestoState === "has-success")
    {
      console.log(excel69)
      let reader = new FileReader();
      let file = excel69;

      reader.onloadend = () => { 
        setFileState(file);
        setFileUpload(reader.result)
        autoCloseAlert2("Cargando archivo...")
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
        autoCloseAlert2("Cargando archivo...")
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

    fetch(`${process.env.REACT_APP_API_URI}article-69/create-article-69/`, {
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
        setError(
            <p>Hubo un error al realizar tu solicitud</p>
        );
      }
      else{
          hideAlert2()
          if(data[0].Code_Type === "Warning")
          {
              /*setErrorMessage(data[0].Code_Message_User)
              setErrorState("has-danger")*/
              resetFileInput()
              autoCloseAlert(data[0].Code_Message_User)
          }
          else if(data[0].Code_Type === "Error")
          {
              //setErrorMessage(data[0].Code_Message_User)
              resetFileInput()
              autoCloseAlert(data[0].Code_Message_User)
              //setErrorState("has-danger")
          }
          else{
              //setErrorState("has-success");
              //Para actualizar la tabla en componente principal
              resetFileInput()
              autoCloseAlert(data[0].Code_Message_User)
          }
      }
    });
  }

  function sendData69B(file){
    //EL USUARIO HAY QUE CAMBIARLO POR EL QUE SE HAYA LOGGEADO
    const catRegister = {
      pvFile: file,
      piIdCustomer: customer,
      pvFilesPath: filesPath,
      pvUser: user,
      pvIP: ip
    };

    fetch(`${process.env.REACT_APP_API_URI}article-69/create-article-69-B/`, {
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
          hideAlert2()
          //location.reload()
          if(data[0].Code_Type === "Warning")
          {
              /*setErrorMessage(data[0].Code_Message_User)
              setErrorState("has-danger")*/
              resetFileInput()
              autoCloseAlert(data[0].Code_Message_User)
          }
          else if(data[0].Code_Type === "Error")
          {
              //setErrorMessage(data[0].Code_Message_User)
              resetFileInput()
              autoCloseAlert(data[0].Code_Message_User)
              //setErrorState("has-danger")
          }
          else{
              //setErrorState("has-success");
              resetFileInput()
              //Para actualizar la tabla en componente principal
              autoCloseAlert(data[0].Code_Message_User)
          }
      }
    });
  }

  const autoCloseAlert = (mensaje) => {
    console.log("entre al alert")
    setAlert(
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Mensaje"
        onConfirm={() => hideAlert()}
        showConfirm={false}
      >
        {mensaje}
      </ReactBSAlert>
    );
    setTimeout(hideAlert, 2000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const autoCloseAlert2 = (mensaje) => {
    setAlert2(
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title=""
        onConfirm={() => hideAlert()}
        showConfirm={false}
      >
        <Row>
          <Col sm="4">
          </Col>
          <Col sm="4">
            <img 
              src = {Cargando} 
              style ={{ width: "50px", height: "50px" }}
            />
          </Col>
          <Col sm="4">
          </Col>
        </Row>
        &nbsp;
        {mensaje}
      </ReactBSAlert>
    );
  };

  const hideAlert2 = () => {
    setAlert2(null);
  };

  //Para resetear el input file al enviar el archivo
  const [theInputKey, setTheInputKey] = useState("")
  const [theInputKey2, setTheInputKey2] = useState("")

  function resetFileInput() {
    let randomString = Math.random().toString(36);
    setTheInputKey(randomString)
    setTheInputKey2(randomString)
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
                        options={assumptions}
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
                          key={theInputKey || '' }
                          accept=".xls, .xlsx, .csv" 
                          onChange={(e) => {
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
                          key={theInputKey2 || '' }
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
                {alert}
                {alert2}
              </CardBody>
            </Card>
          </Col>
        </Row> 
      </div>
    </>
  );
}

export default Articulo69;
