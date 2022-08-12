import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';

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

// core components
import ReactTable from "components/ReactTable/ReactTable.js"; 
import ModalReadZipCodes from "views/components/Modals/catalogs/sat/ModalReadZipCodes";

function ZipCodes({dataTable, updateAddData, ip, autoCloseAlert}) {
  const role = localStorage.getItem("Id_Role");
  const [dataState, setDataState] = React.useState(
    dataTable.map((prop, key) => {
      var status;
      if(prop.Status === true){
          status = "Habilitado"
      }
      else{
          status = "No Habilitado"
      }
      return {
        id: key,
        idCountry: prop.Id_Country,
        countryDesc: prop.Country_Desc,
        idState: prop.Id_State,
        stateDesc: prop.State_Desc,
        idMunicipality: prop.Id_Municipality,
        municipalityDesc: prop.Municipality_Desc,
        idLocation: prop.Id_Location,
        locationDesc: prop.Location_Desc,
        zipCode: prop.Zip_Code,
        idCounty: prop.Id_County,
        description: prop.Description,
        status: status,
          actions: (
          // ACCIONES A REALIZAR EN CADA REGISTRO
          <>
            <div className="actions-center">
                {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                <abbr title="Ver Detalle">
                  <Button
                  onClick={() => {
                      getRegistro(key);
                      toggleModalReadRecord()
                  }}
                  color="warning"
                  size="sm"
                  className="btn-icon btn-link edit"
                  >
                  <i className="fa fa-eye" />
                  </Button>
                </abbr>
                {/*role === "GTCADMIN" || role === "GTCSUPPO" ? (
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
                ):null*/}
            </div>
          </>
          ),
      };
    })
  );

    const [modalReadRecord, setModalReadRecord] = useState(false);
    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);
    
    //Para saber que registro se va a editar
    const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
    }

    function toggleModalReadRecord(){
        if(modalReadRecord == false){
            setModalReadRecord(true);
        }
        else{
            setModalReadRecord(false);
        }
    }

    function toggleModalAddRecord(){
      if(modalAddRecord == false){
      setModalAddRecord(true);
      }
      else{
      setModalAddRecord(false);
      }
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
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            
                <h4>Códigos Postales</h4>

                {/*role === "GTCADMIN" || role === "GTCSUPPO" ? (
                  <Button color="primary" onClick={toggleModalAddRecord}>
                    <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                    </span>
                    Agregar Nuevo Registro
                  </Button>
                ): null*/}
             
                <ReactTable
                data={dataState}
                columns={[
                    {
                        Header: "Id País",
                        accessor: "idCountry",
                    },
                    {
                        Header: "Nombre País",
                        accessor: "countryDesc",
                    },
                    {
                        Header: "Código Postal",
                        accessor: "zipCode",
                    },
                    {
                        Header: "Id Colonia",
                        accessor: "idCounty",
                    },
                    {
                        Header: "Nombre Colonia",
                        accessor: "description",
                    },
                    {
                        Header: "Acciones",
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
    </div>

    {/*MODAL PARA VER REGISTROS*/}
    <ModalReadZipCodes modalReadRecord = {modalReadRecord} setModalReadRecord = {setModalReadRecord} record = {record}/>
    </>
  );
}

export default ZipCodes;