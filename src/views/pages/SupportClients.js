import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Modal, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Label,
} from "reactstrap";

// core components
import SupportClientsTable from "../components/SupportClients/SupportClientsTable.js";

import Select from "react-select";

function SupportClients() {

  const [noApps, setNoApps] = useState(false)

  //Guardar todos los catálogos para el select
  const [options, setOptions] = useState([]);

  //Guardar catalogo seleccionado para descargar su lista de opciones
  const [catalog, setCatalog] = React.useState("");

  //Para guardar los datos del catalogo seleccionado
  const [dataCatalog, setDataCatalog] = useState([]);
  const token = localStorage.getItem("Token"); 

  useEffect(() => {
    //Aqui vamos a descargar la lista de clientes
    const params = {
      pvOptionCRUD: "R"
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}customers/`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    //console.log(url)

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
      //Creamos el arreglo de opciones para el select
      var optionsAux = [];
      var i;
      for(i=0; i<data.length; i++)
      {
        optionsAux.push({
          value: data[i].Id_Customer, label: data[i].Name 
        })
      }
      setOptions(optionsAux)      
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los clientes" + err);
    });
  }, []);

  //Renderizado condicional
  function Catalog() {
    if(catalog !== "")
    {
      if(noApps === true)
      {
        return <h5>No hay aplicaciones para el cliente elegido</h5>;
      }
      else{
        return <SupportClientsTable dataTable = {dataCatalog}/>;
      }
    }
    return <></>
  }

  //Nos servirá para pasarle los datos a la tabla ya descargados
  function updateData(datos){
    /*const params = {
      pvOptionCRUD: "R", 
      piIdCustomer: datos
    };*/

    var url = new URL(`${process.env.REACT_APP_API_URI}customer-applications/${datos}/`);

    //Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    //console.log(url)

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
      console.log(data)
        if(data.length === 0)
        {
          setNoApps(true)
        }
        else {
          setNoApps(false)
        }
        setDataCatalog(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los clientes" + err);
    });
  }

  return (
    <>
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Configuración de Aplicaciones / Cliente</CardTitle>
                <FormGroup>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <Select 
                    name=""
                    className="react-select"
                    placeholder = "Selecciona un cliente para administrar sus configuraciones"
                    classNamePrefix="react-select"
                    options = {options}
                    onChange={(e) => {
                      setCatalog(e.value);
                      updateData(e.value)
                    }}
                  />
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Catalog />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SupportClients;
