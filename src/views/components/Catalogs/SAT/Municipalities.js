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

// core components
import ReactTable from "components/ReactTable/ReactTable.js"; 

function Municipalities({dataTable, updateAddData, ip, autoCloseAlert}) {
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
        status: status,
      };
    })
  );


    return dataTable.length === 0 ? (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <h4>Municipios</h4>
              <Skeleton height={25} />
              <Skeleton height="25px" />
              <Skeleton height="3rem" />
            </Col>
          </Row>
        </div>
      </>
    ) : (
    <>
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            
                <h4>Municipios</h4>
             
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
                            Header: "Id Estado",
                            accessor: "idState",
                        },
                        {
                            Header: "Nombre Estado",
                            accessor: "stateDesc",
                        },
                        {
                            Header: "Id Municipio",
                            accessor: "idMunicipality",
                        },
                        {
                            Header: "Nombre Municipio",
                            accessor: "municipalityDesc",
                        }
                    ]}
                /*
                    You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                    */
                    className="-striped -highlight primary-pagination"
                />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Municipalities;