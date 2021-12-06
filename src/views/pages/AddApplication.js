import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import GeneralsStep1 from "../components/AddAppWizard/GeneralsStep1.js";
import SettingsStep2 from "../components/AddAppWizard/SettingsStep2.js";

var steps = [
  {
    stepName: "Generales",
    stepIcon: "nc-icon nc-layout-11",
    component: GeneralsStep1,
  },
  {
    stepName: "Configuraciones",
    stepIcon: "nc-icon nc-settings",
    component: SettingsStep2,
  },
];

function AddApplication() {

    const finishButtonClick = (allStates) => {
        console.log(allStates);
    };
    
  return (
    <>
      <div className="content">
        
          <ReactWizard
            steps={steps}
            navSteps
            validate
            title="Add Application or Service"
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

export default AddApplication;
