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
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";
import Skeleton from '@yisheng90/react-loading';

import ConceptosTable from "./ConceptosTable";

// reactstrap components
import { FormGroup, Input, Row, Col, Label, Button } from "reactstrap";
import { data } from "jquery";

const Conceptos = React.forwardRef((props, ref) => {
    //Para cargar el componente hasta que toda la información sea descargada
    const [dataFind, setDataFind] = React.useState(true);

    const [dataCustomerItems, setDataCustomerItems] = useState([]);

    const [dataCustomerItemsTaxes, setDataCustomerItemsTaxes] = useState([]);
    
    const [dataCustomerItemsSelect, setDataCustomerItemsSelect] = useState([]);

    const token = localStorage.getItem("Token"); 

    const [dataConceptos, setDataConceptos] = useState([]);

    const [record, setRecord] = useState(null);

    const [subtotal, setSubtotal] = useState(0);

    const [traslados, setTraslados] = useState(0);

    const [retenciones, setRetenciones] = useState(0);

    const [total, setTotal] = useState(0);

    const [customer, setCustomer] = useState({});

    //Para manejar el borrado de algún concepto
    const [recordDelete, setRecordDelete] = useState(null);
    const [recordDeleteHora, setRecordDeleteHora] = useState(null);

    //Manejo de errores
    const [dataError, setDataError] = useState(""); 
    const [dataErrorMessage, setDataErrorMessage] = useState("");

    //Para guardar el cliente loggeado
    const customerLogged = localStorage.getItem("Id_Customer");

    React.useImperativeHandle(ref, () => ({
        isValidated: () => {
            return isValidated();
        },
        state: {
            dataConceptos,
            subtotal, 
            traslados,
            retenciones,
            total
        },
    }));

    const isValidated = () => {
        if (dataConceptos.length>0) 
        {
          return true;
        }
        else {
            return false;
        }
    };

    useEffect(() => {        
        var url = new URL(`${process.env.REACT_APP_API_URI}customer-items/${customerLogged}`);
        
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
                    value: data[i].Id_Item, label: data[i].Id_Item + " - " + data[i].Short_Desc 
                })
            }
            setDataCustomerItemsSelect(optionsAux);
            setDataCustomerItems(data);
            getDataCustomerItemsTaxes();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los Clientes - Items. ");
        });
    }, []);

   function getDataCustomerItemsTaxes() {        
        var url = new URL(`${process.env.REACT_APP_API_URI}customer-items-taxes/${customerLogged}`);
        
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
            setDataCustomerItemsTaxes(data);
            setDataFind(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los Clientes - Items Taxes. ");
        });
    }

    useEffect(() => {
        if(record !== null)
        {
            var dataAux = dataConceptos;
            dataAux.push(record)
            console.log(dataAux)
            var subtotal = 0;
            var traslados = 0;
            var retenciones = 0;
            var total = 0;
            for(var i=0; i<dataAux.length; i++)
            {
                subtotal = subtotal + dataAux[i].Subtotal;
                traslados = traslados + dataAux[i].Traslados;
                retenciones = retenciones + dataAux[i].Retenciones;
                total = total + dataAux[i].Total;
            }
            setSubtotal(subtotal);
            setTraslados(traslados);
            setRetenciones(retenciones);
            setTotal(total);
            setDataConceptos(dataAux);
            setDataFind(false);
        }
    }, [record]);

    useEffect(() => {
        //console.log("SI ENTRE AL USE EFFECT, EL VALOR DE RECORD DELETE ES: " + recordDelete);
        if(recordDelete !== null && recordDeleteHora !== null)
        {
            var dataAux = [];
            var dataAuxCount = 0;
            for(var i=0; i<dataConceptos.length; i++)
            {
                if(recordDelete !== i)
                {
                    dataAux[dataAuxCount] = dataConceptos[i];
                    dataAuxCount++;
                }
            }
            console.log(dataAux)
            var subtotal = 0;
            var traslados = 0;
            var retenciones = 0;
            var total = 0;
            for(var i=0; i<dataAux.length; i++)
            {
                subtotal = subtotal + dataAux[i].Subtotal;
                traslados = traslados + dataAux[i].Traslados;
                retenciones = retenciones + dataAux[i].Retenciones;
                total = total + dataAux[i].Total;
            }
            setSubtotal(subtotal);
            setTraslados(traslados);
            setRetenciones(retenciones);
            setTotal(total);
            setDataConceptos(dataAux);
            setDataFind(false);
        }
    }, [recordDeleteHora]);

    //Renderizado condicional
    function ConceptosT() {
        return <ConceptosTable dataTable = {dataConceptos} dataFind = {dataFind} setDataFind = {setDataFind} dataCustomerItems = {dataCustomerItems}  dataCustomerItemsSelect = {dataCustomerItemsSelect} setRecord={setRecord} setRecordDelete = {setRecordDelete} setRecordDeleteHora = {setRecordDeleteHora} dataCustomerItemsTaxes = {dataCustomerItemsTaxes}/>;
    }
  
    return dataFind === true ? (
        <>
            <h5 className="info-text">
                Datos de los conceptos
            </h5>
            <Row className="justify-content-center">
                <Col sm="8">
                    <Skeleton height={25} />
                    <Skeleton height="25px" />
                    <Skeleton height="3rem" />
                </Col>
            </Row>
        </>
    ):(
        <>
            <Row className="justify-content-center">
                <Col sm="12">
                    <h5 className="info-text">Datos de los conceptos</h5>
                </Col>
                <Col sm="12">
                    <ConceptosT />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm="7">
                </Col>
                <Col sm="2">
                    <h6 className="subtotales-conceptos">Subtotal</h6>
                </Col>
                <Col sm="3">
                    <FormGroup className="subtotales-conceptos-inputs">
                        <Input 
                            name="subtotal"
                            type="number"
                            autoComplete="off"
                            value={subtotal}
                            readOnly
                        /> 
                    </FormGroup>
                </Col>
                <Col sm="7">
                </Col>
                <Col sm="2">
                    <h6 className="subtotales-otros">Traslados</h6>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Input
                            name="iva"
                            type="number"
                            autoComplete="off"
                            value={traslados}
                            readOnly
                        /> 
                    </FormGroup>
                </Col>
                <Col sm="7">
                </Col>
                <Col sm="2">
                    <h6 className="subtotales-otros">Retenciones</h6>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Input
                            name="iva"
                            type="number"
                            autoComplete="off"
                            value={retenciones}
                            readOnly
                        /> 
                    </FormGroup>
                </Col>
                <Col sm="7">
                </Col>
                <Col sm="2">
                    <h6 className="subtotales-otros">Total</h6>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Input
                            name="total"
                            type="number"
                            autoComplete="off"
                            value={total}
                            readOnly
                        /> 
                    </FormGroup>
                </Col>
            </Row>
        </>
    );
});

export default Conceptos;