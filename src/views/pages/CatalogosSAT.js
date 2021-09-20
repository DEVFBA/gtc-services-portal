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

  useEffect(() => {
    //Aqui vamos a descargar la lista de catalogos de la base de datos por primera vez
    const params = {
      pvOptionCRUD: "R",
      piIdCatalogType : 2,
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/cat-catalogs/`);

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
      //console.log(data)
      
      //Creamos el arreglo de opciones para el select
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
      return <CFDIUses dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "Countries") {
      return <Countries dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "Currencies") {
      return <Currencies dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "Customs") {
      return <Customs dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "CustomsUnits") {
      return <CustomsUnits dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "Incoterm") {
      return <Incoterm dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "KeyProduct") {
      return <KeyProduct dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "KeyUnit") {
      return <KeyUnit dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "PaymentMethods") {
      return <PaymentMethods dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "PaymentWays") {
      return <PaymentWays dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "PetitionTypes") {
      return <PetitionTypes dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "ReasonsTransfer") {
      return <ReasonsTransfer dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "TariffFractions") {
      return <TariffFractions dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "Taxes") {
      return <Taxes dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "TaxRegimes") {
      return <TaxRegimes dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "TypesOperation") {
      return <TypesOperation dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "VoucherTypes") {
      return <VoucherTypes dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    if (catalog === "RelationshipTypes") {
      return <RelationshipTypes dataTable = {dataCatalog} updateAddData = {updateAddData}/>;
    }
    return <p></p>
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

  //Para actualizar la tabla al insertar registro
  function updateAddData(){
    var datos = dataTable.find(o => o.Component === catalog)
   
    const params = {
      pvOptionCRUD: "R",
      pSpCatalog : datos.CRUD_References,
    };

    var url = new URL(`http://129.159.99.152/develop-api/api/cat-catalogs/catalog`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url, {
        method: "GET",
        headers: {
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
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">SAT Catalog</CardTitle>
                <FormGroup>
                  {/*Al seleccionar un catálogo se hará fetch para actualizar sus configuraciones*/}
                  <Select 
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CatalogosSAT;