import React, { useState, useEffect } from "react";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalUpdateSupport from "views/components/Modals/ModalUpdateSupport";

import {
  Button,
  Row,
  Col,
} from "reactstrap";

function SupportApplicationsSettingsTable({dataTable, updateAddData, ip, autoCloseAlert}){
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
          return {
            id: key,
            settingsValue: prop.Settings_Value,
            tooltip: prop.Tooltip,
            use: prop.Use,
            idCustomer: prop.Id_Customer,
            idApplication: prop.Id_Application,
            settingsKey: prop.Settings_Key,
            settingsName: prop.Settings_Name,
            tooltip: prop.Tooltip,
            actions: (
                // ACCIONES A REALIZAR EN CADA REGISTRO
                <div className="actions-center">
                  {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                  <abbr title="Editar">
                    <Button
                      onClick={() => {
                        getRegistro(key);
                        toggleModalUpdateRecord()
                      }}
                      color="warning"
                      size="sm"
                      className="btn-icon btn-link edit"
                    >
                      <i className="fa fa-edit" />
                    </Button>
                  </abbr>
                </div>
              ),
          };
        })
      );

    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que usuario se va a editar
    const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
    }

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
          <div className="content">
            <Row>
              <Col md="12">
                    <ReactTable
                        data={dataState}
                        columns={[
                            {
                                Header: "Nombre de la configuración",
                                accessor: "settingsName",
                            },
                            {
                                Header: "Valor de la configuración",
                                accessor: "settingsValue",
                            },
                            {
                                Header: "Tooltip",
                                accessor: "tooltip",
                            },
                            {
                                Header: "Acciones",
                                accessor: "actions",
                                sortable: false,
                                filterable: false,
                            },
                        ]}
                        className="-striped -highlight primary-pagination"
                    />
                </Col>
            </Row>
        </div>
        {/*MODAL PARA MODIFICAR REGISTRO*/}
        <ModalUpdateSupport abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData} ip = {ip} autoCloseAlert = {autoCloseAlert}/>    
        </>
    );
}

export default SupportApplicationsSettingsTable;