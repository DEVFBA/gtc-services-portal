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

const Emisor = React.forwardRef((props, ref) => {
    //Para cargar el componente hasta que toda la información sea descargada
    const [dataFind, setDataFind] = React.useState(true);

    //Variables para guardar los datos
    const [rfc, setRfc] = useState("");
    const [nombreRazon, setNombreRazon] = useState("");
    const [idTaxRegimen, setIdTaxRegimen] = useState("");
    const [taxRegimen, setTaxRegimen] = useState("");
    const [lugarExpedicion, setLugarExpedicion] = useState("")

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
            idTaxRegimen,
            lugarExpedicion
        },
    }));

    const isValidated = () => {
        return true;
    };

    useEffect(() => {

        //Información del cliente para colocarla en los inputs
        var url = new URL(`${process.env.REACT_APP_API_URI}customers/${customerLogged}`);
        
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
            setRfc(data[0].Tax_Id);
            setNombreRazon(data[0].Name);
            setIdTaxRegimen(data[0].Id_Tax_Regimen);
            setTaxRegimen(data[0].Tax_Regimen);
            setLugarExpedicion(data[0].Zip_Code);
            setDataFind(false);
        })
        .catch(function(err) {
            setDataError(true);
            setDataErrorMessage(" del cliente. ")
        });
    }, []);

    return dataFind === true ? (
        <>
            <h5 className="info-text">
                Datos del Emisor
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
            <h5 className="info-text">Datos del Emisor</h5>
            <Row className="justify-content-center">
                <Col sm="8">
                    <FormGroup>
                        <Label for="exampleSelect">RFC</Label>
                        <Input
                            name="nombre"
                            type="text"
                            autoComplete="off"
                            value={rfc}
                            readOnly
                        />
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
                    <FormGroup>
                        <Label for="exampleSelect">Régimen Fiscal</Label>
                        <Input
                            name="nombre"
                            type="text"
                            autoComplete="off"
                            value={idTaxRegimen + " - " + taxRegimen}
                            readOnly
                        />
                    </FormGroup>
                </Col>
            </Row>
        </>
    );
});

export default Emisor;