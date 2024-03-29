import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactBSAlert from "react-bootstrap-sweetalert";

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


import CFDIUses from "views/components/Catalogs/SAT/CFDIUses";
import Countries from "views/components/Catalogs/SAT/Countries";
import Currencies from "views/components/Catalogs/SAT/Currencies";
import Customs from "views/components/Catalogs/SAT/Customs";
import CustomsUnits from "views/components/Catalogs/SAT/CustomsUnits";
import Incoterm from "views/components/Catalogs/SAT/Incoterm";
import KeyProduct from "views/components/Catalogs/SAT/KeyProduct";
import KeyUnit from "views/components/Catalogs/SAT/KeyUnit";
import PaymentMethods from "views/components/Catalogs/SAT/PaymentMethods";
import PaymentWays from "views/components/Catalogs/SAT/PaymentWays";
import PetitionTypes from "views/components/Catalogs/SAT/PetitionTypes";
import ReasonsTransfer from "views/components/Catalogs/SAT/ReasonsTransfer";
import TariffFractions from "views/components/Catalogs/SAT/TariffFractions";
import Taxes from "views/components/Catalogs/SAT/Taxes";
import TaxRegimes from "views/components/Catalogs/SAT/TaxRegimes";
import TypesOperation from "views/components/Catalogs/SAT/TypesOperation";
import VoucherTypes from "views/components/Catalogs/SAT/VoucherTypes";
import RelationshipTypes from "views/components/Catalogs/SAT/RelationshipTypes";
import Assumptions from "views/components/Catalogs/SAT/Assumptions";
import EntityTypes from "views/components/Catalogs/SAT/EntityTypes";
import Localities from "views/components/Catalogs/SAT/Localities";
import Municipalities from "views/components/Catalogs/SAT/Municipalities";
import States from "views/components/Catalogs/SAT/States";
import ZipCodes from "views/components/Catalogs/SAT/ZipCodes";

function CatalogosSAT() {
  //Para guardar los datos de los catálogos
  const [dataTable, setDataTable] = useState([]);

  //Guardar todos los catálogos para el select
  const [options, setOptions] = useState([]);

  //Guardar catalogo seleccionado para descargar su lista de opciones
  const [catalog, setCatalog] = React.useState("");

  //Para guardar los datos del catalogo seleccionado
  const [dataCatalog, setDataCatalog] = useState([]);

  const token = localStorage.getItem("Token");

  const [ip, setIP] = React.useState("");

  const [alert, setAlert] = React.useState(null);

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
      //Descargamos la IP del usuario
      getData()
  }, []);

  useEffect(() => {
    console.log("HOLA ENTRE")
    //Aqui vamos a descargar la lista de catalogos de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R",
      piIdCatalogType : 2,
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/`);

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
      //Creamos el arreglo de opciones para el select en orden alfabetico
      data.sort(function (a, b) {
        if (a.Short_Desc > b.Short_Desc) {
          return 1;
        }
        if (a.Short_Desc < b.Short_Desc) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      
      var optionsAux = [];
      var i;
      for(i=0; i<data.length; i++)
      {
        optionsAux.push({
          value: data[i].Component, label: data[i].Short_Desc 
        })
      }
      setOptions(optionsAux)
      
      //Guardamos el respaldo de los datos
      setDataTable(data);
      
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los catálogos" + err);
    });
  }, []);

  //Renderizado condicional
  function Catalog(props) {
    const catalog = props.component;
    if (catalog === "CFDIUses") {
      return <CFDIUses dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "Countries") {
      return <Countries dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "Currencies") {
      return <Currencies dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "Customs") {
      return <Customs dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "CustomsUnits") {
      return <CustomsUnits dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "Incoterm") {
      return <Incoterm dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "KeyProduct") {
      return <KeyProduct dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "KeyUnit") {
      return <KeyUnit dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "PaymentMethods") {
      return <PaymentMethods dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "PaymentWays") {
      return <PaymentWays dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "PetitionTypes") {
      return <PetitionTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "ReasonsTransfer") {
      return <ReasonsTransfer dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "TariffFractions") {
      return <TariffFractions dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "Taxes") {
      return <Taxes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "TaxRegimes") {
      return <TaxRegimes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "TypesOperation") {
      return <TypesOperation dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "VoucherTypes") {
      return <VoucherTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "RelationshipTypes") {
      return <RelationshipTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "Assumptions") {
      return <Assumptions dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "EntityTypes") {
      return <EntityTypes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "Locations") {
      return <Localities dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "Municipalities") {
      return <Municipalities dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "States") {
      return <States dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    if (catalog === "ZipCodes") {
      return <ZipCodes dataTable = {dataCatalog} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>;
    }
    return <p></p>
  }

  //Nos servirá para pasarle los datos a la tabla ya descargados
  function updateData(datos){
    console.log(datos)
    const params = {
      pvOptionCRUD: "R",
      pSpCatalog : datos.CRUD_References,
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);
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
      setDataCatalog(data)
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los catálogos" + err);
    });
  }

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    
    var datos = dataTable.find(o => o.Component === catalog)
    console.log(datos)
    console.log("entre")
   
    const params = {
      pvOptionCRUD: "R",
      pSpCatalog : datos.CRUD_References,
    };

    var url = new URL(`${process.env.REACT_APP_API_URI}cat-catalogs/catalog`);
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

  React.useEffect(() => {
    return function cleanup() {
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  }, []);

  const autoCloseAlert = (mensaje) => {
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


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Catálogos del SAT</CardTitle>
                <FormGroup>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <Select 
                    className="react-select"
                    classNamePrefix="react-select"
                    placeholder = "Selecciona un catálogo para administrar sus configuraciones"
                    options = {options}
                    onChange={(e) => {
                      setCatalog(e.value);
                      updateData(dataTable.find(o => o.Component === e.value))
                    }}
                  />
                </FormGroup>
              </CardHeader>
              <CardBody>
                    <Catalog component = {catalog} />
                    {alert}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CatalogosSAT;