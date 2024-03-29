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
import React, { useState, useEffect } from "react";
import classnames from "classnames";
// reactstrap components
import {
  Input,
  Button,
  InputGroupText,
  InputGroup,
  Row,
  Label,
  Col,
  FormGroup,
} from "reactstrap";

// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";
import ReactTable from "components/ReactTable/ReactTable.js";
import AddConfiguration from "./AddConfiguration.js";
import { Day } from "react-big-calendar";
import { data } from "jquery";

const SettingsStep2 = React.forwardRef((props, ref) => {
  //Aqui iremos guardando los registros de las configuraciones
  const [dataTable, setDataTable] = useState([]);

  //Para agregar una configuracion
  const [addRegister, setAddRegister] = useState({})

  const [dataState, setDataState] = useState(
    dataTable.map((prop, key) => {
      return {
        id: key,
        configuracion: prop[0],
        requerida: prop[1],
        editable: prop[2],
        visible: prop[3],
        tooltip: prop[4],
        actions: (
          // ACCIONES A REALIZAR EN CADA REGISTRO
          <div className="actions-center">
            {/* use this button to remove the data row */}
            <Button
              onClick={() => {
                var data = dataState;
                data.find((o, i) => {
                  if (o.id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
                    data.splice(i, 1);
                    console.log(data.length);
                    return true;
                  }
                  return false;
                });
                setDataState(data);
              }}
              color="danger"
              size="sm"
              className="btn-icon btn-link remove"
            ><i className="fa fa-times" />
            </Button>{" "}
          </div>
        ),
      };
    })
  )

  //Si el usuario no ha agredado configuraciones no se le permitirá guardar la aplicación o servicio
  const [dataTableState, setDataTableState] = React.useState("");
  const [dataTableFocus, setDataTableFocus] = React.useState("");

  useEffect(() => {
    //Simular la descarga de datos por primera vez
    /*const datos = [
      ["Tiger Nixon", "System Architect", "Edinburgh", "61", "Edinburgh", "61"],
      ["Garrett Winters", "Accountant", "Tokyo", "63", "Edinburgh", "61"],
      ["Ashton Cox", "Junior Technical Author", "San Francisco", "66", "Edinburgh", "61"],
      ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22", "Edinburgh", "61"],
      ["Airi Satou", "Accountant", "Tokyo", "33", "Edinburgh", "61"],
    ];
    setDataTable(datos);*/
  },[]);
  
 
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: {
      dataState,
    },
  }));

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const isValidated = () => {
    if(dataTable.length > 0)
    {
      setDataTableState("has-success");
      return true;
    }
    else{
      setDataTableState("has-danger");
      return false;
    }
  };

  function updateTable(){
    var aux = dataState;
    aux.push(addRegister);
    setDataState(aux)
    //setAddRegister({})
    /*console.log(dataTable)
    setDataState(
      dataTable.map((prop, key) => {
        return {
          id: key,
          configuracion: prop[0],
          requerida: prop[1],
          editable: prop[2],
          visible: prop[3],
          tooltip: prop[4],
          actions: (
            // ACCIONES A REALIZAR EN CADA REGISTRO
            <div className="actions-center">
              {//use this button to remove the data row }
              <Button
                onClick={() => {
                  var data = dataState;
                  console.log(dataState)
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      return true;
                    }
                    return false;
                  });
                  //ISSUE AL ELIMINAR - PENDIENTE...
                  setDataState(data);
                }}
                color="danger"
                size="sm"
                className="btn-icon btn-link remove"
              ><i className="fa fa-times" />
              </Button>{" "}
            </div>
          ),
        };
      })
    )*/
  }

  return (
    <>
      <h5 className="info-text">
        Agregar configuración
      </h5>
      <Row className="justify-content-center">
        <AddConfiguration dataState = {dataState} setDataState = {setDataState} updateTable= {updateTable} setAddRegister = {setAddRegister} />
        <Col className="mt-1" lg="12">
            <FormGroup
              className={classnames(dataTableState, {
                "input-group-focus": dataTableFocus,
              })}
              onFocus={(e) => setDataTableFocus(true)}
              onBlur={(e) => setDataTableFocus(false)}
            >
            {dataTableState === "has-danger" ? (
              <label className="error">Es necesario agregar al menos una configuración a la aplicación.</label>
            ) : null}
            </FormGroup>
            <ReactTable
              data={dataState}
              columns={[
                {
                  Header: "Configuración",
                  accessor: "configuracion",
                },
                {
                  Header: "Requerida",
                  accessor: "requerida",
                },
                {
                  Header: "Editable",
                  accessor: "editable",
                },
                {
                  Header: "Visible",
                  accessor: "visible",
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                  sortable: false,
                  filterable: false,
                },
              ]}
              /*
                  You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                */
              className="-striped -highlight primary-pagination"
          />
        </Col>
      </Row>
    </>
  );
});

export default SettingsStep2;