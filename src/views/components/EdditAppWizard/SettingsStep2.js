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
import ModalUpdateConfig from "../modals/ModalUpdateConfig.js";


const datos = [
      ["Tiger Nixon", "System Architect", "Edinburgh", "61", "Edinburgh", "61"],
      ["Garrett Winters", "Accountant", "Tokyo", "63", "Edinburgh", "61"],
      ["Ashton Cox", "Junior Technical Author", "San Francisco", "66", "Edinburgh", "61"],
      ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22", "Edinburgh", "61"],
      ["Airi Satou", "Accountant", "Tokyo", "33", "Edinburgh", "61"],
];

  const SettingsStep2 = React.forwardRef((props, ref) => {

    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    const [dataTable, setDataTable] = useState([]);
    const [dataState, setDataState] = useState(
      datos.map((prop, key) => {
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
                      let obj = dataState.find((o) => o.id === key);
                      setRecord(obj);
                      toggleModalUpdateRecord();
                      /*alert(
                      "You've clicked EDIT button on \n{ \nName: " +
                          obj.name +
                          ", \nposition: " +
                          obj.position +
                          ", \noffice: " +
                          obj.office +
                          ", \nage: " +
                          obj.age +
                          "\n}."
                      );*/
                  }}
                  color="warning"
                  size="sm"
                  className="btn-icon btn-link edit"
                  >
                <i className="fa fa-edit" />
              </Button>{" "}
              </div>
            ),
          };
      })
  )

  //Si el usuario no ha agredado configuraciones no se le permitirá guardar la aplicación o servicio
  const [dataTableState, setDataTableState] = React.useState("");
  const [dataTableFocus, setDataTableFocus] = React.useState("");

  //Para saber que configuracion se va a editar
  const [record, setRecord] = useState({});
  
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: {
      dataTable,
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

  function toggleModalUpdateRecord(){
    if(modalUpdateRecord == false){
      setModalUpdateRecord(true);
    }
    else{
      setModalUpdateRecord(false);
    }
  }

  return (
    <>
      <h5 className="info-text">
        Editar configuraciones
      </h5>
      <Row className="justify-content-center">
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

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      {/*Se le tiene que pasar como parametro la información de la configuración*/}
      <ModalUpdateConfig abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} setRecord = {setRecord}/>
    </>
  );
});

export default SettingsStep2;