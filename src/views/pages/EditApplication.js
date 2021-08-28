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
import React, { useEffect } from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import GeneralsStep1 from "../components/EdditAppWizard/GeneralsStep1.js";
import SettingsStep2 from "../components/EdditAppWizard/SettingsStep2.js";

import { useParams } from "react-router-dom";



function EditApplication({edit}) {
    const { idApp } = useParams();

    useEffect(() => {
        //Es necesario descargar la información de toda la app y pasarsela como prop a los componentes...
      },[]);

    var steps = [
        {
          stepName: "Generales",
          stepIcon: "nc-icon nc-layout-11",
          component: GeneralsStep1,
          stepProps: {
              //Por el momento solo se le está pasando con prop el idApp
              prop1: idApp,
          }
        },
        {
          stepName: "Configuraciones",
          stepIcon: "nc-icon nc-settings",
          component: SettingsStep2,
        },
      ];
    
    const finishButtonClick = (allStates) => {
        console.log(allStates);
        //una vez que la información sea correcta, hacemos el fetch a la base de datos para enviar toda la información...
    };

    
    return (
        <>
        <div className="content">
            
            <ReactWizard
                steps={steps}
                navSteps
                validate
                title= {"Edit Application " + idApp}
                headerTextCenter
                finishButtonClasses="btn-wd"
                nextButtonClasses="btn-wd"
                previousButtonClasses="btn-wd"
                finishButtonClick={finishButtonClick}
            />
        </div>
        </>
    );
}

export default EditApplication;
