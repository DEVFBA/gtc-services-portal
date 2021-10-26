import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

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
  ModalFooter
} from "reactstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

const dataTable = [
  ["APP1", "Tiger Nixon", "System Architect", "Edinburgh", 1],
  ["APP2", "Garrett Winters", "Accountant", "Tokyo", 0],
  ["APP3", "Ashton Cox", "Junior Technical Author", "San Francisco", 1],
  ["APP4", "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", 1],
  ["APP5", "Airi Satou", "Accountant", "Tokyo", 0],
  ["APP6", "Brielle Williamson", "Integration Specialist", "New York", 1],
  ["APP7", "Herrod Chandler", "Sales Assistant", "San Francisco", 1],
  ["APP8", "Rhona Davidson", "Integration Specialist", "Tokyo", 0],
  ["APP9", "Colleen Hurst", "Javascript Developer", "San Francisco", 0],
];

function ClienteConfiguraciones() {
  const history = useHistory();
  const [dataState, setDataState] = React.useState(
    dataTable.map((prop, key) => {
      var habilitado;
      if(prop[4] === 1 )
      {
        habilitado = "Habilitado"
      }
      else{
        habilitado = "Inhabilitado"
      }
      return {
        id: key,
        idAplicacion: prop[0],
        aplicacion: prop[1],
        suite: prop[2],
        fechaVigencia: prop[3],
        estatus: habilitado,
        actions: (
          // ACCIONES A REALIZAR EN CADA REGISTRO
          <div className="actions-center">
            {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
            {prop[4] === 1 ? (
              <Button
              onClick={() => {
                let obj = dataState.find((o) => o.id === key);
                history.push(`/admin/edit-configuration/${obj.idAplicacion}/`);
              }}
              color="warning"
              size="sm"
              className="btn-icon btn-link edit"
            >
              <i className="fa fa-edit" />
            </Button>
            ) : null}
            
          </div>
        ),
      };
    })
  );

  const [modalReadRecord, setModalReadRecord] = useState(false);
  const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

  useEffect(() => {
    //Se descargan la lista de aplicaciones que el cliente tenga contratadas

    //los datos se van a guardar en dataState
  }, []);

  function toggleModalReadRecord(){
    if(modalReadRecord == false){
      setModalReadRecord(true);
    }
    else{
      setModalReadRecord(false);
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
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Client Settings</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Aplicación",
                      accessor: "aplicacion",
                    },
                    {
                      Header: "Suite",
                      accessor: "suite",
                    },
                    {
                      Header: "Fecha Vigencia",
                      accessor: "fechaVigencia",
                    },
                    {
                      Header: "Estatus",
                      accessor: "estatus",
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ClienteConfiguraciones;
