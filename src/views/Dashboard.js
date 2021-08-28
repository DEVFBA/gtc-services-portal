/*!

=========================================================
* Paper Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

import { Link, useHistory } from "react-router-dom";
import { useState, useEffect} from "react";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  chartExample5,
  chartExample6,
  chartExample7,
  chartExample8,
} from "variables/charts.js";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

function Dashboard() {
  const sql = require("mssql"); //necesitamos el paquete sql
  const [countries, setCountries] = useState([]);
  const logged = localStorage.getItem("logged");
  const history = useHistory();

  React.useEffect(() => {
    //Si el usuario no ha iniciado sesión que se le redirija al login
    //Por el momento se usará la bandera logged
    if(logged!="true")
    {
      history.push("/auth/login");
      return;
    }
  }, []);

  React.useEffect(() => {
    /*fetch(`http://localhost:8091/api/cat-countries`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      }
    })
    .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
    })
    .then(function(data) {
        console.log(Object.values(data));
        setCountries(Object.values(data));
    })
    .catch(function(err) {
        alert("No se pudo consultar la informacion de los paises");
    });*/
  }, []);

  function crearCommercialRelease(event) {
    event.preventDefault();

    /*//Creando la tabla UDT
    var udtCommercialRelease = new sql.Table();
    // Las columnas deben corresponder con las creadas en la base de datos.   
    udtCommercialRelease.columns.add('Id_Item', sql.VarChar(50));  
    udtCommercialRelease.columns.add('Id_Country', sql.VarChar(10));
    udtCommercialRelease.columns.add('Id_Status_Commercial_Release', sql.SmallInt(2));
    udtCommercialRelease.columns.add('Final_Effective_Date', sql.DateTime(8));
    udtCommercialRelease.columns.add('Modify_By', sql.VarChar(50));
    udtCommercialRelease.columns.add('Modify_Date', sql.DateTime(8));
    udtCommercialRelease.columns.add('Modify_IP', sql.VarChar(20));

    // Add data into the table that will be pass into the procedure 
    //Necesitamos el Id_Item
    var Id_Item = "TSTAlexis1";
    //Necesitamos el Modify_By
    var Modify_By = "ALEXIS"
    //Necesitamos la fecha
    const fecha = new Date();
    for (var i = 0; i < countries.length; i++) {  
      udtCommercialRelease.rows.add(Id_Item, countries[i].Id_Country, 1, 19000101, Modify_By, fecha.getDate(), "IPALEXIS");  
    }
    console.log(udtCommercialRelease);*/

    /*const commercialRelease = {
      pvOptionCRUD: "C",
      pvIdLanguageUser: "ANG",
      //pudtCommercialRelease: udtCommercialRelease,
      pvcountries: countries,
      pvIdItem: Id_Item,
      pvUser: Modify_By,
      pvIP : "IPALEXIS"
    };
    
    fetch(`http://localhost:8091/api/commercial-release/crear`, {
      method: "POST",
      body: JSON.stringify(commercialRelease),
      headers: {
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
        console.log(data)
      }
    });*/

    
  }

  return (
    <>
        <div className="content">
          <button onClick={crearCommercialRelease}>
                  Crear Commercial Release
          </button>
        </div>
    </>
  );
}

export default Dashboard;
