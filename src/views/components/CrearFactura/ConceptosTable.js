import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import Select from "react-select";

import { FormGroup, Input, Row, Col, Label, Button } from "reactstrap";

function ConceptosTable({dataTable, dataFind, setDataFind, dataCustomerItems, dataCustomerItemsSelect, setRecord,  setRecordDelete, setRecordDeleteHora, dataCustomerItemsTaxes}){

    //Datos para los inputs
    const [cantidad, setCantidad] = useState(0);
    const [idProductServiceCode, setIdProductServiceCode] = useState("");
    const [productServiceCode, setProductServiceCode] = useState("");
    const [item, setItem] = useState({});
    const [idUoMCode, setIdUoMCode] = useState("");
    const [uoMCode, setUoMCode] = useState("");
    const [IdTaxObject, setIdTaxObject] = useState("");
    const [taxObject, setTaxObject] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioUnitario, setPrecioUnitario] = useState(0);
    const [retencionIVA, setRetencionIVA] = useState(0);
    const [retencionIVAObject, setRetencionIVAObject] = useState({});
    const [retencionIEPS, setRetencionIEPS] = useState(0);
    const [retencionIEPSObject, setRetencionIEPSObject] = useState({});
    const [retencionISR, setRetencionISR] = useState(0);
    const [retencionISRObject, setRetencionISRObject] = useState({});
    const [trasladoIVA, setTrasladoIVA] = useState(0);
    const [trasladoIVAObject, setTrasladoIVAObject] = useState({});
    const [trasladoIEPS, setTrasladoIEPS] = useState(0);
    const [trasladoIEPSObject, setTrasladoIEPSObject] = useState({});
    const [trasladoISR, setTrasladoISR] = useState(0);
    const [trasladoISRObject, setTrasladoISRObject] = useState({});

    //Para validar los inputs
    const [cantidadState, setCantidadState] = useState()
    const [itemState, setItemState] = useState({})
    const [descripcionState, setDescripcionState] = useState()
    const [precioUnitarioState, setPrecioUnitarioState] = useState()
    
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
            return {
                id: key,
                cantidad: prop.Cantidad,
                idItem: prop.Id_Item,
                claveProductoDesc: prop.Clave_Producto_Desc,
                descripcion: prop.Descripcion,
                precioUnitario: prop.Precio_Unitario,
                subtotal: prop.Subtotal,
                traslados: prop.Traslados,
                retenciones: prop.Retenciones,
                total: prop.Total,
                actions: (
                    // ACCIONES A REALIZAR EN CADA REGISTRO
                    <div className="actions-center">
                      {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                      <abbr title="Eliminar">
                        <Button
                          onClick={() => {
                            console.log("SI ENTRE AL BOTON Y MI KEY ES: " + key);
                            var today = new Date();
                            var now = today.toLocaleString();
                            setRecordDeleteHora(now);
                            setDataFind(true);
                            setRecordDelete(key)
                          }}
                          color="danger"
                          size="sm"
                          className="btn-icon btn-link remove"
                        >
                          <i className="fa fa-times" />
                        </Button>
                      </abbr>
                    </div>
                  ),
            };
        })
    );

    const isValidated = () => {
        if (
            cantidadState === "has-success" &&
            itemState === "has-success" &&
            descripcionState === "has-success" &&
            precioUnitarioState === "has-success"
        ) {
            return true;
        } else {
          if (cantidadState !== "has-success") {
            setCantidadState("has-danger");
          }
          if (itemState !== "has-success") {
            setItemState("has-danger");
          }
          if (descripcionState !== "has-success") {
            setDescripcionState("has-danger");
          }
          if (precioUnitarioState !== "has-success") {
            setPrecioUnitarioState("has-danger");
          }
            return false;
        }
    };

    const verifyLength = (value, length) => {
        if (value.length >= length) {
            return true;
        }
        return false;
    };

    function registerClick(){
        if(isValidated()===true)
        {
            var impuestos = [
                {
                    Traslados: []
                },
                {
                    Retenciones: []
                }
            ];

            if(trasladoIVAObject.Tax_Value !== undefined)
            {
                impuestos[0].Traslados.push({
                    Traslado_Importe: (cantidad * precioUnitario) * trasladoIVA,
                    Traslado_Objeto: trasladoIVAObject,
                });
            }
            if(trasladoISRObject.Tax_Value !== undefined)
            {
                impuestos[0].Traslados.push({
                    Traslado_Importe : (cantidad * precioUnitario) * trasladoISR,
                    Traslado_Objeto: trasladoISRObject
                });
            }
            if(trasladoIEPSObject.Tax_Value !== undefined)
            {
                impuestos[0].Traslados.push({
                    Traslado_Importe : (cantidad * precioUnitario) * trasladoIEPS,
                    Traslado_Objeto: trasladoIEPSObject
                });
            }

            if(retencionIVAObject.Tax_Value !== undefined)
            {
                impuestos[1].Retenciones.push({
                    Retencion_Importe : (cantidad * precioUnitario) * retencionIVA,
                    Retencion_Objeto: retencionIVAObject
                });
            }
            if(retencionISRObject.Tax_Value !== undefined)
            {
                impuestos[1].Retenciones.push({
                    Retencion_Importe : (cantidad * precioUnitario) * retencionISR,
                    Retencion_Objeto : retencionISRObject
                });
            }
            if(retencionIEPSObject.Tax_Value !== undefined)
            {
                impuestos[1].Retenciones.push({
                    Retencion_Importe : (cantidad * precioUnitario) * retencionIEPS,
                    Retencion_Objeto: retencionIEPSObject
                });
            }


            setDataFind(true);
            var record = {
                Cantidad : cantidad,
                Id_Item: item.value,
                Clave_Producto_Desc : productServiceCode,
                Clave_Producto: idProductServiceCode,
                Descripcion : descripcion,
                Clave_Unidad: idUoMCode,
                Clave_Unidad_Desc: uoMCode,
                Objeto_Impuesto: IdTaxObject,
                Objeto_Impuesto_Desc: taxObject,
                Precio_Unitario : precioUnitario,
                Subtotal : cantidad * precioUnitario,
                Impuestos: impuestos,
                Traslados: (cantidad * precioUnitario) * trasladoIVA + (cantidad * precioUnitario) * trasladoISR + (cantidad * precioUnitario) * trasladoIEPS,
                Retenciones: (cantidad * precioUnitario) * retencionIVA + (cantidad * precioUnitario) * retencionISR + (cantidad * precioUnitario) * retencionIEPS,
                Total : (cantidad * precioUnitario) + ((cantidad * precioUnitario) * trasladoIVA) + ((cantidad * precioUnitario) * trasladoIEPS) + ((cantidad * precioUnitario) * trasladoISR) - ((cantidad * precioUnitario) * retencionIVA) - ((cantidad * precioUnitario) * retencionIEPS) - ((cantidad * precioUnitario) * retencionISR)
            }
            //addConcept(record)
            setRecord(record)
        }
        else{
            console.log("no entre" )
        }
    }   

    //Para saber que usuario se va a editar
    //const [record, setRecord] = useState({});

    function getRegistro(key)
    {
        var registro = dataState.find((o) => o.id === key)
        setRecord(registro) 
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col>
                        <FormGroup className={`has-label ${cantidadState}`}>
                                <Label for="exampleSelect">Cantidad * </Label>
                                <Input
                                    name="rfc"
                                    type="number"
                                    min={0}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        if (!verifyLength(e.target.value, 1)) {
                                            setCantidadState("has-danger");
                                        } else {
                                            setCantidadState("has-success");
                                        }
                                        setCantidad(e.target.value);
                                    }}
                                />
                                {cantidadState === "has-danger" ? (
                                    <label className="error">Este campo es requerido.</label>
                                ) : null}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className={`has-label ${itemState}`}>
                            <Label for="exampleSelect">Item * </Label>
                            <Select
                                name=""
                                className="react-select"
                                placeholder="Selecciona un Item"
                                classNamePrefix="react-select"
                                onChange={(value) => {
                                    console.log(dataCustomerItems.find( o => o.Id_Item === value.value))
                                    setProductServiceCode(dataCustomerItems.find( o => o.Id_Item === value.value).Product_Service_Code);
                                    setIdProductServiceCode(dataCustomerItems.find( o => o.Id_Item === value.value).Id_Product_Service_Code);
                                    setItem(value);
                                    setItemState("has-success");
                                    setDescripcion(dataCustomerItems.find( o => o.Id_Item === value.value).Product_Service_Code);
                                    setDescripcionState("has-success");
                                    setIdUoMCode(dataCustomerItems.find( o => o.Id_Item === value.value).Id_UoM_Code);
                                    setUoMCode(dataCustomerItems.find( o => o.Id_Item === value.value).UoM_Code);
                                    setIdTaxObject(dataCustomerItems.find( o => o.Id_Item === value.value).Id_Tax_Object);
                                    setTaxObject(dataCustomerItems.find( o => o.Id_Item === value.value).Tax_Object);

                                    var tIVA = dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "T" && element.Tax === "IVA" && element.Id_Item === value.value})
                                    if(tIVA.length !== 0)
                                    {
                                        setTrasladoIVA(tIVA[0].Tax_Value)
                                        setTrasladoIVAObject(tIVA[0])
                                    }

                                    var tISR = dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "T" && element.Tax === "ISR" && element.Id_Item === value.value})
                                    if(tISR.length !== 0)
                                    {
                                        setTrasladoISR(tISR[0].Tax_Value)
                                        setTrasladoISRObject(tISR[0])
                                    }

                                    var tIEPS = dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "T" && element.Tax === "IEPS" && element.Id_Item === value.value})
                                    if(tIEPS.length !== 0)
                                    {
                                        setTrasladoIEPS(tIEPS[0].Tax_Value)
                                        setTrasladoIEPSObject(tIEPS[0])
                                    }

                                    var rIVA = dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "R" && element.Tax === "IVA" && element.Id_Item === value.value})
                                    if(rIVA.length !== 0)
                                    {
                                        setRetencionIVA(rIVA[0].Tax_Value)
                                        setRetencionIVAObject(rIVA[0])
                                    }

                                    var rISR = dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "R" && element.Tax === "ISR" && element.Id_Item === value.value})
                                    if(rISR.length !== 0)
                                    {
                                        setRetencionISR(rISR[0].Tax_Value)
                                        setRetencionISRObject(rISR[0])
                                    }

                                    var rIEPS = dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "R" && element.Tax === "IEPS" && element.Id_Item === value.value})
                                    if(rIEPS.length !== 0)
                                    {
                                        setRetencionIEPS(rIEPS[0].Tax_Value)
                                        setRetencionIEPSObject(rIEPS[0])
                                    }
                                }}
                                options={dataCustomerItemsSelect}
                            />
                            {itemState === "has-danger" ? (
                                <label className="error">Selecciona un item.</label>
                            ) : null}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="exampleSelect">Clave Producto Servicio</Label>
                            <Input
                                name="claveproductoservicio"
                                type="text"
                                autoComplete="off"
                                value={idProductServiceCode + " - " + productServiceCode}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup className={`has-label ${descripcionState}`}>
                            <Label for="exampleSelect">Descripción Producto * </Label>
                            <Input
                                name="descripcionProducto"
                                type="text"
                                autoComplete="off"
                                value={descripcion}
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setDescripcionState("has-danger");
                                    } else {
                                        setDescripcionState("has-success");
                                    }
                                    setDescripcion(e.target.value);
                                }}
                            />
                            {descripcionState === "has-danger" ? (
                                <label className="error">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className={`has-label ${precioUnitarioState}`}>
                            <Label for="exampleSelect">Precio Unitario * </Label>
                            <Input
                                name="precioUnitario"
                                type="number"
                                autoComplete="off"
                                min={0}
                                onChange={(e) => {
                                    if (!verifyLength(e.target.value, 1)) {
                                        setPrecioUnitarioState("has-danger");
                                    } else {
                                        setPrecioUnitarioState("has-success");
                                    }
                                    setPrecioUnitario(e.target.value);
                                }}
                            />
                            {precioUnitarioState === "has-danger" ? (
                                <label className="error">Este campo es requerido.</label>
                            ) : null}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="exampleSelect">Clave Unidad</Label>
                            <Input
                                name="uomcode"
                                type="text"
                                autoComplete="off"
                                value={idUoMCode + " - " + uoMCode}
                                readOnly
                            /> 
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <Label for="exampleSelect">Objeto Impuesto</Label>
                            <Input
                                name="rfc"
                                type="text"
                                min={0}
                                autoComplete="off"
                                value={IdTaxObject + " - " + taxObject}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    {dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "T" && element.Tax === "IVA" && element.Id_Item === item.value}).length !== 0 ? (
                        <Col lg="4">
                            <FormGroup>
                                <Label for="exampleSelect">Traslado IVA</Label>
                                <Input
                                    name="rfc"
                                    type="number"
                                    min={0}
                                    autoComplete="off"
                                    value={(cantidad * precioUnitario) * trasladoIVA}
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                    ):null}
                    {dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "T" && element.Tax === "IEPS" && element.Id_Item === item.value}).length !== 0 ? (
                        <Col lg="4">
                            <FormGroup>
                                <Label for="exampleSelect">Traslado IEPS</Label>
                                <Input
                                    name="rfc"
                                    type="number"
                                    min={0}
                                    autoComplete="off"
                                    value={(cantidad * precioUnitario) * trasladoIEPS}
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                    ): null}
                    {dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "T" && element.Tax === "ISR" && element.Id_Item === item.value}).length !== 0 ? (
                        <Col lg="4">
                            <FormGroup>
                                <Label for="exampleSelect">Traslado ISR</Label>
                                <Input
                                    name="rfc"
                                    type="number"
                                    min={0}
                                    autoComplete="off"
                                    value={(cantidad * precioUnitario) * trasladoISR}
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                    ): null}
                    {dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "R" && element.Tax === "IVA" && element.Id_Item === item.value}).length !== 0 ? (
                        <Col lg="4">
                            <FormGroup>
                                <Label for="exampleSelect">Retención IVA</Label>
                                <Input
                                    name="rfc"
                                    type="number"
                                    min={0}
                                    autoComplete="off"
                                    value={(cantidad * precioUnitario) * retencionIVA}
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                     ): null}
                    {dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "R" && element.Tax === "IEPS" && element.Id_Item === item.value}).length !== 0 ? (
                        <Col lg="4">
                            <FormGroup>
                                <Label for="exampleSelect">Retención IEPS</Label>
                                <Input
                                    name="rfc"
                                    type="number"
                                    min={0}
                                    autoComplete="off"
                                    value={(cantidad * precioUnitario) * retencionIEPS}
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                    ): null}
                    {dataCustomerItemsTaxes.filter((element) =>{return element.Tax_Type === "R" && element.Tax === "ISR" && element.Id_Item === item.value}).length !== 0 ? (
                        <Col lg="4">
                            <FormGroup>
                                <Label for="exampleSelect">Retención ISR</Label>
                                <Input
                                    name="rfc"
                                    type="number"
                                    min={0}
                                    autoComplete="off"
                                    value={(cantidad * precioUnitario) * retencionISR}
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                    ): null}
                    <Col lg="4">
                        <FormGroup>
                            <Label for="exampleSelect">Subtotal</Label>
                            <Input
                                name="subtotal"
                                type="number"
                                autoComplete="off"
                                value={cantidad*precioUnitario}
                                readOnly
                            /> 
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup>
                            <Label for="exampleSelect">Total</Label>
                            <Input
                                name="subtotal"
                                type="number"
                                autoComplete="off"
                                value={(cantidad * precioUnitario) + ((cantidad * precioUnitario) * trasladoIVA) + ((cantidad * precioUnitario) * trasladoIEPS) + ((cantidad * precioUnitario) * trasladoISR) - ((cantidad * precioUnitario) * retencionIVA) - ((cantidad * precioUnitario) * retencionIEPS) - ((cantidad * precioUnitario) * retencionISR)}
                                readOnly
                            /> 
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <Button className= "btn-concept" color="primary" onClick={registerClick}>
                            Agregar Concepto
                        </Button>
                    </Col>
                </Row>
                <Row className = "tabla-conceptos">
                    <Col md="12">
                        <ReactTable
                            data={dataState}
                            columns={[
                                {
                                    Header: "Cantidad",
                                    accessor: "cantidad",
                                },
                                {
                                    Header: "No. Item",
                                    accessor: "idItem",
                                },
                                {
                                    Header: "Cve. Producto Servicio",
                                    accessor: "claveProductoDesc",
                                },
                                {
                                    Header: "Precio Unitario",
                                    accessor: "precioUnitario",
                                },
                                {
                                    Header: "Subtotal",
                                    accessor: "subtotal",
                                },
                                {
                                    Header: "Total",
                                    accessor: "total",
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
        </>
    );
}

export default ConceptosTable;