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
import Skeleton from '@yisheng90/react-loading';

// reactstrap components
import {
    Row,
    Input,
    Col,
    FormGroup,
    Label,
} from "reactstrap";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

const Receptor = React.forwardRef((props, ref) => {
    //Para cargar el componente hasta que toda la información sea descargada
    const [dataFind, setDataFind] = React.useState(true);

    const [dataCfdiUses, setDataCfdiUses] = useState([])
    const [dataTaxRegimes, setDataTaxRegimes] = useState([])

    //Variables para guardar los datos
    const [rfc, setRfc] = useState("")
    const [nombreRazon, setNombreRazon] = useState("")
    const [domicilioFiscal, setDomicilioFiscal] = useState("")
    const [cfdiUse, setCfdiUse] = useState({})
    const [taxRegime, setTaxRegime] = useState({})

    //Variables para guardar el estado de los inputs y selects
    const [rfcState, setRfcState] = useState("")
    const [cfdiUseState, setCfdiUseState] = useState({})
    const [taxRegimeState, setTaxRegimeState] = useState({})

    //Para el select de Clientes - Receptores Factura
    const [dataCustomerBillTos, setDataCustomerBillTos] = useState([])
    const [dataCustomerBillTosSelect, setDataCustomerBillTosSelect] = useState([])

    const token = localStorage.getItem("Token"); 

    //Para guardar el cliente loggeado
    const customerLogged = localStorage.getItem("Id_Customer");

    //Manejo de errores
    const [dataError, setDataError] = useState("") 
    const [dataErrorMessage, setDataErrorMessage] = useState("") 

    React.useImperativeHandle(ref, () => ({
        isValidated: () => {
            return isValidated();
        },
        state: {
            rfc,
            nombreRazon,
            cfdiUse,
            domicilioFiscal,
            taxRegime
        },
    }));

    const isValidated = () => {
        if (
            rfcState === "has-success" &&
            cfdiUseState === "has-success" &&
            taxRegimeState === "has-success"
        ) {
          return true;
        } else {
          if (rfcState !== "has-success") {
            setRfcState("has-danger");
          }
          if (cfdiUseState !== "has-success") {
            setCfdiUseState("has-danger");
          }
          if (taxRegimeState !== "has-success") {
            setTaxRegimeState("has-danger");
          }
          return false;
        }
    };

    useEffect(() => {

        //Información de los clientes - receptores factura del cliente loggeado
        var url = new URL(`${process.env.REACT_APP_API_URI}customer-bill-tos/${customerLogged}`);
        
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
                    value: data[i].Tax_Id, label: data[i].Tax_Id
                })
            }
            setDataCustomerBillTos(data);
            setDataCustomerBillTosSelect(optionsAux);

            getDataCFDI();
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" de los clientes bill tos. ")
        });
    }, []);

   function getDataCFDI()
   {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_CFDI_Uses_CRUD_Records",
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
            setDataCfdiUses(optionsAux)
            getDataTaxRegimes()
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    function getDataTaxRegimes()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Tax_Regimens_CRUD_Records",
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
            setDataTaxRegimes(optionsAux)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    return dataFind === true ? (
        <>
            <h5 className="info-text">
                Datos del receptor
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
        <h5 className="info-text">Datos del receptor</h5>
        <Row className="justify-content-center">
            <Col sm="8">
                <FormGroup className={`has-label ${rfcState}`}>
                    <Label for="exampleSelect">RFC * </Label>
                    <Select
                        name=""
                        className="react-select"
                        placeholder="Selecciona un RFC"
                        classNamePrefix="react-select"
                        onChange={(value) => {
                            var cliente = dataCustomerBillTos.find( o => o.Tax_Id === value.value);
                            console.log(cliente)
                            setNombreRazon(cliente.Name);
                            setCfdiUse({value: cliente.Id_CFDI_Use, label: cliente.Id_CFDI_Use + " - " + cliente.CFDI_Use});
                            setCfdiUseState("has-success");
                            setTaxRegime({value: cliente.Id_Tax_Regimen, label: cliente.Id_Tax_Regimen + " - " + cliente.Tax_Regimen});
                            setTaxRegimeState("has-success");
                            setRfc(value);
                            setRfcState("has-success");
                            setDomicilioFiscal(cliente.Zip_Codes);
                        }}
                        options={dataCustomerBillTosSelect}
                    />
                    {rfcState === "has-danger" ? (
                        <label className="error">Este campo es requerido.</label>
                    ) : null}
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Nombre / Razón Social</Label>
                    <Input
                        name="nombre"
                        type="text"
                        autoComplete="off"
                        value={nombreRazon}
                        readOnly
                    />
                </FormGroup>
                <FormGroup className={`has-label ${cfdiUseState}`}>
                    <Label>Uso de CFDI * </Label>
                    <Select
                        name=""
                        className="react-select"
                        placeholder="Selecciona Uso de CFDI"
                        classNamePrefix="react-select"
                        value={cfdiUse}
                        onChange={(value) => {
                            setCfdiUse(value)
                            setCfdiUseState("has-success");
                        }}
                        options={dataCfdiUses}
                    />
                    {cfdiUseState === "has-danger" ? (
                        <label className="error">Selecciona un Uso de CFDI.</label>
                    ) : null}
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Domicilio Fiscal</Label>
                    <Input
                        name="nombre"
                        type="text"
                        autoComplete="off"
                        value={domicilioFiscal}
                        readOnly
                    />
                </FormGroup>
                <FormGroup className={`has-label ${taxRegimeState}`}>
                    <Label>Regimen Fiscal * </Label>
                    <Select
                        name=""
                        className="react-select"
                        placeholder="Selecciona un Régimen Fiscal"
                        classNamePrefix="react-select"
                        value={taxRegime}
                        onChange={(value) => {
                            console.log(value)
                            setTaxRegime(value)
                            setTaxRegimeState("has-success");
                        }}
                        options={dataTaxRegimes}
                    />
                    {taxRegimeState === "has-danger" ? (
                        <label className="error">Selecciona un Régimen Fiscal.</label>
                    ) : null}
                </FormGroup>
            </Col>
        </Row>
        </>
    );
});

export default Receptor;