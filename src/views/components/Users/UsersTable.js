import React, { useState, useEffect } from "react";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ModalAddUser from "views/components/Modals/ModalAddUser.js";
import ModalUpdateUser from "views/components/Modals/ModalUpdateUser.js";
import Skeleton from '@yisheng90/react-loading';

import {
  Button,
  Row,
  Col,
} from "reactstrap";

function UsersTable({dataTable, dataRoles, dataCustomers, updateAddData, validDays, pathImage, ip, profilePath, autoCloseAlert, changeImageP, setChangeImageP}){
    const [dataState, setDataState] = useState(
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
            name: prop.Name,
            email: prop.User,
            rol: prop.Role_Desc,
            idRole: prop.Id_Role,
            status: status,
            customer: prop.Customer,
            idCustomer: prop.Id_Customer,
            password: prop.Password,
            finalEffectiveDate: prop.Final_Effective_Date,
            image: prop.Profile_Pic_Path,
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
                                Header: "Nombre",
                                accessor: "name",
                            },
                            {
                                Header: "Email",
                                accessor: "email",
                            },
                            {
                                Header: "Rol",
                                accessor: "rol",
                            },
                            {
                                Header: "Estatus",
                                accessor: "status",
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
    
        {/*MODAL PARA MODIFICAR REGISTRO*/}
        <ModalUpdateUser abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} dataRoles = {dataRoles} dataCustomers = {dataCustomers} updateAddData = {updateAddData} validDays = {validDays} pathImage = {pathImage} ip = {ip} profilePath = {profilePath} autoCloseAlert = {autoCloseAlert} changeImageP = {changeImageP} setChangeImageP = {setChangeImageP}/>
        </>
    );
}

export default UsersTable;