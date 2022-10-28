import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';

// reactstrap components
import {
  Row,
  Col,
  FormGroup,
} from "reactstrap";

import Select from "react-select";

// core components
import Articulo69Table from "./Articulo69Table";

function ConsultaArt69Component({dataOptions}) {

  //Guardar catalogo seleccionado para descargar su lista de opciones
  const [catalog, setCatalog] = React.useState("");
  const [dataTable, setDataTable] = useState([]);
  const token = localStorage.getItem("Token");
  const [mensaje, setMensaje] = useState("");

  //Renderizado condicional
  function Articulo69TableData() {
    if(dataTable.length === 0)
    {
        return  <div>
                  <Skeleton height={25} />
                  <Skeleton height="25px" />
                  <Skeleton height="3rem" />
                </div>
    }
    else {
      return <Articulo69Table dataTable = {dataTable}/>;
    }
  }

  function updateData(datos){      
    setDataTable([])
    const params = {
      pvIdAssumption: datos.value
    }; 

    var url = new URL(`${process.env.REACT_APP_API_URI}article-69/69/`)

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
        console.log(data)
        if(data.length === 0)
        {
          setDataTable([])
          setMensaje("No hay datos")
        }
        else{
          setMensaje("")
          setDataTable(data)
        }
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los assumptions" + err);
    });
  }

  return dataTable.length === 0 ? (
    <div className="content">
      <FormGroup>
        {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
        <Select 
          name=""
          className="react-select"
          placeholder = "Selecciona un Supuesto para ver su información"
          classNamePrefix="react-select"
          value={catalog}
          onChange={(value) => {
            setMensaje("")
            setDataTable([])
            setCatalog(value);
            updateData(value)
          }}
          options = {dataOptions}
        />
      </FormGroup>
      <Row>
        <Col md="12">
          <h4 tag="h4">Artículo 69</h4>
          {mensaje !== "" ? (
              <>
                <h5 tag ="h5"> {mensaje} </h5>
              </>
            ) : (
              <>
                <Skeleton height={25} />
                <Skeleton height="25px" />
                <Skeleton height="3rem" />
              </>
            )
          }
        </Col>
      </Row>
    </div>
    ) : (
    <>
      <div className="content">
        <FormGroup>
          {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
          <Select 
            name=""
            className="react-select"
            placeholder = "Selecciona un assumption para ver su información"
            classNamePrefix="react-select"
            value={catalog}
            onChange={(value) => {
              setMensaje("")
              setCatalog(value);
              updateData(value)
            }}
            options = {dataOptions}
          />
        </FormGroup>
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
