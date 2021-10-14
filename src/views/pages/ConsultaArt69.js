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
  Modal, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import Select from "react-select";


import ConsultaArt69Component from "views/components/Articulo69/ConsultaArt69Component.js";
import ConsultaArt69BComponent from "views/components/Articulo69/ConsultaArt69BComponent.js";

const options =[
    {value: "Articulo69", label: "Articulo 69"},
    {value: "Articulo69B", label: "Articulo 69-B"}
]

function ConsultaArt69() {
  //Para guardar los datos de los catálogos
  const [dataTable, setDataTable] = useState([]);

  //Guardar catalogo seleccionado para descargar su lista de opciones
  const [catalog, setCatalog] = React.useState("");

  //Para guardar los datos del catalogo seleccionado
  const [dataCatalog, setDataCatalog] = useState([]);
  const token = localStorage.getItem("Token");

  const [alert, setAlert] = React.useState(null);

  //Renderizado condicional
  function Catalog(props) {
    const catalog = props.component;
    if(catalog.value === "Articulo69")
    {
      return <ConsultaArt69Component dataTable = {dataCatalog}/>;
    }
    if(catalog.value === "Articulo69B")
    {
      return <ConsultaArt69BComponent dataTable = {dataCatalog}/>;
    }
    return <></>
  }

  //Nos servirá para pasarle los datos a la tabla ya descargados
  function updateData(datos){
    const params = {
      pvOptionCRUD: "R",
      pSpCatalog : datos.CRUD_References,
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/cat-catalogs/catalog`);
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
      setDataCatalog(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los catálogos" + err);
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
                <CardTitle tag="h4">Consulta Artículo 69 / 69-B</CardTitle>
                <FormGroup>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <Select 
                    name=""
                    className="react-select"
                    placeholder = "Selecciona un catálogo para ver su información"
                    classNamePrefix="react-select"
                    value={catalog}
                    onChange={(value) => {
                      setCatalog(value);
                      //updateData(dataTable.find(o => o.Component === e.value))
                    }}
                    options = {options}
                  />
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Catalog component = {catalog} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ConsultaArt69;
