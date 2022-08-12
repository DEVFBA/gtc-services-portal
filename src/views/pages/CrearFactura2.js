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
import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import GeneralesFactura from "../components/CrearFactura/GeneralesFactura";
import Emisor from "../components/CrearFactura/Emisor";
import Receptor from "../components/CrearFactura/Receptor";
import Conceptos from "../components/CrearFactura/Conceptos";

var steps = [
  {
    stepName: "Generales",
    stepIcon: "nc-icon nc-paper",
    component: GeneralesFactura,
  },
  {
    stepName: "Emisor",
    stepIcon: "nc-icon nc-single-02",
    component: Emisor,
  },
  {
    stepName: "Receptor",
    stepIcon: "nc-icon nc-single-02",
    component: Receptor,
  },
  {
    stepName: "Conceptos",
    stepIcon: "nc-icon nc-bullet-list-67",
    component: Conceptos,
  },
];

function CrearFactura() {

    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");

    const finishButtonClick = (allStates) => {
        console.log(allStates)
        //generarFactura(allStates);
    };

    function generarFactura(data)
    {
      const catRegister = {
        generales: data.Generales,
        emisor: data.Emisor,
        receptor: data.Receptor,
        conceptos: data.Conceptos,
      };

      fetch(`http://localhost:8091/api/invoices/create/`, {
        method: "POST",
        body: JSON.stringify(catRegister),
        headers: {
            "access-token": token,
            "Content-Type": "application/json"
        }
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
            setError(
                <p>Hubo un error al realizar tu solicitud</p>
            );
        }
        else{
            /*if(data[0].Code_Type === "Warning")
            {
                setErrorMessage(data[0].Code_Message_User)
                setErrorState("has-danger")
                
                //Borramos el valor de las variables porque se quedan pegados cuando se insertan varios consecutivamente
                setIdItem("");
                setFactorType("");
                setTax("");
                setTaxType("");
                setValue("");
                setStatus(true);

                autoCloseAlert(data[0].Code_Message_User)
                handleModalClick() 
            }
            else if(data[0].Code_Type === "Error")
            {
                setErrorMessage(data[0].Code_Message_User)
                setErrorState("has-danger")

                //Borramos el valor de las variables porque se quedan pegados cuando se insertan varios consecutivamente
                setIdItem("");
                setFactorType("");
                setTax("");
                setTaxType("");
                setValue("");
                setStatus(true);

                autoCloseAlert(data[0].Code_Message_User);
                handleModalClick();
            }
            else{
                setErrorState("has-success");
                //Para actualizar la tabla en componente principal
                updateAddData()

                //Borramos el valor de las variables porque se quedan pegados cuando se insertan varios consecutivamente
                setIdItem("");
                setFactorType("");
                setTax("");
                setTaxType("");
                setValue("");
                setStatus(true);

                //Cerramos el modal
                handleModalClick() 
                autoCloseAlert(data[0].Code_Message_User)
            }*/
        }
      });
    }

    return (
      <>
        <div className="content">
            <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
                steps={steps}
                navSteps
                validate
                title="Crear Factura"
                description=""
                headerTextCenter
                finishButtonClasses="btn-wd"
                nextButtonClasses="btn-wd"
                previousButtonClasses="btn-wd"
                finishButtonClick={finishButtonClick}
            />
            </Col>
        </div>
      </>
    );
}

export default CrearFactura;
