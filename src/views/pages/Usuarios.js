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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Modal, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Label,
} from "reactstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

const dataTable = [
  ["Tiger Nixon", "System Architect", "Edinburgh", "61"],
  ["Garrett Winters", "Accountant", "Tokyo", "63"],
  ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
  ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
  ["Airi Satou", "Accountant", "Tokyo", "33"],
  ["Brielle Williamson", "Integration Specialist", "New York", "61"],
  ["Herrod Chandler", "Sales Assistant", "San Francisco", "59"],
  ["Rhona Davidson", "Integration Specialist", "Tokyo", "55"],
  ["Colleen Hurst", "Javascript Developer", "San Francisco", "39"],
  ["Sonya Frost", "Software Engineer", "Edinburgh", "23"],
  ["Jena Gaines", "Office Manager", "London", "30"],
  ["Quinn Flynn", "Support Lead", "Edinburgh", "22"],
  ["Charde Marshall", "Regional Director", "San Francisco", "36"],
  ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
  ["Tatyana Fitzpatrick", "Regional Director", "London", "19"],
  ["Michael Silva", "Marketing Designer", "London", "66"],
  ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "64"],
  ["Gloria Little", "Systems Administrator", "New York", "59"],
  ["Bradley Greer", "Software Engineer", "London", "41"],
  ["Dai Rios", "Personnel Lead", "Edinburgh", "35"],
  ["Jenette Caldwell", "Development Lead", "New York", "30"],
  ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "40"],
  ["Caesar Vance", "Pre-Sales Support", "New York", "21"],
  ["Doris Wilder", "Sales Assistant", "Sidney", "23"],
  ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "47"],
  ["Gavin Joyce", "Developer", "Edinburgh", "42"],
  ["Jennifer Chang", "Regional Director", "Singapore", "28"],
  ["Brenden Wagner", "Software Engineer", "San Francisco", "28"],
  ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "48"],
  ["Shou Itou", "Regional Marketing", "Tokyo", "20"],
  ["Michelle House", "Integration Specialist", "Sidney", "37"],
  ["Suki Burks", "Developer", "London", "53"],
  ["Prescott Bartlett", "Technical Author", "London", "27"],
  ["Gavin Cortez", "Team Leader", "San Francisco", "22"],
  ["Martena Mccray", "Post-Sales support", "Edinburgh", "46"],
  ["Unity Butler", "Marketing Designer", "San Francisco", "47"],
  ["Howard Hatfield", "Office Manager", "San Francisco", "51"],
  ["Hope Fuentes", "Secretary", "San Francisco", "41"],
  ["Vivian Harrell", "Financial Controller", "San Francisco", "62"],
  ["Timothy Mooney", "Office Manager", "London", "37"],
  ["Jackson Bradshaw", "Director", "New York", "65"],
  ["Olivia Liang", "Support Engineer", "Singapore", "64"],
];

function Usuarios() {
  const [dataState, setDataState] = React.useState(
    dataTable.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        email: prop[1],
        position: prop[2],
        status: prop[3],
        actions: (
          // ACCIONES A REALIZAR EN CADA REGISTRO
          <div className="actions-right">
            {/*IMPLEMENTAR VER REGISTRO A DETALLE*/}
            <Button
              onClick={() => {
                let obj = dataState.find((o) => o.id === key);
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                );
              }}
              color="info"
              size="sm"
              className="btn-icon btn-link like"
              onClick={toggleModalReadRecord}
            >
              <i className="fa fa-list" />
            </Button>{" "}
            {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
            <Button
              onClick={() => {
                let obj = dataState.find((o) => o.id === key);
                alert(
                  "You've clicked EDIT button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                );
              }}
              color="warning"
              size="sm"
              className="btn-icon btn-link edit"
              onClick={toggleModalUpdateRecord}
            >
              <i className="fa fa-edit" />
            </Button>
          </div>
        ),
      };
    })
  );

  const [modalAddRecord, setModalAddRecord] = useState(false);
  const [modalReadRecord, setModalReadRecord] = useState(false);
  const [modalUpdateRecord, setModalUpdateRecord] = useState(false);

  // register form
  const [registerEmail, setregisterEmail] = React.useState("");
  const [registerFullName, setregisterFullName] = React.useState("");
  const [registerPassword, setregisterPassword] = React.useState("");
  const [registerRol, setregisterRol] = React.useState("");
  const [registerConfirmPassword, setregisterConfirmPassword] = React.useState(
    ""
  );
  const [registerEmailState, setregisterEmailState] = React.useState("");
  const [registerFullNameState, setregisterFullNameState] = React.useState("");
  const [registerPasswordState, setregisterPasswordState] = React.useState("");
  const [
    registerConfirmPasswordState,
    setregisterConfirmPasswordState,
  ] = React.useState("");

  //Descargar la lista de registros
  const [records, setRecords] = useState([]);

  useEffect(() => {
    //Aqui vamos a descargar la lista de registros de la base de datos por primera vez
  }, []);

  function addRecord(event) {
    //Código para añadir un registro a la tabla
    //EndPoint CREATE

    //una vez que añadimos el nuevo usuario, vamos a actualizar la tabla
    //updateRecords();
  }

  function updateRecord(){
    //A la hora de crear un nuevo registro necesitamos actualizar la tabla para que
    //se pinten todos los registros incluido el nuevo
    //Hacemos fetch nuevamente a todos los registros
    //setRecords(nuevadata)
  }

  function readRecord(){
    //Leemos la informacion completa del registo para pintarla en el modal
    //tal vez no sea necesaria porque ya se leyó anteriormente...
  }

  function toggleModalAddRecord(){
    if(modalAddRecord == false){
      setModalAddRecord(true);
    }
    else{
      setModalAddRecord(false);
    }
  }

  function toggleModalReadRecord(){
    if(modalReadRecord == false){
      setModalReadRecord(true);
    }
    else{
      setModalReadRecord(false);
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

  // function that returns true if value is email, false otherwise
  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if two strings are equal
  const compare = (string1, string2) => {
    if (string1 === string2) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  // verifies if value is a valid URL
  const verifyUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };

  const registerClick = () => {
    if (registerEmailState === "") {
      setregisterEmailState("has-danger");
    }
    if (registerFullNameState === "") {
      setregisterFullNameState("has-danger");
    }
    if (registerPasswordState === "" || registerConfirmPasswordState === "") {
      setregisterPasswordState("has-danger");
      setregisterConfirmPasswordState("has-danger");
    }
  };
  const loginClick = () => {
    if (loginFullNameState === "") {
      setloginFullNameState("has-danger");
    }
    if (loginEmailState === "") {
      setloginEmailState("has-danger");
    }
    if (loginPasswordState === "") {
      setloginPasswordState("has-danger");
    }
  };

  const typeClick = () => {
    if (requiredState === "") {
      setrequiredState("has-danger");
    }
    if (emailState === "") {
      setemailState("has-danger");
    }
    if (numberState === "") {
      setnumberState("has-danger");
    }
    if (urlState === "") {
      seturlState("has-danger");
    }
    if (sourceState === "" || destinationState === "") {
      setsourceState("has-danger");
      setdestinationState("has-danger");
    }
  };

  const rangeClick = () => {
    if (minLengthState === "") {
      setminLengthState("has-danger");
    }
    if (maxLengthState === "") {
      setmaxLengthState("has-danger");
    }
    if (rangeState === "") {
      setrangeState("has-danger");
    }
    if (minState === "") {
      setminState("has-danger");
    }
    if (maxState === "") {
      setmaxState("has-danger");
    }
  };

  return (
    <>
      {/*console.log(props.example)*/}
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Users Catalog</CardTitle>
                <Button color="primary" onClick={toggleModalAddRecord}>
                  <span className="btn-label">
                    <i className="nc-icon nc-simple-add" />
                  </span>
                  Add new record
                </Button>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={dataState}
                  columns={[
                    {
                      Header: "Nombre",
                      accessor: "name",
                    },
                    {
                      Header: "Email",
                      accessor: "email",
                    },
                    {
                      Header: "Descripción",
                      accessor: "position",
                    },
                    {
                      Header: "Estatus",
                      accessor: "status",
                    },
                    {
                      Header: "Actions",
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/*MODAL PARA AÑADIR REGISTROS*/}
      <Modal isOpen={modalAddRecord} toggle={toggleModalAddRecord} size="lg">
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModalAddRecord}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Add new record</h5>
        </div>
        <ModalBody>
          <Form id="RegisterValidation">
            <FormGroup className={`has-label ${registerEmailState}`}>
              <label>Email Address *</label>
              <Input
                name="email"
                type="email"
                onChange={(e) => {
                  if (!verifyEmail(e.target.value)) {
                    setregisterEmailState("has-danger");
                  } else {
                    setregisterEmailState("has-success");
                  }
                  setregisterEmail(e.target.value);
                }}
              />
              {registerEmailState === "has-danger" ? (
                <label className="error">
                  Please enter a valid email address.
                </label>
              ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${registerFullNameState}`}>
                <label>Full Name *</label>
                <Input
                  name="fullname"
                  type="text"
                  onChange={(e) => {
                    if (!verifyLength(e.target.value, 1)) {
                      setregisterFullNameState("has-danger");
                    } else {
                      setregisterFullNameState("has-success");
                    }
                    setregisterFullName(e.target.value);
                  }}
                />
                {registerFullNameState === "has-danger" ? (
                  <label className="error">This field is required.</label>
                ) : null}
            </FormGroup>
            <FormGroup className={`has-label ${registerPasswordState}`}>
              <label>Password *</label>
              <Input
                id="registerPassword"
                name="password"
                type="password"
                autoComplete="off"
                onChange={(e) => {
                  if (!verifyLength(e.target.value, 1)) {
                    setregisterPasswordState("has-danger");
                  } else {
                    setregisterPasswordState("has-success");
                  }
                  setregisterPassword(e.target.value);
                }}
              />
              {registerPasswordState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </FormGroup>
            <FormGroup
              className={`has-label ${registerConfirmPasswordState}`}
            >
              <label>Confirm Password *</label>
              <Input
                equalto="#registerPassword"
                id="registerPasswordConfirmation"
                name="password_confirmation"
                type="password"
                autoComplete="off"
                onChange={(e) => {
                  if (!compare(e.target.value, registerPassword)) {
                    setregisterConfirmPasswordState("has-danger");
                    setregisterPasswordState("has-danger");
                  } else {
                    setregisterConfirmPasswordState("has-success");
                    setregisterPasswordState("has-success");
                  }
                  setregisterConfirmPassword(e.target.value);
                }}
              />
              {registerConfirmPasswordState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </FormGroup>
            <FormGroup>
              {/*Falta guardar en variable*/}
              <Label for="exampleSelect">Rol * </Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>Administrador</option>
                <option>Soporte</option>
                <option>Cliente</option>
                <option>Servicio</option>
              </Input>
            </FormGroup>
            <FormGroup check>
              <Input type="checkbox" name="check" id="exampleCheck" checked/>
              <Label for="exampleCheck" check>Habilitado *</Label>
            </FormGroup>
            <div className="category form-category">
              * Required fields
            </div>
            <Button color="primary" onClick={registerClick}>
              Register
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggleModalAddRecord}>
                Close
            </Button>
            <Button color="primary">
                Save changes
            </Button>
        </ModalFooter>
      </Modal>

      {/*MODAL PARA LEER REGISTRO*/}
      <Modal isOpen={modalReadRecord} toggle={toggleModalReadRecord}>
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModalReadRecord}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Record Detail</h5>
        </div>
        <ModalBody>
            <p>Woohoo, you're reading this text in a modal!</p>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggleModalReadRecord}>
                Close
            </Button>
            <Button color="primary">
                Save changes
            </Button>
        </ModalFooter>
      </Modal>

      {/*MODAL PARA MODIFICAR REGISTRO*/}
      <Modal isOpen={modalUpdateRecord} toggle={toggleModalUpdateRecord}>
        <div className="modal-header justify-content-center">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModalUpdateRecord}>
            <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Edit Record</h5>
        </div>
        <ModalBody>
            <p>Woohoo, you're reading this text in a modal!</p>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggleModalUpdateRecord}>
                Close
            </Button>
            <Button color="primary">
                Save changes
            </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Usuarios;
