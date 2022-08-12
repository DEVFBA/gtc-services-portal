import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';

// core components
import ControlTimbresTable from "../components/ControlTimbres/ControlTimbresTable";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Button,
    FormGroup,
    Form,
    Input,
    Label,
} from "reactstrap";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

function CrearFactura() {
    const ambiente = process.env.REACT_APP_ENVIRONMENT
    const token = localStorage.getItem("Token"); 
    const customer = localStorage.getItem("Id_Customer")
    
    //Para cargar el componente hasta que toda la información sea descargada
    const [dataFind, setDataFind] = React.useState(true);

    //Para guardar los datos de los catálogos que necesitamos para crear la factura
    const [dataCurrencies, setDataCurrencies] = useState([])
    const [dataReceiptTypes, setDataReceiptTypes] = useState([])
    const [dataPaymentMethods, setDataPaymentMethods] = useState([])
    const [dataPaymentInstruments, setDataPaymentInstruments] = useState([])
    const [dataCfdiUses, setDataCfdiUses] = useState([])
    const [dataTaxRegimes, setDataTaxRegimes] = useState([])
    const [dataProductServiceCodes, setDataProductServiceCodes] = useState([])

    //Variables para los select
    const [currency, setCurrency] = useState({})
    const [receiptType, setReceiptType] = useState({})
    const [paymentMethod, setPaymentMethod] = useState({})
    const [paymentInstrument, setPaymentInstrument] = useState({})
    const [rfc, setRfc] = useState("")
    const [nombreRazon, setNombreRazon] = useState("")
    const [cfdiUse, setCfdiUse] = useState({})
    const [taxRegime, setTaxRegime] = useState({})
    const [productServiceCode, setProductServiceCode] = useState({})

    //Variables para validar los select
    const [currencyState, setCurrencyState] = useState({})
    const [receiptTypeState, setReceiptTypeState] = useState({})
    const [paymentMethodState, setPaymentMethodState] = useState({})
    const [paymentInstrumentState, setPaymentInstrumentState] = useState({})
    const [rfcState, setRfcState] = useState("")
    const [nombreRazonState, setNombreRazonState] = useState("")
    const [cfdiUseState, setCfdiUseState] = useState({})
    const [taxRegimeState, setTaxRegimeState] = useState({})
    const [productServiceCodeState, setProductServiceCodeState] = useState({})

    useEffect(() => {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Currencies_CRUD_Records",
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
            setDataCurrencies(optionsAux)
            getDataReceiptTypes()
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }, []);

    function getDataReceiptTypes()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Receipt_Types_CRUD_Records",
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
            setDataReceiptTypes(optionsAux)
            getPaymentMethods()
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    function getPaymentMethods()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Payment_Methods_CRUD_Records",
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
            setDataPaymentMethods(optionsAux)
            getPaymentInstruments()
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    function getPaymentInstruments()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Payment_Instruments_CRUD_Records",
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
            setDataPaymentInstruments(optionsAux)
            getDataCfdiUses()
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    function getDataCfdiUses()
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
            getDataProductServiceCodes()
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    function getDataProductServiceCodes()
    {
        const params = {
            pvOptionCRUD: "R",
            pSpCatalog : "spSAT_Cat_Product_Service_Codes_CRUD_Records",
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
            setDataProductServiceCodes(optionsAux)
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    //Renderizado condicional
    function ControlTimbre() {
        return <ControlTimbresTable dataTable = {dataControlTimbres}/>;
    }

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    const isValidated = () => {
        if (
            currencyState === "has-success" &&
            receiptTypeState === "has-success" &&
            paymentMethodState === "has-success" &&
            paymentInstrumentState === "has-success" &&
            rfcState === "has-success" &&
            nombreRazonState === "has-success" &&
            cfdiUseState === "has-success" &&
            taxRegimeState === "has-success"
        ) {
          return true;
        } else {
          if (currencyState !== "has-success") {
            setCurrencyState("has-danger");
          }
          if (receiptTypeState !== "has-success") {
            setReceiptTypeState("has-danger");
          }
          if (paymentMethodState !== "has-success") {
            setPaymentMethodState("has-danger");
          }
          if (paymentInstrumentState !== "has-success") {
            setPaymentInstrumentState("has-danger");
          }
          if (rfcState !== "has-success") {
            setRfcState("has-danger");
          }
          if (nombreRazonState !== "has-success") {
            setNombreRazonState("has-danger");
          }
          if (cfdiUseState !== "has-success") {
            setCfdiUseState("has-danger");
          }
          if (taxRegimeState !== "has-success") {
            setTaxRegimeState("has-danger");
          }
          if (productServiceCodeState !== "has-success") {
            setProductServiceCodeState("has-danger");
          }
          return false;
        }
    };

    const registerClick = () => {
        
        if(isValidated()===true)
        {
           //haremos el fetch a la base de datos para agregar el registro
           //addRegister()
           console.log("ENTRE")
        }
        else{
            console.log("no entre")
        }
    };

    return dataFind === true ? (
        <>
            <div className="content">
                <Row>
                <Col md="12">
                    <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Crear Factura</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Skeleton height={25} />
                        <Skeleton height="25px" />
                        <Skeleton height="3rem" />
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </div>
        </>
    ):(
        <>
            <div className="content">
                <Row xs = "1">
                    <Col md="12">
                        <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Crear Factura</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className="justify-content-center">
                                <Col sm="6">
                                    <h6>Generales Factura</h6>
                                    <FormGroup className={`has-label ${currencyState}`}>
                                        <Label for="exampleSelect">Moneda * </Label>
                                        <Select
                                            name=""
                                            className="react-select"
                                            placeholder="Selecciona una moneda"
                                            classNamePrefix="react-select"
                                            value={currency}
                                            onChange={(value) => {
                                                console.log(value)
                                                setCurrency(value)
                                                setCurrencyState("has-success");
                                            }}
                                            options={dataCurrencies}
                                        />
                                        {currencyState === "has-danger" ? (
                                            <label className="error">Selecciona una moneda.</label>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className={`has-label ${receiptTypeState}`}>
                                        <Label for="exampleSelect">Tipo de Comprobante * </Label>
                                        <Select
                                            name=""
                                            className="react-select"
                                            placeholder="Selecciona un tipo de comprobante"
                                            classNamePrefix="react-select"
                                            value={receiptType}
                                            onChange={(value) => {
                                                console.log(value)
                                                setReceiptType(value)
                                                setReceiptTypeState("has-success");
                                            }}
                                            options={dataReceiptTypes}
                                        />
                                        {receiptTypeState === "has-danger" ? (
                                            <label className="error">Selecciona un tipo de comprobante</label>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className={`has-label ${paymentMethodState}`}>
                                        <Label for="exampleSelect">Método de Pago * </Label>
                                        <Select
                                            name=""
                                            className="react-select"
                                            placeholder="Selecciona un método de pago"
                                            classNamePrefix="react-select"
                                            value={paymentMethod}
                                            onChange={(value) => {
                                                console.log(value)
                                                setPaymentMethod(value)
                                                setPaymentMethodState("has-success");
                                            }}
                                            options={dataPaymentMethods}
                                        />
                                        {paymentMethodState === "has-danger" ? (
                                            <label className="error">Selecciona un método de pago</label>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className={`has-label ${paymentInstrumentState}`}>
                                        <Label for="exampleSelect">Forma de Pago * </Label>
                                        <Select
                                            name=""
                                            className="react-select"
                                            placeholder="Selecciona una forma de pago"
                                            classNamePrefix="react-select"
                                            value={paymentInstrument}
                                            onChange={(value) => {
                                                console.log(value)
                                                setPaymentInstrument(value)
                                                setPaymentInstrumentState("has-success");
                                            }}
                                            options={dataPaymentInstruments}
                                        />
                                        {paymentInstrumentState === "has-danger" ? (
                                            <label className="error">Selecciona una forma de pago</label>
                                        ) : null}
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <h6>Receptor</h6>
                                    <FormGroup className={`has-label ${rfcState}`}>
                                        <Label for="exampleSelect">RFC * </Label>
                                        <Input
                                            name="rfc"
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                if (!verifyLength(e.target.value, 1)) {
                                                    setRfcState("has-danger");
                                                } else {
                                                    setRfcState("has-success");
                                                }
                                                setRfc(e.target.value);
                                            }}
                                        />
                                        {rfcState === "has-danger" ? (
                                            <label className="error">Este campo es requerido.</label>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className={`has-label ${nombreRazonState}`}>
                                        <Label for="exampleSelect">Nombre / Razón Social * </Label>
                                        <Input
                                            name="nombre"
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                if (!verifyLength(e.target.value, 1)) {
                                                    setNombreRazonState("has-danger");
                                                } else {
                                                    setNombreRazonState("has-success");
                                                }
                                                setNombreRazon(e.target.value);
                                            }}
                                        />
                                        {nombreRazonState === "has-danger" ? (
                                            <label className="error">Este campo es requerido.</label>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className={`has-label ${cfdiUseState}`}>
                                        <Label for="exampleSelect">Uso de CFDI * </Label>
                                        <Select
                                            name=""
                                            className="react-select"
                                            placeholder="Selecciona un método de pago"
                                            classNamePrefix="react-select"
                                            value={cfdiUse}
                                            onChange={(value) => {
                                                console.log(value)
                                                setCfdiUse(value)
                                                setCfdiUseState("has-success");
                                            }}
                                            options={dataCfdiUses}
                                        />
                                        {cfdiUseState === "has-danger" ? (
                                            <label className="error">Selecciona un Uso de CFDI.</label>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className={`has-label ${taxRegimeState}`}>
                                        <Label for="exampleSelect">Regimen Fiscal * </Label>
                                        <Select
                                            name=""
                                            className="react-select"
                                            placeholder="Selecciona una forma de pago"
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
                                            <label className="error">Selecciona un Regimen Fiscal.</label>
                                        ) : null}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button className="buttons" color="primary" onClick={registerClick}>
                                Crear Factura
                            </Button>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default CrearFactura;