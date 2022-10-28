import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Row,
  Col,
} from "reactstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js"; 
import ModalUpdateTariffFractions from "views/components/Modals/catalogs/sat/ModalUpdateTariffFractions";
import ModalAddTariffFractions from "views/components/Modals/catalogs/sat/ModalAddTariffFractions";

function TariffFractions({dataTable, updateAddData, ip, autoCloseAlert}) {
  const role = localStorage.getItem("Id_Role");
  const token = localStorage.getItem("Token");
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
          idR: prop.Id_Catalog,
          shortDescription: prop.Short_Desc,
          longDescription: prop.Long_Desc,
          idCustomUoMs: prop.Id_Custom_UoMs,
          customUoMs: prop.Custom_UoMs,
          status: status,
          actions: (
          // ACCIONES A REALIZAR EN CADA REGISTRO
          <div className="actions-center">
              {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
              {role === "GTCADMIN" || role === "GTCSUPPO" ? (
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
              ):null}
          </div>
          ),
      };
    })
  );

    const [modalAddRecord, setModalAddRecord] = useState(false);
    const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

    //Para saber que registro se va a editar
    const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
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

    const [dataCustomUoMs, setDataCustomUoMs] = useState([]);
    const [dataFind, setDataFind] = useState(true);

    useEffect(() => {
      const params = {
        pvOptionCRUD: "R",
        pSpCatalog : "spSAT_Cat_Custom_UoMs_CRUD_Records",
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
            value: data[i].Id_Catalog, label: data[i].Id_Catalog + " - " + data[i].Short_Desc 
          })
        }
        console.log(optionsAux)
        setDataCustomUoMs(optionsAux);
        setDataFind(false);
      })
      .catch(function(err) {
          alert("No se pudo consultar la informacion de los catálogos" + err);
      });
    }, []);

    return (
    <>
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            
                <h4>Fracciones Arancelarias</h4>
                {role === "GTCADMIN" || role === "GTCSUPPO" ? (
                  <Button color="primary" onClick={toggleModalAddRecord}>
                    <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                    </span>
                    Agregar Nuevo Registro
                  </Button>
                ): null}
             
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Id",
                      accessor: "idR",
                    },
                    {
                      Header: "Desc. Corta",
                      accessor: "shortDescription",
                    },
                    {
                      Header: "Desc. Larga",
                      accessor: "longDescription",
                    },
                    {
                      Header: "Id Unidad Aduana",
                      accessor: "idCustomUoMs",
                    },
                    {
                      Header: "Desc. Unidad Aduana",
                      accessor: "customUoMs",
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

    {/*MODAL PARA AÑADIR REGISTROS*/}
    <ModalAddTariffFractions modalAddRecord = {modalAddRecord} setModalAddRecord = {setModalAddRecord} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert} dataCustomUoMs = {dataCustomUoMs}/>       

    {/*MODAL PARA MODIFICAR REGISTRO*/}
    <ModalUpdateTariffFractions abierto = {modalUpdateRecord} toggleModalUpdateRecord = {toggleModalUpdateRecord} record = {record} updateAddData = {updateAddData} ip = {ip} autoCloseAlert={autoCloseAlert} dataCustomUoMs ={dataCustomUoMs}/>
    </>
  );
}

export default TariffFractions;