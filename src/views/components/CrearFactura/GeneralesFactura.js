import React from "react";
import Skeleton from '@yisheng90/react-loading';

// reactstrap components
import {
    Row,
    Col,
    FormGroup,
    Label
} from "reactstrap";

//React plugin used to create DropdownMenu for selecting items
import Select from "react-select";

const GeneralesFactura = React.forwardRef((props, ref) => {
    //Para cargar el componente hasta que toda la información sea descargada
    const [dataFind, setDataFind] = React.useState(true);

    //Para guardar los datos de los catálogos que necesitamos para crear la factura
    const [dataCurrencies, setDataCurrencies] = React.useState([])
    const [dataReceiptTypes, setDataReceiptTypes] = React.useState([]);
    const [dataReceiptTypesSeries, setDataReceiptTypesSeries] = React.useState([])
    const [dataPaymentMethods, setDataPaymentMethods] = React.useState([])
    const [dataPaymentInstruments, setDataPaymentInstruments] = React.useState([])

    //Variables para los select
    const [currency, setCurrency] = React.useState({})
    const [receiptType, setReceiptType] = React.useState({})
    const [serie, setSerie] = React.useState("")
    const [dataSeries, setDataSeries] = React.useState([]);
    const [paymentMethod, setPaymentMethod] = React.useState({})
    const [paymentInstrument, setPaymentInstrument] = React.useState({})

    //Variables para validar los select
    const [currencyState, setCurrencyState] = React.useState("");
    const [receiptTypeState, setReceiptTypeState] = React.useState("");
    const [serieState, setSerieState] = React.useState("");
    const [paymentMethodState, setPaymentMethodState] = React.useState("");
    const [paymentInstrumentState, setPaymentInstrumentState] = React.useState("");

    const token = localStorage.getItem("Token");

    //Para guardar el cliente loggeado
    const customerLogged = localStorage.getItem("Id_Customer");

    React.useImperativeHandle(ref, () => ({
        isValidated: () => {
            return isValidated();
        },
        state: {
            currency,
            receiptType,
            serie,
            paymentMethod,
            paymentInstrument,
        },
    }));

    React.useEffect(() => {

        //Información del cliente para colocarla en los inputs
        var url = new URL(`${process.env.REACT_APP_API_URI}customer-receipt-types-series/${customerLogged}`);
        
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
            console.log(data)
            setDataReceiptTypesSeries(data);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" del cliente. ")
        });
    }, []);

    React.useEffect(() => {
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
            setDataFind(false)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los catálogos" + err);
        });
    }

    const isValidated = () => {
        if (
            currencyState === "has-success" &&
            receiptTypeState === "has-success" &&
            serieState === "has-success" &&
            paymentMethodState === "has-success" &&
            paymentInstrumentState === "has-success"
        ) {
          return true;
        } else {
          if (currencyState !== "has-success") {
            setCurrencyState("has-danger");
          }
          if (receiptTypeState !== "has-success") {
            setReceiptTypeState("has-danger");
          }
          if (serieState !== "has-success") {
            setSerieState("has-danger");
          }
          if (paymentMethodState !== "has-success") {
            setPaymentMethodState("has-danger");
          }
          if (paymentInstrumentState !== "has-success") {
            setPaymentInstrumentState("has-danger");
          }
          return false;
        }
    };

    return dataFind === true ? (
        <>
            <h5 className="info-text">
                Datos Generales de la Factura
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
            <h5 className="info-text">
                Datos Generales de la Factura
            </h5>
            <Row className="justify-content-center">
                <Col sm="8">
                    <FormGroup className={`has-label ${currencyState}`}>
                        <Label>Moneda * </Label>
                        <Select
                            name=""
                            className="react-select"
                            placeholder="Selecciona una Moneda"
                            classNamePrefix="react-select"
                            onChange={(value) => {
                                setCurrency(value.value)
                                setCurrencyState("has-success");
                            }}
                            options={dataCurrencies}
                        />
                        {currencyState === "has-danger" ? (
                            <label className="error">Selecciona una Moneda.</label>
                        ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${receiptTypeState}`}>
                        <Label>Tipo de Comprobante * </Label>
                        <Select
                            name=""
                            className="react-select"
                            placeholder="Selecciona un Tipo de Comprobante"
                            classNamePrefix="react-select"
                            onChange={(value) => {
                                setReceiptType(value.value);
                                setSerie(dataReceiptTypesSeries.find( o => o.Id_Receipt_Type === value.value).Serie);
                                var seriesAux = dataReceiptTypesSeries.filter(o => o.Id_Receipt_Type === value.value);
                                var seriesAux2 =[];
                                for(var i=0; i<seriesAux.length; i++)
                                {
                                    seriesAux2.push({
                                        value: seriesAux[i].Serie, label: seriesAux[i].Serie
                                    });
                                }
                                console.log(seriesAux2)
                                setDataSeries(seriesAux2);
                                setReceiptTypeState("has-success");
                            }}
                            options={dataReceiptTypes}
                        />
                        {receiptTypeState === "has-danger" ? (
                            <label className="error">Selecciona un Tipo de Comprobante</label>
                        ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${serieState}`}>
                        <Label for="exampleSelect">Serie</Label>
                        <Select
                            name=""
                            className="react-select"
                            placeholder="Selecciona una Serie"
                            classNamePrefix="react-select"
                            onChange={(value) => {
                                setSerie(value.value);
                                setSerieState("has-success");
                            }}
                            options={dataSeries}
                        />
                        { serieState === "has-danger" ? (
                            <label className="error">Selecciona una Serie</label>
                        ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${paymentMethodState}`}>
                        <Label>Método de Pago * </Label>
                        <Select
                            name=""
                            className="react-select"
                            placeholder="Selecciona un Método de Pago"
                            classNamePrefix="react-select"
                            onChange={(value) => {
                                setPaymentMethod(value.value)
                                setPaymentMethodState("has-success");
                            }}
                            options={dataPaymentMethods}
                        />
                        {paymentMethodState === "has-danger" ? (
                            <label className="error">Selecciona un Método de Pago</label>
                        ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${paymentInstrumentState}`}>
                        <Label>Forma de Pago * </Label>
                        <Select
                            name=""
                            className="react-select"
                            placeholder="Selecciona una Forma de Pago"
                            classNamePrefix="react-select"
                            onChange={(value) => {
                                setPaymentInstrument(value.value)
                                setPaymentInstrumentState("has-success");
                            }}
                            options={dataPaymentInstruments}
                        />
                        {paymentInstrumentState === "has-danger" ? (
                            <label className="error">Selecciona una Forma de Pago</label>
                        ) : null}
                    </FormGroup>
                </Col>
            </Row>
        </>
    );
});

export default GeneralesFactura;
